"use client"
import dynamic from "next/dynamic";
import RenderResumeDocument from "./pdf/resume.rendering";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { useEffect, useRef, useState } from "react";
import { useStompClient, useSubscription } from "react-stomp-hooks";
import { updateResume } from "@/state/resumeSlice";
import { useDocument } from "@/app/app/resume/[id]/hooks";

// Dynamic import of the PDFViewer component
const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => <p>Loading...</p>,
    },
);

// ResumeViewer component
export default function ResumeViewer() {
    const resumeState = useAppSelector((state) => state.resume);
    const [state, setState] = useState(resumeState);
    const ref = useRef<NodeJS.Timeout>();
    const client = useStompClient();

    useSubscription("/user/queue/resume/report", (message) => {
        if (message.body) {
            const report = JSON.parse(message.body);
            if (report.error) {
                alert("Error: " + report.data);
            } else {
                // TODO: Change this if using another service, like HTML one or LaTeX one
                const resume = report.data;
                resume.data.contactInfo.mediaProfiles = new Map(Object.entries(resume.data.contactInfo.mediaProfiles));
                setState(resume);
            }
        }
    })

    // Add a delay/timeout to the state update to prevent iframe from reloading on every state change
    // TODO: Change the idea of this when we manually compile this
    useEffect(() => {
        if (ref.current) {
            clearTimeout(ref.current);
        }

        ref.current = setTimeout(() => {
            client?.publish({
                destination: `/app/resume/compile`,
                body: JSON.stringify({
                    resume: resumeState,
                    format: "JSON"
                }),
                headers: {
                    "content-type": "application/json",
                }
            })
        }, 1000)
    }, [resumeState]);

    useEffect(() => { }, [state])

    return (
        <PDFViewer className='flex-1'>
            <RenderResumeDocument document={state.data} />
        </PDFViewer>
    );
}