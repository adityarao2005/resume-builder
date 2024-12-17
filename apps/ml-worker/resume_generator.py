from resume_data import Resume, Profile, Job, ResumeData, ProfileExperience, ProfileProject
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from enum import Enum

vectorizer = TfidfVectorizer()

# Returns the similarity score between two texts
def get_similarity_score(text1: str, text2: str) -> float:
    tfidf_matrix = vectorizer.fit_transform([text1, text2])
    return cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]

# Resume creation options
class ResumeCreationOptions:
    addHighlights: bool = False
    addHobbies: bool = False
    addAwards: bool = False
    addSkills: bool = False
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
    
class ResumeEntryType(Enum):
    # TODO: add weights to each type instead of text
    EXPERIENCE = "experience"
    PROJECT = "project"
    EXTRA_CURRICULAR = "extra_curricular"

class ResumeEntryData:
    type: ResumeEntryType
    data: ProfileExperience | ProfileProject
    score: float = 0

def generate_resume(profile: Profile, job: Job, options: ResumeCreationOptions = ResumeCreationOptions()) -> Resume:
    """Generates a resume based off of the profile and the job
    
    Algorithm:
    
    1. Get profile, job, and options
    2. Populate the resume data with the profile's name, contact info, and education
    3. Create a list of resume entry data's populated with the profile's experiences, projects, and extra curriculars
    4. Go through each resume entry data and calculate the similarity score between 
        the resume entry's description and skills and the job description
    5. Sort the resume entry data by the resume entry score
    6. Add the top n resume entry data's to the resume data
    7. For each resume entry data in the resume data, re-write the description to be more similar to the job using Gen AI 
        then add it to the resume data
    8. Add the resume data and job to the resume and return the resume

    Args:
        profile (Profile): The profile to generate the resume from
        job (Job): The job to generate the resume for
        options (ResumeCreationOptions, optional): The user specified options about the resume. Defaults to ResumeCreationOptions().

    Returns:
        Resume: The generated resume
    """
    
    data = ResumeData()
    data.name = profile.name
    data.contactInfo = profile.contactInfo
    data.education = profile.education
    
    
    
    
    # set all these after wards
    data.highlights = []
    data.experiences = []
    data.projects = []
    data.extraCurriculars = []
    data.skills = []
    data.awards = []
    data.hobbies = []
    
    
    