from resume_data import Resume, Profile, Job, ResumeData, ProfileExperience, ProfileProject, Skill
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from enum import Enum
from pydantic import BaseModel
from langchain.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate
from langchain_core.language_models.chat_models import BaseChatModel
import spacy
import asyncio

class ResumeEntryType(Enum):
    EXPERIENCE = 1
    PROJECT = 0.9
    EXTRA_CURRICULAR = 0.8

class ResumeEntryData:
    type: ResumeEntryType
    data: ProfileExperience | ProfileProject
    score: float = 0.0

class ResumeCreationOptions(BaseModel):
    '''
    The options for creating a resume
    '''
    addHighlights: bool = False
    addHobbies: bool = False
    addAwards: bool = False
    addSkills: bool = True
    # in lines
    minDescriptionLength: int = 0
    maxDescriptionLength: int = 5
    # min and max experiences, projects, and extra curriculars
    minExperiences: int = 0
    minProjects: int = 0
    maxProjects: int = 5
    minExtraCurriculars: int = 0
    maxExtraCurriculars: int = 5
    
    # TODO: or alternatively, pages of the resume. use union for that
    # TODO: or use the strategy pattern to implement the strategy of how to filter the sorted array of resume entry data

class SkillHolder(BaseModel):
    '''
    Holds the skills which are extracted from a job description
    '''
    required: list[str]
    preferred: list[str]
    
class ResumeRewritenInput(BaseChatModel):
    job_description: str
    resume_entry_description: str
    resume_entry_skills: list[str]

class ResumeGeneratorService:
    '''
    This is the generic service which generates the resume.
    '''
    model: BaseChatModel
    vectorizer = TfidfVectorizer()
    
    def __init__(self, model: BaseChatModel):
        '''
        Initializes the ResumeGeneratorService with the model which is used to generate the resume.
        '''
        self.model = model
    
    # Returns the similarity score between two texts
    def get_similarity_score(self, text1: str, text2: str) -> float:
        tfidf_matrix = self.vectorizer.fit_transform([text1, text2])
        return cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]

    def get_resume_entries(self, profile: Profile) -> list[ResumeEntryData]:
        '''
        Creates a massive resume from the profile, acts as our template
        '''
        data = ResumeData()
        data.name = profile.name
        data.contactInfo = profile.contactInfo
        data.education = profile.education
        
        # Create a list of resume entry data's populated with the profile's experiences, projects, and extra curriculars
        resumeEntryData = []
        resumeEntryData.extend([ResumeEntryData(type=ResumeEntryType.EXPERIENCE, data=entry, score=0.0) for entry in profile.experiences])
        resumeEntryData.extend([ResumeEntryData(type=ResumeEntryType.PROJECT, data=entry, score=0.0) for entry in profile.projects])
        resumeEntryData.extend([ResumeEntryData(type=ResumeEntryType.EXTRA_CURRICULAR, data=entry, score=0.0) for entry in profile.extraCurriculars])
        return resumeEntryData
   
    # Abstract
    async def extract_skills(self, description: str) -> SkillHolder:
        '''
        Extracts the skills from a job description
        '''
        pass
   
    # TODO: add a filter method to accomodate the options 
    async def filter_resume(self, resume_entry_data: list[ResumeEntryData], options: ResumeCreationOptions) -> list[ResumeEntryData]:
        '''
        Filters the resume based on the options
        '''
        return resume_entry_data
    
    ###
    def get_skill_score(self, skills: list[str], skill_holder: SkillHolder) -> float:
        '''
        Returns the skill score between the skills and the job skills
        '''
        required_skills = skill_holder.required
        preferred_skills = skill_holder.preferred
        # Calculate the required score
        intersection_required = set(skills).intersection(required_skills)
        intersection_preferred = set(skills).intersection(preferred_skills)
        
        # Calculate the required and preferred score
        required_score = len(intersection_required) / len(required_skills)
        preferred_score = len(intersection_preferred) / len(preferred_skills)
        
        # Return the weighted score
        return 0.6 * required_score + 0.4 * preferred_score
        
    async def rewrite_description(self, entry: ResumeEntryData, job_description: str):
        '''
        Rewrites the description to be more similar to the job using Gen AI
        '''
        # create the chat template
        chat_template = ChatPromptTemplate.from_messages([
            SystemMessagePromptTemplate.from_template(
                """
                You are a candidate for a job whose description is provided. 
                You need to rewrite your resume entry to be more similar to the job description.
                The details of the input will be sent as a JSON text.
                The job description will be in the "job_description" field.
                The resume entry description will be in the "resume_entry_description" field.
                The skills that the entry contains will be in the "resume_entry_skills" field.
                """
            ),
            HumanMessagePromptTemplate.from_template("{input}"),
        ])
        
        # create the input
        input = ResumeRewritenInput(job_description=job_description,
                                    resume_entry_description=entry.data.description,
                                    skills=[skill.name for skill in entry.data.skills])
        
        # return the rewritten description
        entry.data.description = await self.model.ainvoke(chat_template.format_prompt(input=input).to_messages())
    
    async def generate_resume(self, profile: Profile, job: Job, options: ResumeCreationOptions = ResumeCreationOptions()) -> Resume:
        """Generates a resume based off of the profile and the job
    
        Algorithm:
        
        1. Get profile, job, and options
        2. Populate the resume data with the profile's name, contact info, and education
        3. Create a list of resume entry data's populated with the profile's experiences, projects, and extra curriculars
        4. Go through each resume entry data and calculate the similarity score between 
            the resume entry's description and skills and the job description
        5. Sort the resume entry data by the resume entry score
        6. For each resume entry data in the resume data, re-write the description to be more similar to the job using Gen AI 
            then add it to the resume data
        7. Add the resume data and job to the resume and return the resume

        Args:
            profile (Profile): The profile to generate the resume from
            job (Job): The job to generate the resume for
            options (ResumeCreationOptions, optional): The user specified options about the resume. Defaults to ResumeCreationOptions().

        Returns:
            Resume: The generated resume
        """
        
        # Populate the resume data with the profile's name, contact info, and education
        resumeEntryData = self.get_resume_entries(profile)
        
        # Extract the skills from the job description
        extracted_skills = await self.extract_skills(job.description)
        
        # Go through each resume entry data and calculate the similarity score between the resume entry's description and skills and the job description
        for entry in resumeEntryData:
            description_score = self.get_similarity_score(entry.data.description, job.description)
            skills_score = self.get_skill_score([skill.name for skill in entry.data.skills], extracted_skills)
            entry.score = entry.type * (description_score + skills_score)
        
        # Sort the resume entry data by the resume entry score
        resumeEntryData.sort(key=lambda x: x.score, reverse=True)
        
        # filter the resume
        self.filter_resume(resumeEntryData, options)
        
        # For each resume entry data in the resume data, re-write the description to be more similar to the job using Gen AI
        tasks = [self.rewrite_description(entry, job.description) for entry in resumeEntryData]
        await asyncio.gather(*tasks)
        
        # Add the resume data and job to the resume and return the resume
        data = ResumeData()
        data.experiences = []
        data.projects = [ ]
        data.extraCurriculars = []
        
        for entry in resumeEntryData:
            # populate the resume data with the profile's experiences, projects, and extra curriculars
            if entry.type == ResumeEntryType.EXPERIENCE:
                data.experiences.append(entry.data)
            elif entry.type == ResumeEntryType.PROJECT:
                data.projects.append(entry.data)
            elif entry.type == ResumeEntryType.EXTRA_CURRICULAR:
                data.extraCurriculars.append(entry.data)
            
            # add skills
            if (options.addSkills):
                data.skills += [skill for skill in entry.data.skills]
        
        if (options.addHobbies):
            data.hobbies = profile.hobbies
        
        if (options.addAwards):
            data.awards = profile.otherAwards
        
        return Resume(data, job)
        

