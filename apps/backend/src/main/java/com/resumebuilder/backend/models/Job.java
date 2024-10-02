package com.resumebuilder.backend.models;

// Represents a job with a title, company, duration, and description
public class Job {
    private String title;
    private String company;
    private Duration duration;
    private Description description;

    // Constructors, getters, and setters
    public Job() {
    }

    public Job(String title, String company, Duration duration, Description description) {
        this.title = title;
        this.company = company;
        this.duration = duration;
        this.description = description;
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
        Job other = (Job) obj;
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

    public static class JobBuilder implements Builder<Job> {
        private Job job;

        public JobBuilder() {
            job = new Job();
        }

        public JobBuilder withTitle(String title) {
            job.setTitle(title);
            return this;
        }

        public JobBuilder withCompany(String company) {
            job.setCompany(company);
            return this;
        }

        public JobBuilder withDuration(Duration duration) {
            job.setDuration(duration);
            return this;
        }

        public JobBuilder withDescription(Description description) {
            job.setDescription(description);
            return this;
        }

        @Override
        public Job build() {
            return job;
        }
    }

}