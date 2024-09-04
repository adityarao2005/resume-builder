import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { resume as initialState } from '@/components/resume/pdf/resume';
import { Resume as namespace, Common } from '@/models/types';

export const resumeSlice = createSlice({
    name: 'resume',
    initialState,
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
        setHighlights: (state, action: PayloadAction<Common.IDescription | undefined>) => {
            state.highlights = action.payload;
        },
        setExperiences: (state, action: PayloadAction<namespace.IExperience[] | undefined>) => {
            state.experiences = action.payload;
        },
        setProjects: (state, action: PayloadAction<namespace.IProject[] | undefined>) => {
            state.projects = action.payload;
        },
        setExtraCurriculars: (state, action: PayloadAction<namespace.IExperience[] | undefined>) => {
            state.extraCurriculars = action.payload;
        },
        setSkills: (state, action: PayloadAction<namespace.ISkill[] | undefined>) => {
            state.skills = action.payload;
        },
        setAwards: (state, action: PayloadAction<Common.IAward[] | undefined>) => {
            state.awards = action.payload;
        },
        setHobbies: (state, action: PayloadAction<string[] | undefined>) => {
            state.hobbies = action.payload;
        }
    }
});

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