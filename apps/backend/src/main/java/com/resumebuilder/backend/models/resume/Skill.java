package com.resumebuilder.backend.models.resume;

// Represents a skill with a name and proficiency level
public class Skill {
    private String name;
    private String type;
    private String proficiencyLevel;

    // Constructors, getters, and setters
    public Skill() {
    }

    public Skill(String name, String type, String proficiencyLevel) {
        this.name = name;
        this.type = type;
        this.proficiencyLevel = proficiencyLevel;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getProficiencyLevel() {
        return proficiencyLevel;
    }

    public void setProficiencyLevel(String proficiencyLevel) {
        this.proficiencyLevel = proficiencyLevel;
    }
}