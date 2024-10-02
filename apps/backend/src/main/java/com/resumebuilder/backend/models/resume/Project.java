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

    public static class ProjectBuilder {
        private Project project;

        public ProjectBuilder() {
            project = new Project();
        }

        public ProjectBuilder withTitle(String title) {
            project.setTitle(title);
            return this;
        }

        public ProjectBuilder withDuration(Duration duration) {
            project.setDuration(duration);
            return this;
        }

        public ProjectBuilder withDescription(Description description) {
            project.setDescription(description);
            return this;
        }

        public Project build() {
            return project;
        }
    }
}
