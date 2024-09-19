package com.resumebuilder.backend.models.resume;

import java.util.List;

import com.resumebuilder.backend.models.Address;
import com.resumebuilder.backend.models.Description;
import com.resumebuilder.backend.models.Duration;

public class EducationEntry {
    private String institution;
    private String qualification;
    private Address location;
    private List<String> courses;
    private Duration duration;
    private Description description;

    // Constructors, getters, and setters
    public EducationEntry() {
    }

    public EducationEntry(String institution, String qualification, Address location, List<String> courses,
            Duration duration, Description description) {
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

    public Description getDescription() {
        return description;
    }

    public void setDescription(Description description) {
        this.description = description;
    }

}
