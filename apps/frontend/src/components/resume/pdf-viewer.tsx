"use client"
import dynamic from "next/dynamic";
import RenderResumeDocument from "./pdf/resume.rendering";
import { useAppSelector } from "@/state/store";
import { useEffect, useRef, useState } from "react";

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
    const [key, setKey] = useState(0);

    // Add a delay/timeout to the state update to prevent iframe from reloading on every state change
    useEffect(() => {
        if (ref.current) {
            clearTimeout(ref.current);
        }

        ref.current = setTimeout(() => {
            setState(resumeState);
            setKey(key + 1);
        }, 1000)
    }, [resumeState]);

    return (
        <PDFViewer key={key} className='flex-1'>
            <RenderResumeDocument document={state} />
        </PDFViewer>
    );
}