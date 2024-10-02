package com.resumebuilder.backend.models.resume;

import com.resumebuilder.backend.models.Address;
import com.resumebuilder.backend.models.Builder;
import com.resumebuilder.backend.models.Description;
import com.resumebuilder.backend.models.Duration;
import com.resumebuilder.backend.models.Job;

// Represents an experience with a title, company, duration, and description
public class Experience extends Job {
    private Address location;

    // Constructors, getters, and setters
    public Experience() {
    }

    public Experience(String title, String company, Duration duration, Description description, Address location) {
        super(title, company, duration, description);
        this.location = location;
    }

    public Address getLocation() {
        return location;
    }

    public void setLocation(Address location) {
        this.location = location;
    }

    public static class ExperienceBuilder implements Builder<Experience> {
        private Experience experience;

        public ExperienceBuilder() {
            experience = new Experience();
        }

        public ExperienceBuilder withTitle(String title) {
            experience.setTitle(title);
            return this;
        }

        public ExperienceBuilder withCompany(String company) {
            experience.setCompany(company);
            return this;
        }

        public ExperienceBuilder withDuration(Duration duration) {
            experience.setDuration(duration);
            return this;
        }

        public ExperienceBuilder withDescription(Description description) {
            experience.setDescription(description);
            return this;
        }

        public ExperienceBuilder withLocation(Address location) {
            experience.setLocation(location);
            return this;
        }

        public Experience build() {
            return experience;
        }
    }
}