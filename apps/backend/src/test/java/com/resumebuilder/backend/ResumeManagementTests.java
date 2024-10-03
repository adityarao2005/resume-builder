package com.resumebuilder.backend;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Import;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;

import com.resumebuilder.backend.BackendApplicationTestConfiguration.Identity;
import com.resumebuilder.backend.models.resume.Resume;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Import(BackendApplicationTestConfiguration.class)
public class ResumeManagementTests {

    @Test
    void contextLoads() {
    }

    @Autowired
    private Identity identity;

    @Autowired
    private TestRestTemplate template;

    @Test
    public void testUnauthCreateResume() {
        Resume resume = TestResumes.resumes()[0];

        ResponseEntity<Resume> response = template.postForEntity("/resume", resume,
                Resume.class);

        assertThat(response.getStatusCode().is4xxClientError()).isTrue();
    }

    @SuppressWarnings("null")
    @Test
    public void testAuthCreateResume() {
        assertThat(identity.idToken()).isNotNull();

        // Loop through all the resumes and create them
        for (Resume resume : TestResumes.resumes()) {

            // Send a POST request to create a resume
            ResponseEntity<Resume> response = template.exchange(
                    RequestEntity
                            .post("/resume")
                            .header("Authorization", "Bearer " + identity.idToken())
                            .body(resume),
                    Resume.class);

            // Check that the response is successful
            assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();

            // Check that the response body is not null
            Resume created = response.getBody();
            // Check that the created resume matches the input
            assertThat(created).isNotNull();
            assertThat(created.getId()).isNotNull();
            assertThat(created.getUserId()).isEqualTo(identity.idToken());
            assertThat(created.getDocumentId()).isNotNull();
            assertThat(created.getData()).isEqualTo(resume.getData());
            assertThat(created.getVersion()).isEqualTo(1);
            assertThat(created.getCreatedAt()).isNotNull();
            assertThat(created.getJob()).isEqualTo(resume.getJob());
        }
    }

    @Test
    public void testUnauthGetAllResumes() {
        ResponseEntity<Resume[]> response = template.getForEntity("/resume", Resume[].class);
        assertThat(response.getStatusCode().is4xxClientError()).isTrue();
    }

    private ResponseEntity<Resume[]> getResumes() {
        return template.exchange(
                RequestEntity
                        .get("/resume")
                        .header("Authorization", "Bearer " + identity.idToken())
                        .build(),
                Resume[].class);

    }

    @Test
    @SuppressWarnings("null")
    public void testAuthGetAllResumes() {
        assertThat(identity.idToken()).isNotNull();

        ResponseEntity<Resume[]> response = getResumes();
        Resume[] resumes = response.getBody();

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(resumes).isNotNull();
        assertThat(resumes.length).isEqualTo(TestResumes.resumes().length);
    }

    @SuppressWarnings("null")
    @Test
    public void testUnauthDeleteResume() {
        assertThat(identity.idToken()).isNotNull();

        ResponseEntity<Resume[]> response = getResumes();
        Resume[] resumes = response.getBody();

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(resumes).isNotNull();
        assertThat(resumes.length).isEqualTo(TestResumes.resumes().length);

        ResponseEntity<Void> deleteResponse = template.exchange(
                RequestEntity
                        .delete("/resume/" + resumes[2].getDocumentId())
                        .header("Authorization", "Bearer " + identity.idToken())
                        .build(),
                Void.class);

        assertThat(deleteResponse.getStatusCode().is4xxClientError()).isTrue();
    }

    @SuppressWarnings("null")
    @Test
    public void testAuthDeleteResume() {
        assertThat(identity.idToken()).isNotNull();

        ResponseEntity<Resume[]> response = getResumes();
        Resume[] resumes = response.getBody();

        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(resumes).isNotNull();
        assertThat(resumes.length).isEqualTo(TestResumes.resumes().length);

        ResponseEntity<Void> deleteResponse = template.exchange(
                RequestEntity
                        .delete("/resume/" + resumes[2].getDocumentId())
                        .header("Authorization", "Bearer " + identity.idToken())
                        .build(),
                Void.class);

        assertThat(deleteResponse.getStatusCode().is2xxSuccessful()).isTrue();

        ResponseEntity<Resume[]> response0 = getResumes();
        Resume[] resumes0 = response.getBody();

        assertThat(response0.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(resumes0).isNotNull();
        assertThat(resumes0.length).isEqualTo(resumes.length - 1);
        assertThat(List.of(resumes0).contains(resumes[2])).isFalse();

    }
}
