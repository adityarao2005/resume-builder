package com.resumebuilder.backend.models.profile;

import java.util.List;

import com.resumebuilder.backend.models.Builder;
import com.resumebuilder.backend.models.Duration;
import com.resumebuilder.backend.models.resume.Project;
import com.resumebuilder.backend.models.resume.Skill;

public class ProfileProject extends Project {
    private List<Skill> skills;

    // Constructors, getters, and setters
    public ProfileProject() {
    }

    public ProfileProject(String title, Duration duration, List<String> description, List<Skill> skills) {
        super(title, duration, description);
        this.skills = skills;
    }

    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + ((skills == null) ? 0 : skills.hashCode());
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
        ProfileProject other = (ProfileProject) obj;
        if (skills == null) {
            if (other.skills != null)
                return false;
        } else if (!skills.equals(other.skills))
            return false;
        return true;
    }

    public static class ProfileProjectBuilder implements Builder<ProfileProject> {
        private ProfileProject project;

        public ProfileProjectBuilder() {
            project = new ProfileProject();
        }

        public ProfileProjectBuilder withTitle(String title) {
            project.setTitle(title);
            return this;
        }

        public ProfileProjectBuilder withDuration(Duration duration) {
            project.setDuration(duration);
            return this;
        }

        public ProfileProjectBuilder withDescription(List<String> description) {
            project.setDescription(description);
            return this;
        }

        public ProfileProjectBuilder withSkills(List<Skill> skills) {
            project.setSkills(skills);
            return this;
        }

        @Override
        public ProfileProject build() {
            return project;
        }
    }

}
