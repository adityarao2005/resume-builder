package com.resumebuilder.backend.service;

import java.security.Principal;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class IdentityService {
    // 1. Store the identity of the user
    private Principal identity;

    // Default constructor
    public IdentityService() {
    }

    @PostConstruct
    public void init() {
        identity = SecurityContextHolder.getContext().getAuthentication();
    }

    public IdentityService(Principal identity) {
        this.identity = identity;
    }

    public Principal getIdentity() {
        if (identity == null)
            init();

        return identity;
    }

    public void setIdentity(Principal identity) {
        this.identity = identity;
    }

    public boolean isAuthenticated() {
        return identity != null;
    }

    public String getUserId() {
        if (identity == null)
            init();

        return identity.getName();
    }
}
