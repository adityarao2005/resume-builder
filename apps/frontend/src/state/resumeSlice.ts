import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//import { resume as initialState } from '@/components/resume/pdf/resume';
import { Resume as namespace, Common } from '@/models/types';

export const initialState: namespace.Resume = {
    data: {
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
        hobbies: []
    },
    // TODO: Check if the Date is in date data type
    createdAt: new Date(),
    job: {
        title: '',
        company: '',
        description: { lines: [] },
        duration: {
            start: new Date(),
            end: new Date()
        }
    }
};


// Create a slice for the resume
export const resumeSlice = createSlice({
    name: 'resume',
    // The initial state of the resume
    initialState,
    // The reducers for the resume
    reducers: {
        resetResume: () => initialState,
        updateResume: (state, action: PayloadAction<namespace.Resume>) => {
            return action.payload;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.data.name = action.payload;
        },
        setContactInfo: (state, action: PayloadAction<namespace.IContactInfo>) => {
            state.data.contactInfo = action.payload;
        },
        setEducation: (state, action: PayloadAction<namespace.IEducationEntry[]>) => {
            state.data.education = action.payload;
        },
        setHighlights: (state, action: PayloadAction<Common.IDescription>) => {
            state.data.highlights = action.payload;
        },
        setExperiences: (state, action: PayloadAction<namespace.IExperience[]>) => {
            state.data.experiences = action.payload;
        },
        setProjects: (state, action: PayloadAction<namespace.IProject[]>) => {
            state.data.projects = action.payload;
        },
        setExtraCurriculars: (state, action: PayloadAction<namespace.IExperience[]>) => {
            state.data.extraCurriculars = action.payload;
        },
        setSkills: (state, action: PayloadAction<namespace.ISkill[]>) => {
            state.data.skills = action.payload;
        },
        setAwards: (state, action: PayloadAction<Common.IAward[]>) => {
            state.data.awards = action.payload;
        },
        setHobbies: (state, action: PayloadAction<string[]>) => {
            state.data.hobbies = action.payload;
        }
    }
});

// Export the actions
export const {
    updateResume,
    resetResume,
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