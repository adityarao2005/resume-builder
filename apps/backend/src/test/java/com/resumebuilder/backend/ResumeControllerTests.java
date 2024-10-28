package com.resumebuilder.backend;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.ArrayList;
import java.time.LocalDate;
import static java.time.Month.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import com.resumebuilder.backend.BackendApplicationTestConfiguration.Identity;
import com.resumebuilder.backend.controller.ResumeController.Ack;
import com.resumebuilder.backend.models.Builder;
import com.resumebuilder.backend.models.Address;
import com.resumebuilder.backend.models.Award;
import com.resumebuilder.backend.models.Duration;
import com.resumebuilder.backend.models.Job;
import com.resumebuilder.backend.models.Job.JobBuilder;
import com.resumebuilder.backend.models.resume.ContactInfo;
import com.resumebuilder.backend.models.resume.EducationEntry;
import com.resumebuilder.backend.models.resume.Experience;
import com.resumebuilder.backend.models.resume.Project;
import com.resumebuilder.backend.models.resume.Resume;
import com.resumebuilder.backend.models.resume.ResumeData;
import com.resumebuilder.backend.models.resume.Skill;
import com.resumebuilder.backend.models.resume.EducationEntry.EducationEntryBuilder;
import com.resumebuilder.backend.models.resume.Experience.ExperienceBuilder;
import com.resumebuilder.backend.models.resume.Project.ProjectBuilder;
import com.resumebuilder.backend.service.ResumeCompilationService.ResumeCompilationReport;
import com.resumebuilder.backend.service.ResumeCompilationService.ResumeCompilationFormat;
import com.resumebuilder.backend.service.ResumeCompilationService.ResumeCompilationRequest;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Import(value = { BackendApplicationTestConfiguration.class, WebsocketTestConfiguration.class })
public class ResumeControllerTests {

    @Autowired
    private Identity identity;

    @Autowired
    private WebSocketStompClient stompClient;

    @Autowired
    private TestRestTemplate template;

    @LocalServerPort
    private int port;

    public String getWebSocketURL() {
        return "ws://localhost:" + port + "/ws?access_token=" + identity.idToken();
    }

    @Test
    void contextLoads() {
        assertThat(getWebSocketURL()).isNotNull();
    }

