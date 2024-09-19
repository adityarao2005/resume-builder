package com.resumebuilder.backend.models.resume;

import com.resumebuilder.backend.models.Description;
import com.resumebuilder.backend.models.Duration;

public class Project {
    private String title;
    private Duration duration;
    private Description description;

    // Constructors, getters, and setters
    public Project() {
    }

    public Project(String title, Duration duration, Description description) {
        this.title = title;
        this.duration = duration;
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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
