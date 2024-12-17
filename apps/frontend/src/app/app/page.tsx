"use client";

import DashboardContent from "@/app/app/content";
import { useAuthContext } from "@/components/context/AuthContext";
import { Resume } from "@/models/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// TODO: Replace this very very weird glue code that i made in a rush with manager.tsx

export interface IResumeEntry {
    job: {
        summary: string;
        title: string;
        description: string;
    };
    documentId?: string;
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

export default function Page() {
    const { user } = useAuthContext();
    const router = useRouter();

    if (!user) {
        router.push("/app/login");
        return;
    }

    const [entries, setEntries] = useState<IResumeEntry[]>(resumeEntries);

    // Fetch resume entries
    useEffect(() => {
        async function fetchEntries() {
            const token = await user?.getIdToken();
            const response = await fetch("/api/resume", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (response.ok) {
                const data: Resume.Resume[] = await response.json();
                const dataEntries = data.map((entry) => {
                    const desc = `${entry.data.name}\'s Resume for ${entry.job.title} at ${entry.job.company} during ${entry.job.duration.start} to ${entry.job.duration.end}. ${entry.job.description.substring(0, 50)}${((entry.job.description.length > 50) ? '...' : '')}`;
                    return {
                        job: {
                            summary: desc,
                            title: entry.job.title,
                            description: entry.job.description
                        },
                        skills: entry.data.skills.map((skill) => skill.name),
                        createdAt: new Date(entry.createdAt),
                        documentId: entry.documentId
                    }
                });
                setEntries(dataEntries);
            } else {
                console.error("Failed to fetch resume entries");
            }
        }

        fetchEntries();

    }, []);

    return <DashboardContent resumeEntries={entries} />;
}