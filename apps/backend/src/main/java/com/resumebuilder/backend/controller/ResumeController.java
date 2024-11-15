package com.resumebuilder.backend.controller;

import java.util.List;
import java.util.function.Consumer;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.RestController;

import com.resumebuilder.backend.models.Award;
import com.resumebuilder.backend.models.Job;
import com.resumebuilder.backend.models.resume.ContactInfo;
import com.resumebuilder.backend.models.resume.EducationEntry;
import com.resumebuilder.backend.models.resume.Experience;
import com.resumebuilder.backend.models.resume.Project;
import com.resumebuilder.backend.models.resume.Resume;
import com.resumebuilder.backend.models.resume.Skill;
import com.resumebuilder.backend.service.MLService;
import com.resumebuilder.backend.service.ResumeCompilationService;
import com.resumebuilder.backend.service.WebSocketIdentityService;
import com.resumebuilder.backend.service.WebSocketResumeService;
import com.resumebuilder.backend.service.MLService.MLResumeScoreResponse;
import com.resumebuilder.backend.service.ResumeCompilationService.ResumeCompilationReport;
import com.resumebuilder.backend.service.ResumeCompilationService.ResumeCompilationRequest;

// ResumeController handles WebSocket messages related to resumes
@RestController
public class ResumeController {

    // Autowired services

    // 1. WebSocketResumeService to manage resume state
    @Autowired
    private WebSocketResumeService resumeService;

    // 2. ResumeCompilationService to compile resumes
    @Autowired
    private ResumeCompilationService compilationService;

    // 3. WebSocketIdentityService to manage user identity
    @Autowired
    private WebSocketIdentityService identityService;

    @Autowired
    private MLService mlService;

    // 4. Logger for logging actions
    private final Logger logger = Logger.getLogger(ResumeController.class.getName());

    // 5. Acknowledgment record to send back to the client
    public record Ack(String action, boolean success, String message) {
    };

    // 6. Greeting record to send back to the client
    public record Greeting(String content) {
    }

    // 7. Ping method to check connection
    @MessageMapping("/ping")
    @SendToUser("/queue/ping")
    public Greeting ping(@Payload Greeting message) {
        // Send a ping message to the user
        System.out.println("Received Message: " + message.content());
        return new Greeting("pong");
    }

    // 8. Method to get the current user's identity
    @MessageMapping("/me")
    @SendToUser("/queue/me")
    public Greeting handleMe() {
        // Return the principal
        return new Greeting(identityService.getIdentity().getName());
    }

    // 9. Method to set the current resume based on document ID
    @MessageMapping("/resume/set/{id}")
    @SendToUser("/queue/resume")
    public Resume setResume(@DestinationVariable("id") String documentId) {
        // Fetch the resume by ID
        logger.info("Setting resume with ID: " + documentId);
        return resumeService.getCurrentResume(documentId);
    }

    /**
     * Apply an operation on the resume
     * 
     * @param operation
     * @return
     */
    private Ack applyOperationOnResume(String operationName, Consumer<Resume> operation) {
        if (!resumeService.isResumeAvailable()) {
            return new Ack("update/" + operationName, false, "Resume not available");
        }

        Resume resume = resumeService.aquireResume();
        operation.accept(resume);
        resumeService.saveState();

        return new Ack("update/" + operationName, true, "Operation successful");
    }

    // Set the name of the resume
    @MessageMapping("/resume/name")
    @SendToUser("/queue/resume/ack")
    public Ack handleResumeName(@Payload String name) {
        // Set the name of the resume
        return applyOperationOnResume("setName", resume -> resume.getData().setName(name));
    }

    // Set the contact information
    @MessageMapping("/resume/contact_info")
    @SendToUser("/queue/resume/ack")
    public Ack handleContactInfo(@Payload ContactInfo contactInfo) {
        // Set the contact info of the resume
        return applyOperationOnResume("setContactInfo", resume -> resume.getData().setContactInfo(contactInfo));
    }

