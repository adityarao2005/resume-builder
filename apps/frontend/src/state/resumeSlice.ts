import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//import { resume as initialState } from '@/components/resume/pdf/resume';
import { Resume as namespace, Common } from '@/models/types';

const initialState: namespace.ResumeDetails = {
    name: '',
    contactInfo: {
        mediaProfiles: new Map()
    },
    education: [],
    highlights: { lines: [] },
    experiences: [],
    projects: [],
    extraCurriculars: [],
    skills: [],
    awards: [],
    hobbies: [],
    version: 0,
    template: ''
};


// Create a slice for the resume
export const resumeSlice = createSlice({
    name: 'resume',
    // The initial state of the resume
    initialState,
    // The reducers for the resume
    reducers: {
        updateResume: (state, action: PayloadAction<namespace.ResumeDetails>) => {
            return action.payload;
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
        setHighlights: (state, action: PayloadAction<Common.IDescription>) => {
            state.highlights = action.payload;
        },
        setExperiences: (state, action: PayloadAction<namespace.IExperience[]>) => {
            state.experiences = action.payload;
        },
        setProjects: (state, action: PayloadAction<namespace.IProject[]>) => {
            state.projects = action.payload;
        },
        setExtraCurriculars: (state, action: PayloadAction<namespace.IExperience[]>) => {
            state.extraCurriculars = action.payload;
        },
        setSkills: (state, action: PayloadAction<namespace.ISkill[]>) => {
            state.skills = action.payload;
        },
        setAwards: (state, action: PayloadAction<Common.IAward[]>) => {
            state.awards = action.payload;
        },
        setHobbies: (state, action: PayloadAction<string[]>) => {
            state.hobbies = action.payload;
        }
    }
});

// Export the actions
export const {
    updateResume,
    setName,
    setContactInfo,
    setEducation,
    setHighlights,
    setExperiences,
    setProjects,
    setExtraCurriculars,
    setSkills,
    setAwards,
    setHobbies
} = resumeSlice.actions;

export default resumeSlice.reducer;