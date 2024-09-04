"use client";
import ToolBar from "@/components/resume/ToolBar"
import { NameFragment, ContactInfoFragment, HoQFragment, EducationFragment, ExperienceFragment, ProjectFragment, ECFragment } from "@/components/resume/editor/fragments"
import ResumeViewer from "@/components/resume/pdf-viewer"
import ReduxProvider from "@/state/redux-provider"

function Sidebar() {
    return (
        <div className="w-96 h-full relative bg-base-300">
            <div className="absolute inset-0 overflow-auto p-4 space-y-2">
                <NameFragment />
                <ContactInfoFragment />
                <HoQFragment />
                <EducationFragment />
                <ExperienceFragment />
                <ProjectFragment />
                <ECFragment />
                <div className="text-xl font-bold">
                    Skills
                </div>
                <div className="text-xl font-bold">
                    Achievements
                </div>
                <div className="text-xl font-bold">
                    Hobbies
                </div>

                <div className="text-xl font-bold">
                    Hobbies
                </div>

                <div className="text-xl font-bold">
                    Hobbies
                </div>
            </div>
        </div>)
}

function MainContent() {
    return (<div className="flex-1 flex flex-col">
        <ResumeViewer />
    </div>)
}

export default function ResumePage() {
    return (<div className="flex flex-col flex-1">
        <ToolBar />
        <ReduxProvider>
            <div className="flex flex-row h-full flex-1">
                <Sidebar />
                <MainContent />
            </div>
        </ReduxProvider>
    </div>)
}