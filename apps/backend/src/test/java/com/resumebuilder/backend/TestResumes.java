package com.resumebuilder.backend;

import java.util.Map;

import java.util.List;
import java.time.LocalDate;
import java.time.Month;

import com.resumebuilder.backend.models.resume.ContactInfo;
import com.resumebuilder.backend.models.resume.EducationEntry;
import com.resumebuilder.backend.models.resume.Experience;
import com.resumebuilder.backend.models.resume.Project;
import com.resumebuilder.backend.models.resume.Resume;
import com.resumebuilder.backend.models.resume.Skill;
import com.resumebuilder.backend.models.resume.ContactInfo.ContactInfoBuilder;
import com.resumebuilder.backend.models.resume.EducationEntry.EducationEntryBuilder;
import com.resumebuilder.backend.models.resume.Experience.ExperienceBuilder;
import com.resumebuilder.backend.models.resume.Project.ProjectBuilder;
import com.resumebuilder.backend.models.resume.Resume.ResumeBuilder;
import com.resumebuilder.backend.models.resume.ResumeData.ResumeDataBuilder;
import com.resumebuilder.backend.models.Address;
import com.resumebuilder.backend.models.Award;
import com.resumebuilder.backend.models.Builder;
import com.resumebuilder.backend.models.Description;
import com.resumebuilder.backend.models.Duration;
import com.resumebuilder.backend.models.Job;
import com.resumebuilder.backend.models.Job.JobBuilder;

public class TestResumes {

    public static final Job JOB;
    public static final String NAME;
    public static final Resume RESUME_1, RESUME_2, RESUME_3;
    public static final ContactInfo CONTACT_INFO;
    public static final EducationEntry EDUCATION_ENTRY;
    public static final Experience EXPERIENCE, EXTRA_EXPERIENCE;
    public static final Project PROJECT_1, PROJECT_2, PROJECT_3;
    public static final List<Skill> SKILLS;

