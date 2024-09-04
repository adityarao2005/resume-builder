"use client"
import dynamic from "next/dynamic";
import RenderResumeDocument from "./pdf/resume.rendering";
import { useAppSelector } from "@/state/store";

const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => <p>Loading...</p>,
    },
);

export default function ResumeViewer() {
    const resumeState = useAppSelector((state) => state.resume);

    return (
        <>
            <PDFViewer className='flex-1'>
                <RenderResumeDocument document={resumeState} />
            </PDFViewer>
        </>
    );
}