package com.resumebuilder.backend.models.resume;

import java.util.List;

import com.resumebuilder.backend.models.Address;
import com.resumebuilder.backend.models.Builder;
import com.resumebuilder.backend.models.Duration;

public class EducationEntry {
    private String institution;
    private String qualification;
    private Address location;
    private List<String> courses;
    private Duration duration;
    private List<String> description;

    // Constructors, getters, and setters
    public EducationEntry() {
    }

    public EducationEntry(String institution, String qualification, Address location, List<String> courses,
            Duration duration, List<String> description) {
        this.institution = institution;
        this.qualification = qualification;
        this.location = location;
        this.courses = courses;
        this.duration = duration;
        this.description = description;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public Address getLocation() {
        return location;
    }

    public void setLocation(Address location) {
        this.location = location;
    }

    public List<String> getCourses() {
        return courses;
    }

    public void setCourses(List<String> courses) {
        this.courses = courses;
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
        result = prime * result + ((institution == null) ? 0 : institution.hashCode());
        result = prime * result + ((qualification == null) ? 0 : qualification.hashCode());
        result = prime * result + ((location == null) ? 0 : location.hashCode());
        result = prime * result + ((courses == null) ? 0 : courses.hashCode());
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
        EducationEntry other = (EducationEntry) obj;
        if (institution == null) {
            if (other.institution != null)
                return false;
        } else if (!institution.equals(other.institution))
            return false;
        if (qualification == null) {
            if (other.qualification != null)
                return false;
        } else if (!qualification.equals(other.qualification))
            return false;
        if (location == null) {
            if (other.location != null)
                return false;
        } else if (!location.equals(other.location))
            return false;
        if (courses == null) {
            if (other.courses != null)
                return false;
        } else if (!courses.equals(other.courses))
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

    public static class EducationEntryBuilder implements Builder<EducationEntry> {
        private EducationEntry educationEntry;

        public EducationEntryBuilder() {
            educationEntry = new EducationEntry();
        }

        public EducationEntryBuilder withInstitution(String institution) {
            educationEntry.setInstitution(institution);
            return this;
        }

        public EducationEntryBuilder withQualification(String qualification) {
            educationEntry.setQualification(qualification);
            return this;
        }

        public EducationEntryBuilder withLocation(Address location) {
            educationEntry.setLocation(location);
            return this;
        }

        public EducationEntryBuilder withCourses(List<String> courses) {
            educationEntry.setCourses(courses);
            return this;
        }

        public EducationEntryBuilder withDuration(Duration duration) {
            educationEntry.setDuration(duration);
            return this;
        }

        public EducationEntryBuilder withDescription(List<String> description) {
            educationEntry.setDescription(description);
            return this;
        }

        @Override
        public EducationEntry build() {
            return educationEntry;
        }
    }
}
