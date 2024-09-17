"use server";

import DashboardContent from "@/app/app/content";

export interface IResumeEntry {
    job: {
        summary: string;
        title: string;
        description: string;
    };
    createdAt: Date;
    skills: string[];
}

const resumeEntries: IResumeEntry[] = [
    {
        job: {
            summary: "Developed software for a variety of clients.",
            title: "Software Engineer",
            description: "Developed software for a variety of clients."
        },
        skills: ["Java", "C++", "Python", "JavaScript"],
        createdAt: new Date(2022, 1, 1)
    },
    {
        job: {
            summary: "Developed websites for a variety of clients.",
            title: "Web Developer",
            description: "Developed websites for a variety of clients."
        },
        skills: ["HTML", "CSS", "JavaScript", "React"],
        createdAt: new Date(2023, 1, 1)
    },
    {
        job: {
            summary: "Analyzed data for a variety of clients.",
            title: "Data Scientist",
            description: "Analyzed data for a variety of clients."
        },
        skills: ["Python", "R", "SQL", "Excel"],
        createdAt: new Date(2024, 1, 1)
    }
]

// TODO: replace with actual db backend logic
export async function fetchResumeEntries() {
    return resumeEntries;
}

export default async function Page() {
    const entries = await fetchResumeEntries();

    return <DashboardContent resumeEntries={entries} />;
}