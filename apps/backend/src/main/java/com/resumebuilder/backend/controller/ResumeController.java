package com.resumebuilder.backend.controller;

import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import com.resumebuilder.backend.models.Award;
import com.resumebuilder.backend.models.Description;
import com.resumebuilder.backend.models.resume.ContactInfo;
import com.resumebuilder.backend.models.resume.EducationEntry;
import com.resumebuilder.backend.models.resume.Experience;
import com.resumebuilder.backend.models.resume.Project;
import com.resumebuilder.backend.models.resume.Resume;
import com.resumebuilder.backend.models.resume.Skill;
import com.resumebuilder.backend.service.WebSocketResumeService;

@Controller
public class ResumeController {

    @Autowired
    private WebSocketResumeService resumeService;

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
    public Ack handleCompile(Resume resume) {
        // Handle the compile action here
        // TODO: Handle compilation of resume here
        return applyOperationOnResume("compile", applier -> {
            // Set the useful values from the resume
            applier.setData(resume.getData());
            // TODO: soon apply styles and formatting
            applier.setJob(resume.getJob());
        });
    }
}
