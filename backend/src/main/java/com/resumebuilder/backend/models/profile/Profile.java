package com.resumebuilder.backend.models.profile;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.resumebuilder.backend.models.Award;
import com.resumebuilder.backend.models.Builder;
import com.resumebuilder.backend.models.resume.ContactInfo;
import com.resumebuilder.backend.models.resume.EducationEntry;
import com.resumebuilder.backend.models.resume.Skill;

@Document(collection = "profiles")
public class Profile {
    @Id
    private String id;
    private String name;
    private ContactInfo contactInfo;
    private List<EducationEntry> education;
    private List<ProfileExperience> experiences;
    private List<ProfileProject> projects;
    private List<ProfileExperience> extraCurriculars;
    private List<Skill> otherSkills;
    private List<Award> otherAwards;
    private List<String> hobbies;

    // Constructors, getters, and setters
    public Profile() {
    }

    public Profile(String id, String name, ContactInfo contactInfo, List<EducationEntry> education,
            List<ProfileExperience> experiences, List<ProfileProject> projects,
            List<ProfileExperience> extraCurriculars, List<Skill> otherSkills, List<Award> otherAwards,
            List<String> hobbies) {
        this.id = id;
        this.name = name;
        this.contactInfo = contactInfo;
        this.education = education;
        this.experiences = experiences;
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

    public List<ProfileExperience> getExperiences() {
        return experiences;
    }

    public void setExperiences(List<ProfileExperience> experiences) {
        this.experiences = experiences;
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

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + ((contactInfo == null) ? 0 : contactInfo.hashCode());
        result = prime * result + ((education == null) ? 0 : education.hashCode());
        result = prime * result + ((experiences == null) ? 0 : experiences.hashCode());
        result = prime * result + ((projects == null) ? 0 : projects.hashCode());
        result = prime * result + ((extraCurriculars == null) ? 0 : extraCurriculars.hashCode());
        result = prime * result + ((otherSkills == null) ? 0 : otherSkills.hashCode());
        result = prime * result + ((otherAwards == null) ? 0 : otherAwards.hashCode());
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
        Profile other = (Profile) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
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
        if (education == null) {
            if (other.education != null)
                return false;
        } else if (!education.equals(other.education))
            return false;
        if (experiences == null) {
            if (other.experiences != null)
                return false;
        } else if (!experiences.equals(other.experiences))
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
        if (otherSkills == null) {
            if (other.otherSkills != null)
                return false;
        } else if (!otherSkills.equals(other.otherSkills))
            return false;
        if (otherAwards == null) {
            if (other.otherAwards != null)
                return false;
        } else if (!otherAwards.equals(other.otherAwards))
            return false;
        if (hobbies == null) {
            if (other.hobbies != null)
                return false;
        } else if (!hobbies.equals(other.hobbies))
            return false;
        return true;
    }

    public static class ProfileBuilder implements Builder<Profile> {
        private Profile profile;

        public ProfileBuilder() {
            profile = new Profile();
        }

        public ProfileBuilder withId(String id) {
            profile.setId(id);
            return this;
        }

        public ProfileBuilder withName(String name) {
            profile.setName(name);
            return this;
        }

        public ProfileBuilder withContactInfo(ContactInfo contactInfo) {
            profile.setContactInfo(contactInfo);
            return this;
        }

        public ProfileBuilder withEducation(List<EducationEntry> education) {
            profile.setEducation(education);
            return this;
        }

        public ProfileBuilder withExperiences(List<ProfileExperience> experience) {
            profile.setExperiences(experience);
            return this;
        }

        public ProfileBuilder withProjects(List<ProfileProject> projects) {
            profile.setProjects(projects);
            return this;
        }

        public ProfileBuilder withExtraCurriculars(List<ProfileExperience> extraCurriculars) {
            profile.setExtraCurriculars(extraCurriculars);
            return this;
        }

        public ProfileBuilder withOtherSkills(List<Skill> otherSkills) {
            profile.setOtherSkills(otherSkills);
            return this;
        }

        public ProfileBuilder withOtherAwards(List<Award> otherAwards) {
            profile.setOtherAwards(otherAwards);
            return this;
        }

        public ProfileBuilder withHobbies(List<String> hobbies) {
            profile.setHobbies(hobbies);
            return this;
        }

        @Override
        public Profile build() {
            return profile;
        }
    }
}
