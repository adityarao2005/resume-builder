package com.resumebuilder.backend.controller;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties.Jwt;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.RestController;

import com.resumebuilder.backend.models.Award;
import com.resumebuilder.backend.models.Description;
import com.resumebuilder.backend.models.resume.ContactInfo;
import com.resumebuilder.backend.models.resume.EducationEntry;
import com.resumebuilder.backend.models.resume.Experience;
import com.resumebuilder.backend.models.resume.Project;
import com.resumebuilder.backend.models.resume.Resume;
import com.resumebuilder.backend.models.resume.Skill;
import com.resumebuilder.backend.service.ResumeCompilationService;
import com.resumebuilder.backend.service.WebSocketIdentityService;
import com.resumebuilder.backend.service.WebSocketResumeService;
import com.resumebuilder.backend.service.ResumeCompilationService.ResumeCompilationReport;
import com.resumebuilder.backend.service.ResumeCompilationService.ResumeCompilationRequest;

@RestController
public class ResumeController {

    @Autowired
    private WebSocketResumeService resumeService;

    @Autowired
    private ResumeCompilationService compilationService;

    @Autowired
    private WebSocketIdentityService identityService;

    public record Ack(String action, boolean success, String message) {
    };

    // @Autowired
    // private WebSocketIdentityService identityService;
    // TODO: Try with ws://...?access_token=...
    /*
     * @MessageMapping("/auth")
     * 
     * @SendToUser("/queue/auth")
     * public Ack handleAuth(String token) {
     * // Handle authentication here
     * // TODO: Implement authentication logic
     * try {
     * Jwt jwt = jwtDecoder.decode(token);
     * // Use the decoded JWT to set the identity in the WebSocketIdentityService
     * JwtAuthenticationToken authentication = new JwtAuthenticationToken(jwt);
     * UserDetails details = User.builder()
     * .username(jwt.getClaimAsString("email"))
     * .authorities(authentication.getAuthorities())
     * .build();
     * identityService.setIdentity(details);
     * } catch (Exception e) {
     * // Handle exception
     * // TODO: handle exception
     * }
     * 
     * return new Ack();
     * }
     */

    public record Greeting(String content) {
    }

    @MessageMapping("/ping")
    @SendToUser("/queue/ping")
    public Greeting ping(@Payload Greeting message) {
        // Send a ping message to the user
        System.out.println("Received Message: " + message.content());
        return new Greeting("pong");
    }

    @MessageMapping("/me")
    @SendToUser("/queue/me")
    public Greeting handleMe() {
        // Return the principal
        return new Greeting(identityService.getIdentity().getName());
    }

    @MessageMapping("/resume/{id}")
    @SendToUser("/queue/resume")
    public Optional<Resume> setResume(@DestinationVariable("id") String documentId) {
        // Fetch the resume by ID
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

        return new Ack("update/" + operationName, true, "Operation successful");
    }

    // Set the name of the resume
    @MessageMapping("/resume/name")
    @SendToUser("/queue/resume")
    public Ack handleResumeName(String name) {
        // Set the name of the resume
        return applyOperationOnResume("setName", resume -> resume.getData().setName(name));
    }

    // Set the contact information
    @MessageMapping("/resume/contact_info")
    @SendToUser("/queue/resume")
    public Ack handleContactInfo(ContactInfo contactInfo) {
        // Set the contact info of the resume
        return applyOperationOnResume("setContactInfo", resume -> resume.getData().setContactInfo(contactInfo));
    }

    // Set the summary/highlights
    @MessageMapping("/resume/highlights")
    @SendToUser("/queue/resume")
    public Ack setHighlights(Description highlights) {
        // Handle the highlights information here
        return applyOperationOnResume("setHighlights", resume -> resume.getData().setHighlights(highlights));
    }

    // Set the education information
    @MessageMapping("/resume/education")
    @SendToUser("/queue/resume")
    public Ack handleEducation(List<EducationEntry> education) {
        // Handle the education information here
        return applyOperationOnResume("setEducation", resume -> resume.getData().setEducation(education));
    }

    // Set the experience information
    @MessageMapping("/resume/experience")
    @SendToUser("/queue/resume")
    public Ack handleExperience(List<Experience> experience) {
        // Handle the experience information here
        return applyOperationOnResume("setExperience", resume -> resume.getData().setExperience(experience));
    }

    // Set the projects information
    @MessageMapping("/resume/projects")
    @SendToUser("/queue/resume")
    public Ack handleProjects(List<Project> projects) {
        // Handle the projects information here
        return applyOperationOnResume("setProjects", resume -> resume.getData().setProjects(projects));
    }

    // Set the extra-curricular activities
    @MessageMapping("/resume/extra_curriculars")
    @SendToUser("/queue/resume")
    public Ack handleExtraCurriculars(List<Experience> extraCurriculars) {
        // Handle the summary information here
        return applyOperationOnResume("setExtraCurriculars",
                resume -> resume.getData().setExtraCurriculars(extraCurriculars));
    }

    // Set the skills information
    @MessageMapping("/resume/skills")
    @SendToUser("/queue/resume")
    public Ack handleSkills(List<Skill> skills) {
        // Handle the skills information here
        return applyOperationOnResume("setSkills", resume -> resume.getData().setSkills(skills));
    }

    // Set the awards information
    @MessageMapping("/resume/awards")
    @SendToUser("/queue/resume")
    public Ack handleAwards(List<Award> awards) {
        // Handle the awards information here
        return applyOperationOnResume("setAwards", resume -> resume.getData().setAwards(awards));
    }

    // Set the hobbies information
    @MessageMapping("/resume/hobbies")
    @SendToUser("/queue/resume")
    public Ack handleHobbies(List<String> hobbies) {
        // Handle the hobbies information here
        return applyOperationOnResume("setHobbies", resume -> resume.getData().setHobbies(hobbies));
    }

    // Compile the resume
    // TODO: still have not decided on whether to return a new resume back or return
    // a pdf back
    @MessageMapping("/resume/compile")
    @SendToUser("/queue/resume")
    public ResumeCompilationReport handleCompile(ResumeCompilationRequest request) {
        // Handle the compile action here
        if (!resumeService.isResumeAvailable()) {
            return new ResumeCompilationReport(request.resume().getDocumentId(), true, "ERROR: Resume not available");
        }

        Resume resume = resumeService.aquireResume();
        // TODO: set style and format
        resume.setData(request.resume().getData());
        resume.setJob(request.resume().getJob());

        try {
            return compilationService.compileResume(request);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResumeCompilationReport(request.resume().getDocumentId(), true, "ERROR: " + e.getMessage());
        }

    }
}