    // Set the summary/highlights
    @MessageMapping("/resume/highlights")
    @SendToUser("/queue/resume/ack")
    public Ack setHighlights(@Payload List<String> highlights) {
        // Handle the highlights information here
        return applyOperationOnResume("setHighlights", resume -> resume.getData().setHighlights(highlights));
    }

    // Set the education information
    @MessageMapping("/resume/education")
    @SendToUser("/queue/resume/ack")
    public Ack handleEducation(@Payload List<EducationEntry> education) {
        // Handle the education information here
        return applyOperationOnResume("setEducation", resume -> resume.getData().setEducation(education));
    }

    // Set the experience information
    @MessageMapping("/resume/experience")
    @SendToUser("/queue/resume/ack")
    public Ack handleExperience(@Payload List<Experience> experience) {
        // Handle the experience information here
        return applyOperationOnResume("setExperience", resume -> resume.getData().setExperiences(experience));
    }

    // Set the projects information
    @MessageMapping("/resume/projects")
    @SendToUser("/queue/resume/ack")
    public Ack handleProjects(@Payload List<Project> projects) {
        // Handle the projects information here
        return applyOperationOnResume("setProjects", resume -> resume.getData().setProjects(projects));
    }

    // Set the extra-curricular activities
    @MessageMapping("/resume/extra_curriculars")
    @SendToUser("/queue/resume/ack")
    public Ack handleExtraCurriculars(@Payload List<Experience> extraCurriculars) {
        // Handle the summary information here
        return applyOperationOnResume("setExtraCurriculars",
                resume -> resume.getData().setExtraCurriculars(extraCurriculars));
    }

    // Set the skills information
    @MessageMapping("/resume/skills")
    @SendToUser("/queue/resume/ack")
    public Ack handleSkills(@Payload List<Skill> skills) {
        // Handle the skills information here
        return applyOperationOnResume("setSkills", resume -> resume.getData().setSkills(skills));
    }

    // Set the awards information
    @MessageMapping("/resume/awards")
    @SendToUser("/queue/resume/ack")
    public Ack handleAwards(@Payload List<Award> awards) {
        // Handle the awards information here
        return applyOperationOnResume("setAwards", resume -> resume.getData().setAwards(awards));
    }

    // Set the hobbies information
    @MessageMapping("/resume/hobbies")
    @SendToUser("/queue/resume/ack")
    public Ack handleHobbies(@Payload List<String> hobbies) {
        // Handle the hobbies information here
        return applyOperationOnResume("setHobbies", resume -> resume.getData().setHobbies(hobbies));
    }

    // Set the job information
    @MessageMapping("/resume/job")
    @SendToUser("/queue/resume/ack")
    public Ack handleJob(@Payload Job job) {
        // Handle the job information here
        return applyOperationOnResume("setJob", resume -> resume.setJob(job));
    }

    // Compile the resume
    // TODO: still have not decided on whether to return a new resume back or return
    // a pdf back
    @MessageMapping("/resume/compile")
    @SendToUser("/queue/resume/report")
    public ResumeCompilationReport handleCompile(@Payload ResumeCompilationRequest request) {
        // Handle the compile action here
        if (!resumeService.isResumeAvailable()) {
            return new ResumeCompilationReport(request.resume().getDocumentId(), true, "ERROR: Resume not available");
        }

        Resume resume = resumeService.aquireResume();
        // TODO: set style and format
        resume.setData(request.resume().getData());
        resume.setJob(request.resume().getJob());
        resumeService.saveState();

        try {
            return compilationService.compileResume(request, resume);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResumeCompilationReport(request.resume().getDocumentId(), true, "ERROR: " + e.getMessage());
        }

    }

    @MessageMapping("/resume/score")
    @SendToUser("/queue/resume/score")
    public MLResumeScoreResponse getScoreResponse() {
        Resume resume = resumeService.aquireResume();
        return mlService.getResumeScore(resume);
    }
}
