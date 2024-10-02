package com.resumebuilder.backend.models;

import java.util.List;

public class Description {
    private List<String> lines;

    // Constructors, getters, and setters
    public Description() {
    }

    public Description(List<String> lines) {
        this.lines = lines;
    }

    public List<String> getLines() {
        return lines;
    }

    public void setLines(List<String> lines) {
        this.lines = lines;
    }

    public static Description from(String... lines) {
        return new Description(List.of(lines));
    }

}
