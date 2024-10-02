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
}