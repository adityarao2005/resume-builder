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

@SuppressWarnings("deprecation")
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration extends AbstractSecurityWebSocketMessageBrokerConfigurer {
    @Autowired
    private WebSocketIdentityService identityService;

    @Override
    protected boolean sameOriginDisabled() {
        return true;
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOrigins("*").withSockJS();
    }

    @Override
    public void configureMessageBroker(@NonNull MessageBrokerRegistry config) {
        config.enableSimpleBroker("/queue");
        config.setApplicationDestinationPrefixes("/app");
        config.setUserDestinationPrefix("/user");
    }

    // Listener for WebSocket connection events
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
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
