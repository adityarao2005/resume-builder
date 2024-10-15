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

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + ((location == null) ? 0 : location.hashCode());
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
        Experience other = (Experience) obj;
        if (location == null) {
            if (other.location != null)
                return false;
        } else if (!location.equals(other.location))
            return false;
        return true;
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