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