    @SuppressWarnings("null")
    public Resume getWorkingResume() {
        ResponseEntity<Resume[]> resumes = template.exchange(
                RequestEntity
                        .get("/resume")
                        .header("Authorization", "Bearer " + identity.idToken())
                        .build(),
                Resume[].class);

        assertThat(resumes.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(resumes.getBody()).isNotNull();
        assertThat(resumes.getBody().length).isGreaterThan(0);

        return resumes.getBody()[0];
    }

    public String getWorkingResumeId() {
        return getWorkingResume().getDocumentId();
    }

    @Test
    public void testWebSocketSession() throws Exception {

        // Create the session
        StompWebClientSession session = new StompWebClientSession(stompClient, getWebSocketURL());
        // Subscribe to the necessary queues
        session.subscribe("/user/queue/resume", Resume.class);
        session.subscribe("/user/queue/resume/ack", Ack.class);
        session.subscribe("/user/queue/resume/report", ResumeCompilationReport.class);

        // Get the working resume
        Resume resume = session.sendAndAwait("/app/resume/set/" + getWorkingResumeId(), null, Resume.class);
        assertThat(resume).isNotNull();

        ResumeData data = resume.getData();
        // Sets the name
        testName(session, data);

        // Set the contact info
        testContactInfo(session, data);

        // Set highlights
        testHighlights(session, data);

        // Set education
        testEducation(session, data);

        // Set experience
        testExperience(session, data);

        // Set projects
        testProjects(session, data);

        // Set extra-curricular activities
        testExtraCurricularActivities(session, data);

        // Set skills
        testSkills(session, data);

        // Set awards
        testAwards(session, data);

        // Set hobbies
        testHobbies(session, data);

        // Set job
        testJob(session, resume);

        data.setName("John Doey Doe");
        data.getContactInfo().setAddress(null);
        data.getContactInfo().setEmail("joe.dohn@mail.com");
        var hobbies = new ArrayList<>(data.getHobbies());
        hobbies.add("Hiking");
        data.setHobbies(hobbies);

        // Compile the resume
        testCompile(session, resume);

        session.disconnect();

        Resume oo = getWorkingResume();
        assertThat(oo).isNotNull();
        assertThat(oo.getData()).isEqualTo(data);
        assertThat(oo.getJob()).isEqualTo(resume.getJob());
    }

    @Test
    public void testWebSocketSessionVersioning() throws Exception {
        // Create the session
        StompWebClientSession session = new StompWebClientSession(stompClient, getWebSocketURL());
        // Subscribe to the necessary queues
        session.subscribe("/user/queue/resume", Resume.class);
        session.subscribe("/user/queue/resume/ack", Ack.class);
        session.subscribe("/user/queue/resume/report", ResumeCompilationReport.class);

        // Get the working resume
        Resume resume = session.sendAndAwait("/app/resume/set/" + getWorkingResumeId(), null, Resume.class);
        assertThat(resume).isNotNull();

        ResumeData data = resume.getData();
        // Sets the name
        testName2(session, data);

        session.disconnect();

        Resume oo = getWorkingResume();
        assertThat(oo).isNotNull();
        assertThat(oo.getData()).isEqualTo(data);
        assertThat(oo.getJob()).isEqualTo(resume.getJob());
        assertThat(oo.getVersion()).isEqualTo(2);
    }

    @Test
    public void testWebSocketSessionVersioning2() throws Exception {
        // Create the session
        StompWebClientSession session = new StompWebClientSession(stompClient, getWebSocketURL());
        // Subscribe to the necessary queues
        session.subscribe("/user/queue/resume", Resume.class);
        session.subscribe("/user/queue/resume/ack", Ack.class);
        session.subscribe("/user/queue/resume/report", ResumeCompilationReport.class);

        // Get the working resume
        Resume resume = session.sendAndAwait("/app/resume/set/" + getWorkingResumeId(), null, Resume.class);
        assertThat(resume).isNotNull();
        assertThat(resume.getData().getName()).isEqualTo("John Doe 3");
        assertThat(resume.getVersion()).isEqualTo(3);

        ResumeData data = resume.getData();
        // Sets the name
        testName3(session, data, "Johnathon Doe");

        session.disconnect();

        Resume oo = getWorkingResume();
        assertThat(oo).isNotNull();
        assertThat(oo.getData()).isEqualTo(data);
        assertThat(oo.getJob()).isEqualTo(resume.getJob());
        assertThat(oo.getVersion()).isEqualTo(4);
    }

    @Test
    @SuppressWarnings("null")
    public void testHistory() {
        ResponseEntity<Resume[]> response = template.exchange(
                RequestEntity
                        .get("/resume/history/" + getWorkingResumeId())
                        .header("Authorization", "Bearer " + identity.idToken())
                        .build(),
                Resume[].class);

        Resume[] resumes = response.getBody();
        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(resumes).isNotNull();
        assertThat(resumes.length).isEqualTo(4);
    }

    private void testName3(StompWebClientSession session, ResumeData data, String name) {
        data.setName(name);
        tryAck(session, data.getName(), "/app/resume/name", "update/setName");
    }

    private void testName2(StompWebClientSession session, ResumeData data) {
        data.setName("John Doe 2");
        tryAck(session, data.getName(), "/app/resume/name", "update/setName");
    }

    private void testName(StompWebClientSession session, ResumeData data) {
        data.setName("John Doe");
        tryAck(session, data.getName(), "/app/resume/name", "update/setName");
    }

    private void testContactInfo(StompWebClientSession session, ResumeData data) {
        ContactInfo contactInfo = data.getContactInfo();
        contactInfo.setEmail("john@doe.com");
        contactInfo.setPhone("123-456-7890");
        contactInfo.setAddress(new Address("Springfield", "IL"));
        // Check if everything worked out
        tryAck(session, contactInfo, "/app/resume/contact_info", "update/setContactInfo");
    }

    private void testHighlights(StompWebClientSession session, ResumeData data) {
        // Check if everything worked out
        tryAck(session, List.of("I am a software engineer",
                "I have experience in Java"), "/app/resume/highlights", "update/setHighlights");
    }

    private void testEducation(StompWebClientSession session, ResumeData data) {
        List<EducationEntry> education = data.getEducation();
        EducationEntry entry = Builder.create(EducationEntryBuilder.class)
                .withInstitution("University of Illinois")
                .withQualification("B.S. in Computer Science")
                .withLocation(Address.from("Urbana", "IL"))
                .withCourses(List.of("CS 125", "CS 126"))
                .withDuration(
                        Duration.from(LocalDate.of(2020, SEPTEMBER, 6), LocalDate.of(2024, APRIL, 30)))
                .withDescription(
                        List.of("Graduated with honors"))
                .build();
        education.add(entry);
        // Check if everything worked out
        tryAck(session, education, "/app/resume/education", "update/setEducation");
    }

    private void testExperience(StompWebClientSession session, ResumeData data) {
        List<Experience> experiences = data.getExperiences();
        Experience experience = Builder.create(ExperienceBuilder.class)
                .withCompany("Google")
                .withTitle("Software Engineer")
                .withLocation(Address.from("", "CA"))
                .withDuration(Duration.from(LocalDate.of(2022, APRIL, 5), LocalDate.of(2023, APRIL, 5)))
                .withDescription(List.of("Worked on the search engine"))
                .build();
        experiences.add(experience);
        // Check if everything worked out
        tryAck(session, experiences, "/app/resume/experience", "update/setExperience");
    }

    private void testProjects(StompWebClientSession session, ResumeData data) {
        List<Project> projects = data.getProjects();
        Project project = Builder.create(ProjectBuilder.class)
                .withTitle("Resume Builder")
                .withDescription(List.of("A resume builder"))
                .withDuration(Duration.from(LocalDate.of(2021, JANUARY, 1), LocalDate.now()))
                .build();
        projects.add(project);
        // Check if everything worked out
        tryAck(session, projects, "/app/resume/projects", "update/setProjects");
    }

    private void testExtraCurricularActivities(StompWebClientSession session, ResumeData data) {
        List<Experience> experiences = data.getExtraCurriculars();
        Experience experience = Builder.create(ExperienceBuilder.class)
                .withCompany("Google")
                .withTitle("Software Engineer")
                .withLocation(Address.from("", "CA"))
                .withDuration(Duration.from(LocalDate.of(2022, APRIL, 5), LocalDate.of(2023, APRIL, 5)))
                .withDescription(List.of("Worked on the search engine"))
                .build();
        experiences.add(experience);
        // Check if everything worked out
        tryAck(session, experiences, "/app/resume/extra_curriculars", "update/setExtraCurriculars");
    }

    private void testSkills(StompWebClientSession session, ResumeData data) {
        List<Skill> skills = List.of(Skill.from("Java", "Programming Language", null),
                Skill.from("Python", "Programming Language", null), Skill.from("Excel", "Office", null));
        data.setSkills(skills);
        // Check if everything worked out
        tryAck(session, skills, "/app/resume/skills", "update/setSkills");
    }

    private void testAwards(StompWebClientSession session, ResumeData data) {
        List<Award> awards = List.of(Award.from("Best Employee", LocalDate.of(2023, 1, 1),
                "Google"),
                Award.from("Best Employee", LocalDate.of(2023, 1, 1), "Google"));
        data.setAwards(awards);
        // Check if everything worked out
        tryAck(session, awards, "/app/resume/awards", "update/setAwards");
    }

    private void testHobbies(StompWebClientSession session, ResumeData data) {
        List<String> hobbies = List.of("Reading", "Swimming");
        data.setHobbies(hobbies);
        // Check if everything worked out
        tryAck(session, hobbies, "/app/resume/hobbies", "update/setHobbies");
    }

    private void testJob(StompWebClientSession session, Resume data) {
        Job job = Builder.create(JobBuilder.class)
                .withTitle("Software Engineer")
                .withCompany("Google")
                .withDuration(
                        Duration.from(LocalDate.of(2022, APRIL, 5), LocalDate.of(2023, APRIL, 5)))
                .withDescription("Worked on the search engine")
                .build();
        data.setJob(job);
        // Check if everything worked out
        tryAck(session, data.getJob(), "/app/resume/job", "update/setJob");
    }

    private void tryAck(StompWebClientSession session, Object sent, String topic, String action) {
        Ack ack = session.sendAndAwait(topic, sent, Ack.class);
        // Check if everything worked out
        assertThat(ack).isNotNull();
        assertThat(ack.success()).isTrue();
        assertThat(ack.action()).isEqualTo(action);
        assertThat(ack.message()).isEqualTo("Operation successful");

    }

    private void testCompile(StompWebClientSession session, Resume data) {
        ResumeCompilationRequest request = new ResumeCompilationRequest(data, ResumeCompilationFormat.PDF);
        ResumeCompilationReport report = session.sendAndAwait("/app/resume/compile", request,
                ResumeCompilationReport.class);

        // Check if everything worked out
        assertThat(report).isNotNull();
        assertThat(report.error()).isFalse();
        assertThat(report.data()).isEqualTo(data);
    }
}
