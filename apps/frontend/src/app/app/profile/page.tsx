"use client"
import { Fieldset, Legend, Tab, TabGroup, TabList, TabPanel, TabPanels, Button } from "@headlessui/react";
import { PropsWithChildren } from "react";
import 'react-international-phone/style.css';
import Name from "@/components/profile/fragments/name.fragment";
import ContactInfoFragment from "@/components/profile/fragments/contactinfo.fragment";
import EducationFragment from "@/components/profile/fragments/education.fragment";
import ExperienceFragment from "@/components/profile/fragments/experience.fragment";
import ProjectFragment from "@/components/profile/fragments/project.fragment";
import ECFragment from "@/components/profile/fragments/ec.fragment";


// TODO: finish this page
// Reuse some components from the form fragments
// Header component
function Header() {
    return (<div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Profile & Settings Page!</h1>
        <p className="py-6">
            View and update the profile and settings with the panel on the left.
        </p>
        {
            // TODO: Implement this as a server generated pdf from react
        }
        <Button className="btn btn-primary w-full">Generate CV</Button>
    </div>)
}

function ProfileInformation() {

    return (
        <Fieldset className="absolute inset-0 overflow-auto space-y-2 bg-base-200 rounded-b-xl p-4">
            <Legend className="text-lg font-bold">Information About You</Legend>
            <Name />
            <ContactInfoFragment />
            <EducationFragment />
            <ExperienceFragment />
            <ProjectFragment />
            <ECFragment />
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
                            <Tab className="tab">Experience</Tab>
                        </TabList>
                        <TabPanels className="h-full">
                            {
                                // Profile information tab
                            }
                            <TabPanel className="h-full relative"><ProfileInformation /></TabPanel>
                            <TabPanel>Content 2</TabPanel>
                            <TabPanel>Content 3</TabPanel>
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
