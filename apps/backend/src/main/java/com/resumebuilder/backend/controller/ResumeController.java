package com.resumebuilder.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.security.oauth2.jwt.JwtDecoder;
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

    //@Autowired
    //private WebSocketIdentityService identityService;

    @Autowired
    private JwtDecoder jwtDecoder;


    @Autowired
    private WebSocketResumeService resumeService;

    class Ack {
    }

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
    public Optional<Resume> setResume(String id) {
        // Fetch the resume by ID
        return resumeService.getAndMakeCurrentResume(id);
    }

    // Set the name of the resume
    @MessageMapping("/resume/name")
    @SendToUser("/queue/resume")
    public Ack handleResumeName(String name) {
        // Handle the resume name here
        //resumeService.getCurrentResume().setName(name);
        //String userID = userDetails.getUsername();
        // Logic to update the resume name in the database
        //resumeService.(id, userID);

        return new Ack();
    }

    // Set the contact information
    @MessageMapping("/resume/contact_info")
    @SendToUser("/queue/resume")
    public Ack handleContactInfo(ContactInfo contactInfo) {
        // Handle the contact information here
        return new Ack();
    }

    // Set the summary/highlights
    @MessageMapping("/resume/highlights")
    @SendToUser("/queue/resume")
    public Ack setHighlights(Description highlights) {
        // Handle the summary information here
        return new Ack();
    }

    // Set the education information
    @MessageMapping("/resume/education")
    @SendToUser("/queue/resume")
    public Ack handleEducation(List<EducationEntry> education) {
        // Handle the education information here
        return new Ack();
    }

    // Set the experience information
    @MessageMapping("/resume/experience")
    @SendToUser("/queue/resume")
    public Ack handleExperience(List<Experience> experience) {
        // Handle the experience information here
        return new Ack();
    }

    // Set the projects information
    @MessageMapping("/resume/projects")
    @SendToUser("/queue/resume")
    public Ack handleProjects(List<Project> projects) {
        // Handle the projects information here
        return new Ack();
    }

    // Set the extra-curricular activities
    @MessageMapping("/resume/extra_curriculars")
    @SendToUser("/queue/resume")
    public Ack handleExtraCurriculars(List<Experience> extraCurriculars) {
        // Handle the summary information here
        return new Ack();
    }

    // Set the skills information
    @MessageMapping("/resume/skills")
    @SendToUser("/queue/resume")
    public Ack handleSkills(List<Skill> skills) {
        // Handle the skills information here
        return new Ack();
    }

    // Set the awards information
    @MessageMapping("/resume/awards")
    @SendToUser("/queue/resume")
    public Ack handleAwards(List<Award> awards) {
        // Handle the awards information here
        return new Ack();
    }

    // Set the hobbies information
    @MessageMapping("/resume/hobbies")
    @SendToUser("/queue/resume")
    public Ack handleHobbies(List<String> hobbies) {
        // Handle the hobbies information here
        return new Ack();
    }

    // Compile the resume
    @MessageMapping("/resume/compile")
    @SendToUser("/queue/resume")
    public Ack handleCompile(Resume resume) {
        // Handle the compile action here
        return new Ack();
    }
}
