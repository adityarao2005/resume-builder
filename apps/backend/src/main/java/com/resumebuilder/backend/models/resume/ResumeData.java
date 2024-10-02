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
