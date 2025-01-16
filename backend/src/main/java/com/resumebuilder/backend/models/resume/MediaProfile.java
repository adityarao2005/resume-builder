package com.resumebuilder.backend.models.resume;

// Represents a user's media profile (e.g., LinkedIn, GitHub) in a resume
public class MediaProfile {
    private String platform;
    private String handle;

    // Constructors, getters, and setters
    public MediaProfile() {
    }

    public MediaProfile(String platform, String handle) {
        this.platform = platform;
        this.handle = handle;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getHandle() {
        return handle;
    }

    public void setHandle(String handle) {
        this.handle = handle;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((handle == null) ? 0 : handle.hashCode());
        result = prime * result + ((platform == null) ? 0 : platform.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        MediaProfile other = (MediaProfile) obj;
        return platform.equals(other.platform) && handle.equals(other.handle);
    }

}
