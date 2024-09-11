"use client";
import ToolBar from "@/components/resume/ToolBar"
import { NameFragment, ContactInfoFragment, HoQFragment, EducationFragment, ExperienceFragment, ProjectFragment, ECFragment, SkillsFragment, HobbiesFragment, AwardsFragment } from "@/components/resume/fragments/fragments"
import ResumeViewer from "@/components/resume/pdf-viewer"
import ReduxProvider from "@/state/redux-provider"

function Sidebar() {
    return (
        <div className="w-96 h-full relative bg-base-300">
            {
                // sub-section with scrollable content. hack to make it scrollable and embedded in the sidebar
            }
            <div className="absolute inset-0 overflow-auto p-4 space-y-2">
                {
                    // sections of the resume to be editted
                }
                <NameFragment />
                <ContactInfoFragment />
                <HoQFragment />
                <EducationFragment />
                <ExperienceFragment />
                <ProjectFragment />
                <ECFragment />
                <SkillsFragment />
                <AwardsFragment />
                <HobbiesFragment />
            </div>
        </div>)
}

function MainContent() {
    return (<div className="flex-1 flex flex-col">
        {
            // Resume viewer component
        }
        <ResumeViewer />
    </div>)
}

export default function ResumePage() {
    return (<div className="flex flex-col flex-1">
        <ToolBar />
        {
            // sidebar and main content
        }
        <div className="flex flex-row h-full flex-1">
            <Sidebar />
            <MainContent />
        </div>
    </div>)
}