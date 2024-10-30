package com.resumebuilder.backend;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumebuilder.backend.models.Builder;
import com.resumebuilder.backend.models.Duration;
import com.resumebuilder.backend.models.Job.JobBuilder;
import com.resumebuilder.backend.models.resume.MediaProfile;
import com.resumebuilder.backend.models.resume.Resume;
import com.resumebuilder.backend.models.resume.ContactInfo.ContactInfoBuilder;
import com.resumebuilder.backend.models.resume.ResumeData.ResumeDataBuilder;

@SpringBootTest()
public class JacksonTest {
    @Autowired
    private ObjectMapper objectMapper;

    private final String fileContent;
    private final Resume resume;

    public JacksonTest() {
        resume = new Resume();
        resume.setDocumentId("5522349e-3da8-4c18-9ea6-ac8bd98d4478");
        resume.setJob(Builder.create(JobBuilder.class)
                .withCompany("Google")
                .withTitle("Software Engineer")
                .withDuration(Duration.from(LocalDate.of(2024, 05, 06), LocalDate.of(2024, 8, 23)))
                .withDescription("Working in google")
                .build());
        resume.setCreatedAt(LocalDate.of(2024, 10, 22));
        resume.setData(Builder.create(ResumeDataBuilder.class)
                .withName("")
                .withContactInfo(Builder.create(ContactInfoBuilder.class)
                        .withAddress(null)
                        .withMediaProfiles(List.of())
                        .build())
                .withEducation(List.of())
                .withHighlights(List.of())
                .withExperience(List.of())
                .withProjects(List.of())
                .withExtraCurriculars(List.of())
                .withSkills(List.of())
                .withAwards(List.of())
                .withHobbies(List.of())
                .build());

        try {
            // Assuming the file is in the current directory
            fileContent = Files
                    .readString(Path.of("src/test/java/com/resumebuilder/backend/send.json").toAbsolutePath());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    public void testResumeDeserialization() {
        assertThat(fileContent).isNotNull();
        assertThat(fileContent).isNotEmpty();
        assertThat(fileContent).isNotBlank();

        Resume deserializedResume = null;
        try {
            deserializedResume = objectMapper.readValue(fileContent, Resume.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        assertThat(deserializedResume).isNotNull();
        assertThat(deserializedResume).isEqualTo(resume);

    }
}
