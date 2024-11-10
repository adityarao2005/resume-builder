
from langchain_core.language_models.chat_models import BaseChatModel
from pydantic import BaseModel, Field
from typing import List
from langchain.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate
import json
from langchain_google_genai import ChatGoogleGenerativeAI

class ResumeGradingReport(BaseModel):
    '''    
    This is the output schema of the resume grading service
    this is what is returned to the user
    '''
    score: int = Field(description="The score of the report")
    pros: List[str] = Field(description="The things which the resume has which is good")
    cons: List[str] = Field(description="The things which the resume has which is bad or the things \
     which are good which this resume does not have")
    improvements: List[str] = Field(description="The ways to turn what is bad about the resume into a good resume")

class ResumeGraderService:
    '''
    This is the generic service which grades the resume.
    This is meant to be inherited by the actual service which grades the resume.
    '''
    def grade_resume(self, resume: dict) -> ResumeGradingReport:
        '''
        Grades the resume based on the language model. 
        Note that the resume should be cleaned first before sending it to this function.
        '''
        pass

class LangChainResumeGraderService(ResumeGraderService):
    '''
    This is a generic service which uses langchain to grade the resume.
    The generic part is which LLM model is being used to grade the resume.
    '''
    
    def __init__(self, model: BaseChatModel):
        '''
        Initializes the LangChainResumeGraderService with the model which is used to grade the resume.
        Passes in a LLM model which is used to grade the resume.
        '''
        # The model which is used to grade the resume
        self.model = model.with_structured_output(ResumeGradingReport)
        # The chat template which is used to grade the resume
        self.chat_template = ChatPromptTemplate.from_messages(
            [
                SystemMessagePromptTemplate.from_template(
                    "You are a hiring manager looking at resumes which are best suited for a job. \
                    The resume and job will be sent as a JSON object where the resume will be in the 'resume' \
                    key and the job will be in the 'job' key. You are to give the score of the resume, the pros, the cons and the ways to improve it"
                ),
                HumanMessagePromptTemplate.from_template("{input}"),
            ]
        )
    
    def grade_resume(self, resume: dict) -> ResumeGradingReport:
        # Convert the resume to a json string
        resume_json = json.dumps(resume)
        # Get the messages from the chat template
        messages = self.chat_template.format_prompt(input=resume_json).to_messages()
        # Invoke the model with the messages
        return self.model.invoke(messages)
    
class GeminiResumeGraderService(LangChainResumeGraderService):
    '''
    This is a service which uses the Gemini LLM model to grade the resume.
    '''
    
    def __init__(self):
        '''
        Initializes the GeminiResumeGraderService with the Gemini LLM model.
        '''
        # The Gemini LLM model which is used to grade the resume
        llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", temperature=0.7, verbose=True) 
        self.__init__(llm)
        
    def __init__(self, model: ChatGoogleGenerativeAI):
        '''
        Initializes the GeminiResumeGraderService with the Gemini LLM model by passing in the model.
        '''
        # The Gemini LLM model which is used to grade the resume
        super().__init__(model)
        