class LangChainStrategyResumeGeneratorService(ResumeGeneratorService):
    '''
    Implements the extract_skills method using langchain
    '''

    async def extract_skills(self, description: str) -> SkillHolder:
        '''
        Extracts the skills from a job description
        '''
        chat_template = ChatPromptTemplate.from_messages(
            [
                SystemMessagePromptTemplate.from_template(
                    "You are a candidate for a job whose description is provided. You'll need to extract all the required and preferred technical skills given the job description to see whether your profile is a good fit for the position or not. Your background does not matter as long as all the skills that are required and preferred in the job description are reported back as the response. Required skills go into the required_skills array. Preferred skills would go to the preferred_skills array. Degrees (Bachelors, Masters, PhD) are not skills."
                ),
                HumanMessagePromptTemplate.from_template("{input}"),
            ]
        )
        
        skill_model = self.model.with_structured_output(SkillHolder)
        return await skill_model.ainvoke(chat_template.format_prompt(input=description).to_messages())

class SpaCyStrategyResumeGeneratorService(ResumeGeneratorService):
    '''
    Implements the extract_skills method using langchain
    '''
    nlp = spacy.load("en_core_web_sm")
    required_keywords = ["must", "required", "experience", "should", "expertise"]
    preferred_keywords = ["preferred", "nice to have", "plus"]

    def extract_skills_internal(self, job_description: str) -> SkillHolder:
        '''
        Extracts the skills from a job description
        '''
        # create a document
        doc = self.nlp(job_description)

        # create the sets
        required_skills = set()
        preferred_skills = set()

        # loop through sentences to categorize skills
        for sent in doc.sents:
            context = "neutral"

            # Determine context based on keywords
            for word in sent:
                if word.text.lower() in self.required_keywords:
                    context = "required"
                elif word.text.lower() in self.preferred_keywords:
                    context = "preferred"

            # Extract noun phrases (potential skills)
            for chunk in sent.noun_chunks:
                if context == "required":
                    required_skills.add(chunk.text)
                elif context == "preferred":
                    preferred_skills.add(chunk.text)

        return SkillHolder(required=required_skills, preferred=preferred_skills)
    
    def preprocess_document(self, document: str):
        return document.replace("\n", " ")

    def sanitize_skills(self, skills: set[str]) -> set[str]:
        sanitized_skills = set()

        for skill in skills:
            # Filter out short or overly generic phrases
            if len(skill.split()) < 2 and skill.islower():
                continue

            # Check for stopwords or generic phrases
            doc = self.nlp(skill)
            if any(token.is_stop for token in doc) or "skill" in skill.lower():
                continue

            # Retain proper nouns, nouns, or meaningful phrases
            if any(word.lower() in self.required_keywords for word in skill.split()) or any(word.lower() in self.preferred_keywords for word in skill.split()):
                continue

            if any(token.pos_ in {"NOUN", "PROPN"} for token in doc):
                sanitized_skills.add(skill.strip())

        return sanitized_skills
    
    async def extract_skills(self, job_description: str) -> SkillHolder:
        '''
        Extracts the skills from a job description
        '''
        skill_holder = self.extract_skills_internal(self.preprocess_document(job_description))
        skill_holder.required = list(self.sanitize_skills(skill_holder.required))
        skill_holder.preferred = list(self.sanitize_skills(skill_holder.preferred))
        return skill_holder