    static {

        JOB = Builder.create(JobBuilder.class)
                .withCompany("Cool Company")
                .withDescription(Description.from("Cool Job Description"))
                .withDuration(Duration.from(
                        LocalDate.of(2025, Month.MAY, 1),
                        LocalDate.of(2025, Month.MAY, 2)))
                .withTitle("Cool Job")
                .build();

        NAME = "Aditya Rao";

        CONTACT_INFO = Builder.create(ContactInfoBuilder.class)
                .withEmail("example@example.ca")
                .withPhone("123-456-7890")
                .withMediaProfiles(Map.of(
                        "LinkedIn", "linkedin.com/in/example",
                        "Github", "github.com/example",
                        "Website", "example.ca"))
                .build();

        EDUCATION_ENTRY = Builder.create(EducationEntryBuilder.class)
                .withQualification("Bachelors of Engineering")
                .withInstitution("University of Waterloo")
                .withLocation(Address.from("Waterloo", "ca"))
                .withDuration(Duration.from(
                        LocalDate.of(2020, Month.SEPTEMBER, 1),
                        LocalDate.of(2025, Month.AUGUST, 1)))
                .withCourses(List.of("Software Engineering", "Computer Science", "Electrical Engineering"))
                .withDescription(Description.from("First Year GPA: 4.0/4.0", "Majoring in Software Engineering",
                        "Expected Graduation: April 2023"))
                .build();

        EXPERIENCE = Builder.create(ExperienceBuilder.class)
                .withCompany("Medium AI")
                .withTitle("Full Stack Developer")
                .withDuration(Duration.from(
                        LocalDate.of(2025, Month.MAY, 1),
                        LocalDate.of(2025, Month.MAY, 2)))
                .withLocation(Address.from("Toronto", "ca"))
                .withDescription(
                        Description.from("Developed a full stack application", "Worked with a team of 5 developers"))
                .build();

        PROJECT_1 = Builder.create(ProjectBuilder.class)
                .withTitle("Portfolio Website")
                .withDuration(Duration.from(
                        LocalDate.of(2025, Month.MAY, 1),
                        LocalDate.of(2025, Month.MAY, 2)))
                .withDescription(
                        Description.from("Developed a portfolio website", "Worked with a team of 5 developers"))
                .build();

        PROJECT_2 = Builder.create(ProjectBuilder.class)
                .withTitle("QuakeGuard")
                .withDuration(Duration.from(
                        LocalDate.of(2025, Month.MAY, 1),
                        LocalDate.of(2025, Month.MAY, 2)))
                .withDescription(
                        Description.from("Developed a mobile application", "Worked with a team of 5 developers"))
                .build();

        PROJECT_3 = Builder.create(ProjectBuilder.class)
                .withTitle("Weather App")
                .withDuration(Duration.from(
                        LocalDate.of(2025, Month.MAY, 1),
                        LocalDate.of(2025, Month.MAY, 2)))
                .withDescription(
                        Description.from("Developed a weather application", "Worked with a team of 5 developers"))
                .build();

        EXTRA_EXPERIENCE = Builder.create(ExperienceBuilder.class)
                .withCompany("FIRST Robotics Team 9113")
                .withTitle("Software Team Lead")
                .withDuration(Duration.from(
                        LocalDate.of(2023, Month.MAY, 1),
                        LocalDate.of(2023, Month.MAY, 2)))
                .withLocation(Address.from("Markham", "ca"))
                .withDescription(
                        Description.from("Developed a robot", "Worked with a team of 5 developers"))
                .build();

        var programmingLanguages = List.of("Java", "Python", "C++", "JavaScript").stream()
                .map(v -> Skill.from(v, "Programming Languages", null)).toList();
        var tools = List.of("MongoDB", "SQL", "Git", "Docker",
                "Kubernetes").stream().map(v -> Skill.from(v, "Tools", null)).toList();
        var frameworks = List.of("React", "Node.js", "Express.js").stream()
                .map(v -> Skill.from(v, "Frameworks", null)).toList();
        var certifications = List.of("AWS", "GCP", "Azure").stream()
                .map(v -> Skill.from(v, "Certifications", null)).toList();

        SKILLS = List.of(programmingLanguages, tools, frameworks, certifications).stream()
                .flatMap(List::stream).toList();

        RESUME_1 = Builder.create(ResumeBuilder.class)
                .withJob(JOB)
                .withData(Builder.create(ResumeDataBuilder.class)
                        .withName(NAME)
                        .withHighlights(Description.from("Software Engineer", "Full Stack Developer"))
                        .withContactInfo(CONTACT_INFO)
                        .withEducation(List.of(EDUCATION_ENTRY))
                        .withExperience(List.of(EXPERIENCE))
                        .withProjects(List.of(PROJECT_1, PROJECT_2, PROJECT_3))
                        .withExtraCurriculars(List.of(EXTRA_EXPERIENCE))
                        .withSkills(SKILLS)
                        .withAwards(List.of(Award.from("Dean's Honor List", LocalDate.of(2024, 3, 1), null)))
                        .withHobbies(List.of("Soccer", "Reading", "Cooking"))
                        .build())
                .build();

        RESUME_2 = Builder.create(ResumeBuilder.class)
                .withJob(JOB)
                .withData(Builder.create(ResumeDataBuilder.class)
                        .withName(NAME)
                        .withContactInfo(CONTACT_INFO)
                        .withEducation(List.of(EDUCATION_ENTRY))
                        .withExperience(List.of(EXPERIENCE))
                        .withProjects(List.of(PROJECT_1, PROJECT_2, PROJECT_3))
                        .withExtraCurriculars(List.of(EXTRA_EXPERIENCE))
                        .withSkills(SKILLS)
                        .build())
                .build();

        RESUME_3 = Builder.create(ResumeBuilder.class)
                .withJob(JOB)
                .withData(Builder.create(ResumeDataBuilder.class)
                        .withName(NAME)
                        .withContactInfo(CONTACT_INFO)
                        .withEducation(List.of(EDUCATION_ENTRY))
                        .withProjects(List.of(PROJECT_1))
                        .withExtraCurriculars(List.of(EXTRA_EXPERIENCE))
                        .build())
                .build();
    }

    public static Resume[] resumes() {
        return new Resume[] { RESUME_1, RESUME_2, RESUME_3 };
    }
}
