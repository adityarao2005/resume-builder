package com.resumebuilder.backend.models.profile;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.resumebuilder.backend.models.Award;
import com.resumebuilder.backend.models.resume.ContactInfo;
import com.resumebuilder.backend.models.resume.EducationEntry;
import com.resumebuilder.backend.models.resume.Skill;

@Document(collection = "profiles")
public class Profile {
    @Id
    private String id;
    private String userId;
    private String name;
    private ContactInfo contactInfo;
    private List<EducationEntry> education;
    private List<ProfileExperience> experience;
    private List<ProfileProject> projects;
    private List<ProfileExperience> extraCurriculars;
    private List<Skill> otherSkills;
    private List<Award> otherAwards;
    private List<String> hobbies;

    // Constructors, getters, and setters
    public Profile() {
    }

    public Profile(String id, String userId, String name, ContactInfo contactInfo, List<EducationEntry> education,
            List<ProfileExperience> experience, List<ProfileProject> projects,
            List<ProfileExperience> extraCurriculars, List<Skill> otherSkills, List<Award> otherAwards,
            List<String> hobbies) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.contactInfo = contactInfo;
        this.education = education;
        this.experience = experience;
        this.projects = projects;
        this.extraCurriculars = extraCurriculars;
        this.otherSkills = otherSkills;
        this.otherAwards = otherAwards;
        this.hobbies = hobbies;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public List<EducationEntry> getEducation() {
        return education;
    }

    public void setEducation(List<EducationEntry> education) {
        this.education = education;
    }

    public List<ProfileExperience> getExperience() {
        return experience;
    }

    public void setExperience(List<ProfileExperience> experience) {
        this.experience = experience;
    }

    public List<ProfileProject> getProjects() {
        return projects;
    }

    public void setProjects(List<ProfileProject> projects) {
        this.projects = projects;
    }

    public List<ProfileExperience> getExtraCurriculars() {
        return extraCurriculars;
    }

    public void setExtraCurriculars(List<ProfileExperience> extraCurriculars) {
        this.extraCurriculars = extraCurriculars;
    }

    public List<Skill> getOtherSkills() {
        return otherSkills;
    }

    public void setOtherSkills(List<Skill> otherSkills) {
        this.otherSkills = otherSkills;
    }

    public List<Award> getOtherAwards() {
        return otherAwards;
    }

    public void setOtherAwards(List<Award> otherAwards) {
        this.otherAwards = otherAwards;
    }

    public List<String> getHobbies() {
        return hobbies;
    }

    public void setHobbies(List<String> hobbies) {
        this.hobbies = hobbies;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

}
