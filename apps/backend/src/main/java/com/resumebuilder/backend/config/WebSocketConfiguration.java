package com.resumebuilder.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.lang.NonNull;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.security.config.annotation.web.socket.EnableWebSocketSecurity;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.resumebuilder.backend.service.IdentityService;

@Configuration
@EnableWebSocketMessageBroker
@EnableWebSocketSecurity
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {
    @Autowired
    private IdentityService identityService;

    @Override
    public void registerStompEndpoints(@NonNull StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOrigins("*").withSockJS();
    }

    @Override
    public void configureMessageBroker(@NonNull MessageBrokerRegistry config) {
        config.enableSimpleBroker("/queue");
        config.setUserDestinationPrefix("/user");
    }

    // Listener for WebSocket connection events
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        var principal = event.getUser();
        // Initialize the service with user-specific information
        System.out.println("Principal: " + principal);
        identityService.setIdentity(principal);
        System.out.println("WebSocket connection established for user: " + principal.getName());
    }

    // Listener for WebSocket disconnection events
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        System.out.println("WebSocket connection closed for user: " + identityService.getUserId());
        identityService.setIdentity(null);
    }

}
