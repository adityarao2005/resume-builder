package com.resumebuilder.backend.service;

import java.security.Principal;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;

@Service
@Scope(value = "websocket", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class WebSocketIdentityService {

    private Principal identity;

    public WebSocketIdentityService() {
    }

    public WebSocketIdentityService(Principal identity) {
        this.identity = identity;
    }

    public Principal getIdentity() {
        return identity;
    }

    public void setIdentity(Principal identity) {
        this.identity = identity;
    }

    public boolean isAuthenticated() {
        return identity != null;
    }

    public String getUserId() {
        return identity.getName();
    }
}
