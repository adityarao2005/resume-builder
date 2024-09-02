"use client"
import dynamic from "next/dynamic";
import { resume } from "./pdf/resume";
import RenderResumeDocument from "./pdf/resume.rendering";

const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => <p>Loading...</p>,
    },
);

export default function ResumeViewer() {
    return (
        <>
            <PDFViewer className='flex-1'>
                <RenderResumeDocument document={resume} />
            </PDFViewer>
        </>
    );
}