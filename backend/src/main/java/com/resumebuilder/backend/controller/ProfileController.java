package com.resumebuilder.backend.controller;

import java.security.Identity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.resumebuilder.backend.models.profile.Profile;
import com.resumebuilder.backend.service.IdentityService;
import com.resumebuilder.backend.service.ProfileService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class ProfileController {
    @Autowired
    private IdentityService identityService;
    @Autowired
    private ProfileService profileService;

    @GetMapping("/profile")
    public Profile getProfile() {
        return profileService.getProfileByUserId(identityService.getUserId());
    }

    @PostMapping("/profile")
    public Profile updateProfile(@RequestBody Profile entity) {
        return profileService.updateProfile(identityService.getUserId(), entity);
    }

}
