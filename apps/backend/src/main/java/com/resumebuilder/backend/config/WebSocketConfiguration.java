package com.resumebuilder.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.lang.NonNull;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.resumebuilder.backend.service.WebSocketIdentityService;

// This class configures WebSocket settings for the application
@SuppressWarnings("deprecation")
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration extends AbstractSecurityWebSocketMessageBrokerConfigurer {
    // Injecting the WebSocketIdentityService to manage user identities
    @Autowired
    private WebSocketIdentityService identityService;

    // Disabling same-origin policy for WebSocket connections
    @Override
    protected boolean sameOriginDisabled() {
        return true;
    }

    // Registering STOMP endpoints for WebSocket connections
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOrigins("http://localhost:3000").withSockJS();
    }

    // Configuring the message broker for WebSocket communication
    @Override
    public void configureMessageBroker(@NonNull MessageBrokerRegistry config) {
        config.enableSimpleBroker("/queue");
        config.setApplicationDestinationPrefixes("/app");
        config.setUserDestinationPrefix("/user");
    }

    // Listener for WebSocket connection events
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        // Get the user from the event and set it in the identity service
        var principal = event.getUser();
        // Initialize the service with user-specific information
        identityService.setIdentity(principal);
    }

    // Listener for WebSocket disconnection events
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        identityService.setIdentity(null);
    }

}
