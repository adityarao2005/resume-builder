package com.resumebuilder.backend.models.resume;

import java.util.List;

import com.resumebuilder.backend.models.Award;
import com.resumebuilder.backend.models.Builder;
import com.resumebuilder.backend.models.Description;

public class ResumeData {
    private String name;
    private ContactInfo contactInfo;
    private Description highlights;
    private List<EducationEntry> education;
    private List<Experience> experience;
    private List<Project> projects;
    private List<Experience> extraCurriculars;
    private List<Skill> skills;
    private List<Award> awards;
    private List<String> hobbies;

    // Constructors, getters, and setters
    public ResumeData() {
    }

    public ResumeData(String name, ContactInfo contactInfo, Description highlights, List<EducationEntry> education,
            List<Experience> experience, List<Project> projects, List<Experience> extraCurriculars,
            List<Skill> skills, List<Award> awards, List<String> hobbies) {
        this.name = name;
        this.contactInfo = contactInfo;
        this.highlights = highlights;
        this.education = education;
        this.experience = experience;
        this.projects = projects;
        this.extraCurriculars = extraCurriculars;
        this.skills = skills;
        this.awards = awards;
        this.hobbies = hobbies;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ContactInfo getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(ContactInfo contactInfo) {
        this.contactInfo = contactInfo;
    }

    public Description getHighlights() {
        return highlights;
    }

    public void setHighlights(Description highlights) {
        this.highlights = highlights;
    }

    public List<EducationEntry> getEducation() {
        return education;
    }

    public void setEducation(List<EducationEntry> education) {
        this.education = education;
    }

    public List<Experience> getExperience() {
        return experience;
    }

    public void setExperience(List<Experience> experience) {
        this.experience = experience;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    public List<Experience> getExtraCurriculars() {
        return extraCurriculars;
    }

    public void setExtraCurriculars(List<Experience> extraCurriculars) {
        this.extraCurriculars = extraCurriculars;
    }

    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }

    public List<Award> getAwards() {
        return awards;
    }

    public void setAwards(List<Award> awards) {
        this.awards = awards;
    }

    public List<String> getHobbies() {
        return hobbies;
    }

    public void setHobbies(List<String> hobbies) {
        this.hobbies = hobbies;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + ((contactInfo == null) ? 0 : contactInfo.hashCode());
        result = prime * result + ((highlights == null) ? 0 : highlights.hashCode());
        result = prime * result + ((education == null) ? 0 : education.hashCode());
        result = prime * result + ((experience == null) ? 0 : experience.hashCode());
        result = prime * result + ((projects == null) ? 0 : projects.hashCode());
        result = prime * result + ((extraCurriculars == null) ? 0 : extraCurriculars.hashCode());
        result = prime * result + ((skills == null) ? 0 : skills.hashCode());
        result = prime * result + ((awards == null) ? 0 : awards.hashCode());
        result = prime * result + ((hobbies == null) ? 0 : hobbies.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ResumeData other = (ResumeData) obj;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (contactInfo == null) {
            if (other.contactInfo != null)
                return false;
        } else if (!contactInfo.equals(other.contactInfo))
            return false;
        if (highlights == null) {
            if (other.highlights != null)
                return false;
        } else if (!highlights.equals(other.highlights))
            return false;
        if (education == null) {
            if (other.education != null)
                return false;
        } else if (!education.equals(other.education))
            return false;
        if (experience == null) {
            if (other.experience != null)
                return false;
        } else if (!experience.equals(other.experience))
            return false;
        if (projects == null) {
            if (other.projects != null)
                return false;
        } else if (!projects.equals(other.projects))
            return false;
        if (extraCurriculars == null) {
            if (other.extraCurriculars != null)
                return false;
        } else if (!extraCurriculars.equals(other.extraCurriculars))
            return false;
        if (skills == null) {
            if (other.skills != null)
                return false;
        } else if (!skills.equals(other.skills))
            return false;
        if (awards == null) {
            if (other.awards != null)
                return false;
        } else if (!awards.equals(other.awards))
            return false;
        if (hobbies == null) {
            if (other.hobbies != null)
                return false;
        } else if (!hobbies.equals(other.hobbies))
            return false;
        return true;
    }

    public static class ResumeDataBuilder implements Builder<ResumeData> {
        private ResumeData resumeData;

        public ResumeDataBuilder() {
            resumeData = new ResumeData();
        }

        public ResumeDataBuilder withName(String name) {
            resumeData.setName(name);
            return this;
        }

        public ResumeDataBuilder withContactInfo(ContactInfo contactInfo) {
            resumeData.setContactInfo(contactInfo);
            return this;
        }

        public ResumeDataBuilder withHighlights(Description highlights) {
            resumeData.setHighlights(highlights);
            return this;
        }

        public ResumeDataBuilder withEducation(List<EducationEntry> education) {
            resumeData.setEducation(education);
            return this;
        }

        public ResumeDataBuilder withExperience(List<Experience> experience) {
            resumeData.setExperience(experience);
            return this;
        }

        public ResumeDataBuilder withProjects(List<Project> projects) {
            resumeData.setProjects(projects);
            return this;
        }

        public ResumeDataBuilder withExtraCurriculars(List<Experience> extraCurriculars) {
            resumeData.setExtraCurriculars(extraCurriculars);
            return this;
        }

        public ResumeDataBuilder withSkills(List<Skill> skills) {
            resumeData.setSkills(skills);
            return this;
        }

        public ResumeDataBuilder withAwards(List<Award> awards) {
            resumeData.setAwards(awards);
            return this;
        }

        public ResumeDataBuilder withHobbies(List<String> hobbies) {
            resumeData.setHobbies(hobbies);
            return this;
        }

        @Override
        public ResumeData build() {
            return resumeData;
        }
    } 
}
