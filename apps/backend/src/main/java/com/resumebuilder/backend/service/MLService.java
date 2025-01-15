package com.resumebuilder.backend.service;

import java.util.List;

import com.resumebuilder.backend.models.Job;
import com.resumebuilder.backend.models.profile.Profile;
import com.resumebuilder.backend.models.resume.Resume;

public interface MLService {

    public record MLResumeScoreResponse(int score, List<String> pros, List<String> cons, List<String> improvements) {
    }

    public class ResumeCreationStrategy {
        private int pages;
        private int minExperiences;
        private int maxExperiences;
        private int minProjects;
        private int maxProjects;
        private int minExtraCurriculars;
        private int maxExtraCurriculars;

        public ResumeCreationStrategy() {
            this(-1, -1, -1, -1, -1, -1, -1);
        }

        public ResumeCreationStrategy(int pages, int minExperiences, int maxExperiences, int minProjects, int maxProjects,
                int minExtraCurriculars, int maxExtraCurriculars) {
            this.pages = pages;
            this.minExperiences = minExperiences;
            this.maxExperiences = maxExperiences;
            this.minProjects = minProjects;
            this.maxProjects = maxProjects;
            this.minExtraCurriculars = minExtraCurriculars;
            this.maxExtraCurriculars = maxExtraCurriculars;
        }

        public int getPages() {
            return pages;
        }

        public void setPages(int pages) {
            this.pages = pages;
        }

        public int getMinExperiences() {
            return minExperiences;
        }

        public void setMinExperiences(int minExperiences) {
            this.minExperiences = minExperiences;
        }

        public int getMaxExperiences() {
            return maxExperiences;
        }

        public void setMaxExperiences(int maxExperiences) {
            this.maxExperiences = maxExperiences;
        }

        public int getMinProjects() {
            return minProjects;
        }

        public void setMinProjects(int minProjects) {
            this.minProjects = minProjects;
        }

        public int getMaxProjects() {
            return maxProjects;
        }

        public void setMaxProjects(int maxProjects) {
            this.maxProjects = maxProjects;
        }

        public int getMinExtraCurriculars() {
            return minExtraCurriculars;
        }

        public void setMinExtraCurriculars(int minExtraCurriculars) {
            this.minExtraCurriculars = minExtraCurriculars;
        }

        public int getMaxExtraCurriculars() {
            return maxExtraCurriculars;
        }

        public void setMaxExtraCurriculars(int maxExtraCurriculars) {
            this.maxExtraCurriculars = maxExtraCurriculars;
        }

    }

    public class ResumeCreationOptions {
        private boolean addHighlights = false;
        private boolean addHobbies = false;
        private boolean addAwards = false;
        private boolean addSkills = true;
        private int minDescriptionLength = 0;
        private int maxDescriptionLength = 5;
        private ResumeCreationStrategy filterStrategy;

        public ResumeCreationOptions() {
        }

        public ResumeCreationOptions(boolean addHighlights, boolean addHobbies, boolean addAwards, boolean addSkills,
                int minDescriptionLength, int maxDescriptionLength, ResumeCreationStrategy filterStrategy) {
            this.addHighlights = addHighlights;
            this.addHobbies = addHobbies;
            this.addAwards = addAwards;
            this.addSkills = addSkills;
            this.minDescriptionLength = minDescriptionLength;
            this.maxDescriptionLength = maxDescriptionLength;
            this.filterStrategy = filterStrategy;
        }

        public boolean isAddHighlights() {
            return addHighlights;
        }

        public boolean isAddHobbies() {
            return addHobbies;
        }

        public boolean isAddAwards() {
            return addAwards;
        }

        public boolean isAddSkills() {
            return addSkills;
        }

        public int getMinDescriptionLength() {
            return minDescriptionLength;
        }

        public int getMaxDescriptionLength() {
            return maxDescriptionLength;
        }

        public ResumeCreationStrategy getFilterStrategy() {
            return filterStrategy;
        }

        public void setAddHighlights(boolean addHighlights) {
            this.addHighlights = addHighlights;
        }

        public void setAddHobbies(boolean addHobbies) {
            this.addHobbies = addHobbies;
        }

        public void setAddAwards(boolean addAwards) {
            this.addAwards = addAwards;
        }

        public void setAddSkills(boolean addSkills) {
            this.addSkills = addSkills;
        }

        public void setMinDescriptionLength(int minDescriptionLength) {
            this.minDescriptionLength = minDescriptionLength;
        }

        public void setMaxDescriptionLength(int maxDescriptionLength) {
            this.maxDescriptionLength = maxDescriptionLength;
        }

        public void setFilterStrategy(ResumeCreationStrategy filterStrategy) {
            this.filterStrategy = filterStrategy;
        }
        
    }

    public record MLResumeGeneratorRequest(Profile profile, Job job, ResumeCreationOptions options) {
    }

    public MLResumeScoreResponse getResumeScore(Resume resume);

    public Resume generateResume(MLResumeGeneratorRequest request);

}