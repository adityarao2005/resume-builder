import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//import { resume as initialState } from '@/components/resume/pdf/resume';
import { Resume as namespace, Common, Profile } from '@/models/types';
//import {profile as initialState} from '@/app/app/profile/profile';

export const initialState: Profile.IProfile = {
    name: '',
    contactInfo: {
        mediaProfiles: [],
    },
    education: [],
    experiences: [],
    projects: [],
    extraCurriculars: [],
    otherSkills: [],
    otherAwards: [],
    hobbies: []
}

// Create a slice for the profile
export const profileSlice = createSlice({
    name: 'profile',
    // The initial state of the resume
    initialState,
    // The reducers for the resume
    reducers: {
        resetProfile: () => initialState,
        updateProfile: (state, action: PayloadAction<Profile.IProfile>) => {
            state.name = action.payload.name;
            state.contactInfo = action.payload.contactInfo;
            state.education = action.payload.education;
            state.experiences = action.payload.experiences;
            state.projects = action.payload.projects;
            state.extraCurriculars = action.payload.extraCurriculars;
            state.otherSkills = action.payload.otherSkills;
            state.otherAwards = action.payload.otherAwards;
            state.hobbies = action.payload.hobbies;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setContactInfo: (state, action: PayloadAction<namespace.IContactInfo>) => {
            state.contactInfo = action.payload;
        },
        setEducation: (state, action: PayloadAction<namespace.IEducationEntry[]>) => {
            state.education = action.payload;
        },
        setExperiences: (state, action: PayloadAction<Profile.IProfileExperience[]>) => {
            state.experiences = action.payload;
        },
        setProjects: (state, action: PayloadAction<Profile.IProfileProject[]>) => {
            state.projects = action.payload;
        },
        setExtraCurriculars: (state, action: PayloadAction<Profile.IProfileExperience[]>) => {
            state.extraCurriculars = action.payload;
        },
        setOtherSkills: (state, action: PayloadAction<namespace.ISkill[]>) => {
            state.otherSkills = action.payload;
        },
        setOtherAwards: (state, action: PayloadAction<Common.IAward[]>) => {
            state.otherAwards = action.payload;
        },
        setHobbies: (state, action: PayloadAction<string[]>) => {
            state.hobbies = action.payload;
        }
    }
});

// Export the actions
export const {
    resetProfile,
    updateProfile,
    setName,
    setContactInfo,
    setEducation,
    setExperiences,
    setProjects,
    setExtraCurriculars,
    setOtherSkills,
    setOtherAwards,
    setHobbies
} = profileSlice.actions;

export default profileSlice.reducer;