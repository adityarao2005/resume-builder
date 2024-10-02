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

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((title == null) ? 0 : title.hashCode());
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
        Project other = (Project) obj;
        if (title == null) {
            if (other.title != null)
                return false;
        } else if (!title.equals(other.title))
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
