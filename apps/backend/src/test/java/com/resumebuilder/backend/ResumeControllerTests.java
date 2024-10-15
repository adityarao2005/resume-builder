package com.resumebuilder.backend;

import static org.assertj.core.api.Assertions.assertThat;

import java.lang.reflect.Type;
import java.security.Principal;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;
import org.springframework.lang.NonNull;
import org.springframework.lang.NonNullFields;
import org.springframework.lang.Nullable;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import com.resumebuilder.backend.BackendApplicationTestConfiguration.Identity;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Import(value = { BackendApplicationTestConfiguration.class, WebsocketTestConfiguration.class })
public class ResumeControllerTests {

    @Autowired
    private Identity identity;

    @Autowired
    private WebSocketStompClient stompClient;

    @LocalServerPort
    private int port;

    public String getWebSocketURL() {
        return "ws://localhost:" + port + "/ws?access_token=" + identity.idToken();
    }

    @Test
    void contextLoads() {
        assertThat(getWebSocketURL()).isNotNull();
    }

    @Test
    public void testAuthWebSocketConnection() throws Exception {
        StompWebClientSession session = new StompWebClientSession(stompClient, getWebSocketURL());

        session.subscribeAck("/user/queue/ping", Principal.class);
        Principal principal = session.sendAndReceive("/app/ping", "/user/queue/ping", session, Principal.class);

        session.disconnect();

        assertThat(principal).isNotNull();
        assertThat(principal.getName()).isEqualTo(identity.localId());
    }

    public record Greeting(String content) {
    }

    @Test
    public void testPing() throws Exception {
        CountDownLatch latch = new CountDownLatch(1);

        String urlWithToken = getWebSocketURL();
        StompSession session = stompClient.connectAsync(urlWithToken, new StompSessionHandlerAdapter() {
            @Override
            public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
                System.out.println("Connected to WebSocket");
            }

            @Override
            public void handleException(StompSession session, StompCommand command, StompHeaders headers,
                    byte[] payload, Throwable exception) {
                System.err.println("WebSocket error: " + exception.getMessage());
                latch.countDown(); // Ensure we don't hang in case of errors
            }
        }).get(1, TimeUnit.SECONDS);

        session.subscribe("/user/queue/ping", new StompSessionHandlerAdapter() {
            @Override
            public void handleFrame(@NonNull StompHeaders headers, @Nullable Object payload) {
                assertThat(payload).isInstanceOf(Greeting.class);
                assertThat(payload).isEqualTo(new Greeting("pong")); // Assuming "pong" is the expected response
                latch.countDown();
            }

            @Override
            public @NonNull Type getPayloadType(@NonNull StompHeaders headers) {
                return Greeting.class;
            }
        });

        session.send("/app/ping", new Greeting("ping"));

        boolean recieved = latch.await(5, TimeUnit.SECONDS);
        assertThat(recieved).isTrue();
    }
}
