"use client"
import dynamic from "next/dynamic";
import { ResumeDocument } from "./resume";
import { useEffect, useState } from "react";
import { Button } from "@headlessui/react";

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
            <PDFViewer className='flex-1' children={ResumeDocument}>
            </PDFViewer>
        </>
    );
}