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

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + ((type == null) ? 0 : type.hashCode());
        result = prime * result + ((proficiencyLevel == null) ? 0 : proficiencyLevel.hashCode());
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
        Skill other = (Skill) obj;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (type == null) {
            if (other.type != null)
                return false;
        } else if (!type.equals(other.type))
            return false;
        if (proficiencyLevel == null) {
            if (other.proficiencyLevel != null)
                return false;
        } else if (!proficiencyLevel.equals(other.proficiencyLevel))
            return false;
        return true;
    }

    public static Skill from(String name, String type, String proficiencyLevel) {
        return new Skill(name, type, proficiencyLevel);
    }
}