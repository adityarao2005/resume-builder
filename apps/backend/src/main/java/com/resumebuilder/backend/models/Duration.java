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

    public static Duration from(LocalDate start, LocalDate end) {
        return new Duration(start, end);
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((start == null) ? 0 : start.hashCode());
        result = prime * result + ((end == null) ? 0 : end.hashCode());
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
        Duration other = (Duration) obj;
        if (start == null) {
            if (other.start != null)
                return false;
        } else if (!start.equals(other.start))
            return false;
        if (end == null) {
            if (other.end != null)
                return false;
        } else if (!end.equals(other.end))
            return false;
        return true;
    }
}