package com.resumebuilder.backend;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.web.socket.messaging.WebSocketStompClient;

public class StompWebClientSession extends StompSessionHandlerAdapter {
    private StompSession session;
    private Map<String, BlockingQueue<Object>> topicQueueMap = new HashMap<>();

    public StompWebClientSession(WebSocketStompClient client, String url) {
        try {
            session = client
                    .connectAsync(url, this)
                    .get();
        } catch (Exception e) {
            throw new RuntimeException("Connection failed." + e.getMessage()); // Do some failover and implement retry patterns.
        }
    }

    @Override
    public void afterConnected(@NonNull StompSession session, @NonNull StompHeaders connectedHeaders) {
        super.afterConnected(session, connectedHeaders);
    }

    public void subscribe(String topic, StompFrameHandler handler) {
        session.subscribe(topic, handler);
    }

    public void subscribeAck(String topic, Class<?> clazz) {
        topicQueueMap.putIfAbsent(topic, new ArrayBlockingQueue<>(10));

        session.subscribe(topic, new StompFrameHandler() {
            @Override
            public @NonNull Type getPayloadType(@NonNull StompHeaders headers) {
                return clazz;
            }

            @Override
            public void handleFrame(@NonNull StompHeaders headers, @Nullable Object payload) {
                System.out.println("Received: " + payload);

                topicQueueMap.get(topic).add(payload);
            }
        });
    }

    public void send(String topic, Object payload) {
        session.send(topic, payload);
    }

    @SuppressWarnings("unchecked")
    public <T> T sendAndReceive(String topicSend, String topicReceive, Object payload, Class<T> clazz) {
        send(topicSend, payload);

        try {
            if (topicQueueMap.containsKey(topicReceive)) {
                return (T) topicQueueMap.get(topicReceive).take();
            } else {
                throw new Exception("No subscription created.");
            }
        } catch (Exception e) {
            throw new RuntimeException("Interrupted while waiting for response.");
        }
    }

    public void disconnect() {
        session.disconnect();
    }
}
