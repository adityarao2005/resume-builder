from pydantic import BaseModel, Field, field_validator
from datetime import datetime

class Duration(BaseModel):
    start: dict[str, str]
    end: dict[str, str]

class Location(BaseModel):
    city: str
    country: str

class Job(BaseModel):
    title: str
    company: str
    description: str

class Education(BaseModel):
    qualification: str
    institution: str
    duration: Duration
    location: Location
    description: list[str]

class Experience(BaseModel):
    title: str
    company: str
    description: list[str]
    duration: Duration
    location: Location

class Project(BaseModel):
    title: str
    description: list[str]
    duration: Duration

class Award(BaseModel):
    title: str
    date: Duration
    affilatedTo: str | None = Field(default=None)

class Skill(BaseModel):
    name: str
    type: str
    proficiencyLevel: str | None = Field(default=None)
    
class MediaProfile(BaseModel):
    platform: str
    handle: str

class ContactInfo(BaseModel):
    address: Location | None = Field(default=None)
    mediaProfiles: list[MediaProfile]

class ResumeData(BaseModel):
    name: str
    contactInfo: ContactInfo
    highlights: list[str]
    education: list[Education]
    experiences: list[Experience]
    projects: list[Project]
    extraCurriculars: list[Experience]
    skills: list[Skill]
    awards: list[Award]
    hobbies: list[str]

class Resume(BaseModel):
    job: Job
    data: ResumeData

