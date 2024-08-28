import ToolBar from "@/components/resume/ToolBar"
import { NameFragment, ContactInfoFragment, HoQFragment, EducationFragment, ExperienceFragment, ProjectFragment, ECFragment } from "@/components/resume/editor/fragments"
import ResumeViewer from "@/components/resume/pdf-viewer"

function Sidebar() {
    return (<div className="flex flex-col bg-base-300 w-96 overflow-auto p-4 space-y-1">
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
        <div className="flex-1"></div>
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
        <div className="flex flex-row flex-1">
            <Sidebar />
            <MainContent />
        </div>
    </div>)
}