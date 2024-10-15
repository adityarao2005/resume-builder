package com.resumebuilder.backend;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import com.resumebuilder.backend.BackendApplicationTestConfiguration.Identity;
import com.resumebuilder.backend.controller.ResumeController.Ack;
import com.resumebuilder.backend.models.resume.Resume;
import com.resumebuilder.backend.models.resume.ResumeData;
import com.resumebuilder.backend.service.ResumeCompilationService.ResumeCompilationReport;

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


    // TODO: Implement the rest of the methods for ResumeController to test them
    @Test
    public void testWebSocketSession() throws Exception {
        // Create the session
        StompWebClientSession session = new StompWebClientSession(stompClient, getWebSocketURL());
        // Subscribe to the necessary queues
        session.subscribe("/user/queue/resume", Resume.class);
        session.subscribe("/user/queue/resume/ack", Ack.class);
        session.subscribe("/user/queue/resume/report", ResumeCompilationReport.class);

        // TODO: Fetch the resume id and pass it to the session.sendAndAwait method
        Resume resume = session.sendAndAwait("/app/resume/{id}", null, Resume.class);
        assertThat(resume).isNotNull();

        // Sets the name
        ResumeData data = resume.getData();
        data.setName("John Doe");
        Ack ack = session.sendAndAwait("/app/resume/name", data.getName(), Ack.class);
        // Check if everything worked out
        assertThat(ack).isNotNull();
        assertThat(ack.success()).isTrue();
        assertThat(ack.action()).isEqualTo("update/setName");
        assertThat(ack.message()).isEqualTo("Operation successful");

    }
}
