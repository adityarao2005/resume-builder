from fastapi import FastAPI, Request
from resume_data import Resume
from resume_grader_service import ResumeGradingReport, GeminiResumeGraderService
from resume_cleaning_service import clean_resume
from resume_generator import LangChainStrategyResumeGeneratorService, Profile, Job, ResumeCreationOptions, BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI

# The FastAPI app
app = FastAPI()
# The GeminiResumeGraderService which is used to grade the resume
model = ChatGoogleGenerativeAI(model="gemini-1.5-pro", temperature=0.7, verbose=True)
resume_grader_service = GeminiResumeGraderService(model)
resume_generator_service = LangChainStrategyResumeGeneratorService(model)


# The root route
@app.get("/")
def read_root():
    return {"Hello": "World"}

# The route to score the resume
@app.post("/score_resume/")
async def create_item(resume: Resume) -> ResumeGradingReport:
    # Convert the resume to a dictionary
    resume_dict = resume.model_dump()
    # Clean the resume
    clean_resume(resume_dict)
    # Grade the resume
    return await resume_grader_service.grade_resume(resume_dict)
    
# The route to score the resume
@app.post("/score_resume_mock/")
async def create_item(request: Request) -> ResumeGradingReport:
    # Convert the resume to a dictionary
    resume = await request.json()
    print(resume)
    return ResumeGradingReport(cons=[], pros=[], score=0.5, summary="Mocked summary")

class CreateResumeRequest(BaseModel):
    profile: Profile
    job: Job
    options: ResumeCreationOptions

# TODO: Turn this into asyncio cuz this definitely will take a while under regular IO

@app.post("/generate_resume/")
async def create_item(request: CreateResumeRequest) -> Resume:
    return resume_generator_service.generate_resume(request.profile, request.job, request.options)
    
    