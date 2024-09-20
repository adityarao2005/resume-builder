package com.resumebuilder.backend.service;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@Scope(scopeName = "websocket", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class WebSocketIdentityService {
    private UserDetails identity;

    public void setIdentity(UserDetails identity) {
        this.identity = identity;
    }

    public UserDetails getIdentity() {
        return identity;
    }

    public boolean isAuthenticated() {
        return identity != null;
    }
}
