from fastapi import FastAPI
from resume_data import Resume
from resume_grader_service import ResumeGradingReport, GeminiResumeGraderService
from resume_cleaning_service import clean_resume
import app_secrets

# The FastAPI app
app = FastAPI()
# The GeminiResumeGraderService which is used to grade the resume
resume_grader_service = GeminiResumeGraderService()

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
    return resume_grader_service.grade_resume(resume_dict)
    
    