"use client"
import { Fieldset, Legend, Tab, TabGroup, TabList, TabPanel, TabPanels, Button } from "@headlessui/react";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import 'react-international-phone/style.css';
import { NameFragment, ContactInfoFragment, EducationFragment, ExperienceFragment, ProjectFragment, ECFragment, SkillsFragment, AwardsFragment, HobbiesFragment } from "@/components/profile/fragments";
import { useAppSelector } from "@/state/store";
import { Resume } from "@/models/types";
import { initialState } from "@/state/resumeSlice";
import RenderResumeDocument from "@/components/resume/pdf/resume.rendering";
import dynamic from "next/dynamic";



// Dynamic import of the PDFViewer component
const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => <Button className="btn btn-primary w-full" disabled>Generate CV</Button>,
    },
);

// Reuse some components from the form fragments
// Header component
function Header() {
    const profile = useAppSelector((state) => state.profile);
    const [cv, setCV] = useState<Resume.ResumeDetails>(initialState);
    const ref = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (ref.current) {
            clearTimeout(ref.current);
        }

        // Add a delay/timeout to the state update to prevent document from reloading on every state change
        ref.current = setTimeout(() => {
            setCV({
                name: profile.name,
                contactInfo: profile.contactInfo,
                education: profile.education,
                highlights: { lines: [] },
                experiences: profile.experiences,
                projects: profile.projects,
                extraCurriculars: profile.extraCurriculars,
                skills: [
                    ...profile.otherSkills,
                    ...profile.experiences.flatMap((exp) => exp.skills),
                    ...profile.projects.flatMap((exp) => exp.skills),
                    ...profile.extraCurriculars.flatMap((exp) => exp.skills),
                ],
                awards: profile.otherAwards,
                hobbies: profile.hobbies,
                version: 0,
                template: ''
            });
        }, 1000);
    }, [profile]);

    return (<div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Profile & Settings Page!</h1>
        <p className="py-6">
            View and update the profile and settings with the panel on the left.
        </p>
        {
            // TODO: Implement this as a server generated pdf from react
        }
        <PDFDownloadLink document={<RenderResumeDocument document={cv} />} fileName="cv.pdf" className="btn btn-primary w-full">Generate CV</PDFDownloadLink>
    </div>)
}

function ProfileInformation() {

    return (
        <Fieldset className="absolute inset-0 overflow-auto space-y-2 bg-base-200 rounded-b-xl p-4">
            <Legend className="text-lg font-bold">Information About You</Legend>
            <NameFragment />
            <ContactInfoFragment />
            <EducationFragment />
            <ExperienceFragment />
            <ProjectFragment />
            <ECFragment />
            <SkillsFragment />
            <AwardsFragment />
            <HobbiesFragment />
        </Fieldset>
    );
}

export default function ProfilePage() {

    return (<div className="flex-1 flex bg-base-300">
        <div className="my-10 mx-40 p-10 flex-1 bg-base-200 hero drop-shadow-md rounded-lg">
            {
                // Keep content in a hero component and centered
            }
            <Content>
                {
                    // Add a header to the hero component
                }
                <Header />
                <div className="card bg-base-100 w-full h-full max-w-2xl shrink-0 shadow-2xl">
                    {
                        // tabs and their content
                    }
                    <TabGroup className="h-full">
                        <TabList className="tabs tabs-lifted">
                            <Tab className="tab">Profile Information</Tab>
                            <Tab className="tab">Settings</Tab>
                        </TabList>
                        <TabPanels className="h-full">
                            {
                                // Profile information tab
                            }
                            <TabPanel className="h-full relative"><ProfileInformation /></TabPanel>
                            <TabPanel>Content 2</TabPanel>
                        </TabPanels>
                    </TabGroup>
                </div>
            </Content>
        </div>
    </div>);
}

function Content(props: PropsWithChildren<{}>) {

    // Content of the hero component
    return (
        <div className="hero-content flex-col lg:flex-row-reverse h-full w-full">
            {props.children}
        </div>
    )
}
