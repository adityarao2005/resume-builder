package com.resumebuilder.backend.models;

import java.time.LocalDate;

// Represents a duration with a start and end date
public class Duration {
    private LocalDate start;
    private LocalDate end;

    // Constructors
    public Duration() {
    }

    public Duration(LocalDate start, LocalDate end) {
        this.start = start;
        this.end = end;
    }

    // Getters and Setters
    public LocalDate getStart() {
        return start;
    }

    public void setStart(LocalDate start) {
        this.start = start;
    }

    public LocalDate getEnd() {
        return end;
    }

    public void setEnd(LocalDate end) {
        this.end = end;
    }
}