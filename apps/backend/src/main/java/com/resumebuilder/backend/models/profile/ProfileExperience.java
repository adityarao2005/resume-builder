package com.resumebuilder.backend.models.profile;

import java.util.List;

import com.resumebuilder.backend.models.Address;
import com.resumebuilder.backend.models.Builder;
import com.resumebuilder.backend.models.Description;
import com.resumebuilder.backend.models.Duration;
import com.resumebuilder.backend.models.resume.Experience;
import com.resumebuilder.backend.models.resume.Skill;

public class ProfileExperience extends Experience {
    private List<Skill> skills;

    // Constructors, getters, and setters
    public ProfileExperience() {
    }

    public ProfileExperience(String title, String company, Duration duration, Description description, Address location,
            List<Skill> skills) {
        super(title, company, duration, description, location);
        this.skills = skills;
    }

    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + ((skills == null) ? 0 : skills.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (!super.equals(obj))
            return false;
        if (getClass() != obj.getClass())
            return false;
        ProfileExperience other = (ProfileExperience) obj;
        if (skills == null) {
            if (other.skills != null)
                return false;
        } else if (!skills.equals(other.skills))
            return false;
        return true;
    }

    public static class ProfileExperienceBuilder implements Builder<ProfileExperience> {
        private ProfileExperience experience;

        public ProfileExperienceBuilder() {
            experience = new ProfileExperience();
        }

        public ProfileExperienceBuilder withTitle(String title) {
            experience.setTitle(title);
            return this;
        }

        public ProfileExperienceBuilder withCompany(String company) {
            experience.setCompany(company);
            return this;
        }

        public ProfileExperienceBuilder withDuration(Duration duration) {
            experience.setDuration(duration);
            return this;
        }

        public ProfileExperienceBuilder withDescription(Description description) {
            experience.setDescription(description);
            return this;
        }

        public ProfileExperienceBuilder withLocation(Address location) {
            experience.setLocation(location);
            return this;
        }

        public ProfileExperienceBuilder withSkills(List<Skill> skills) {
            experience.setSkills(skills);
            return this;
        }

        @Override
        public ProfileExperience build() {
            return experience;
        }
    }

}
