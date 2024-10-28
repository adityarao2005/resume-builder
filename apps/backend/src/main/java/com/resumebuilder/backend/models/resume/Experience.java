package com.resumebuilder.backend.models.resume;

import java.util.List;

import com.resumebuilder.backend.models.Address;
import com.resumebuilder.backend.models.Builder;
import com.resumebuilder.backend.models.Duration;

// Represents an experience with a title, company, duration, and description
public class Experience {
    private Address location;
    private String title;
    private String company;
    private Duration duration;
    private List<String> description;

    // Constructors, getters, and setters
    public Experience() {
    }

    public Experience(String title, String company, Duration duration, List<String> description, Address location) {
        this.title = title;
        this.company = company;
        this.duration = duration;
        this.description = description;
        this.location = location;
    }

    public Address getLocation() {
        return location;
    }

    public void setLocation(Address location) {
        this.location = location;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }

    public List<String> getDescription() {
        return description;
    }

    public void setDescription(List<String> description) {
        this.description = description;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((location == null) ? 0 : location.hashCode());
        result = prime * result + ((title == null) ? 0 : title.hashCode());
        result = prime * result + ((company == null) ? 0 : company.hashCode());
        result = prime * result + ((duration == null) ? 0 : duration.hashCode());
        result = prime * result + ((description == null) ? 0 : description.hashCode());
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
        Experience other = (Experience) obj;
        if (location == null) {
            if (other.location != null)
                return false;
        } else if (!location.equals(other.location))
            return false;
        if (title == null) {
            if (other.title != null)
                return false;
        } else if (!title.equals(other.title))
            return false;
        if (company == null) {
            if (other.company != null)
                return false;
        } else if (!company.equals(other.company))
            return false;
        if (duration == null) {
            if (other.duration != null)
                return false;
        } else if (!duration.equals(other.duration))
            return false;
        if (description == null) {
            if (other.description != null)
                return false;
        } else if (!description.equals(other.description))
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

        public ExperienceBuilder withDescription(List<String> description) {
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