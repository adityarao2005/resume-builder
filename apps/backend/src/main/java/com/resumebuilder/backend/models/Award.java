package com.resumebuilder.backend.models;

import java.time.LocalDate;

// Represents an award with a title, date, and affiliation
public class Award {
    private String title;
    private LocalDate date;
    private String affilatedTo;

    // Constructors, getters, and setters
    public Award() {
    }

    public Award(String title, LocalDate date, String affilatedTo) {
        this.title = title;
        this.date = date;
        this.affilatedTo = affilatedTo;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getAffilatedTo() {
        return affilatedTo;
    }

    public void setAffilatedTo(String affilatedTo) {
        this.affilatedTo = affilatedTo;
    }

    public static Award from(String title, LocalDate date, String affilatedTo) {
        return new Award(title, date, affilatedTo);
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((title == null) ? 0 : title.hashCode());
        result = prime * result + ((date == null) ? 0 : date.hashCode());
        result = prime * result + ((affilatedTo == null) ? 0 : affilatedTo.hashCode());
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
        Award other = (Award) obj;
        if (title == null) {
            if (other.title != null)
                return false;
        } else if (!title.equals(other.title))
            return false;
        if (date == null) {
            if (other.date != null)
                return false;
        } else if (!date.equals(other.date))
            return false;
        if (affilatedTo == null) {
            if (other.affilatedTo != null)
                return false;
        } else if (!affilatedTo.equals(other.affilatedTo))
            return false;
        return true;
    }
}