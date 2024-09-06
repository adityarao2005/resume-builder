import { Field, Fieldset, Input, Label, Legend, Select, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { PropsWithChildren } from "react";


// Header component
function Header() {
    return (<div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Profile & Settings Page!</h1>
        <p className="py-6">
            View and update the profile and settings with the panel on the left.
        </p>
    </div>)
}

function ProfileInformation() {
    return (
        <Fieldset className="space-y-8 p-4">
            <Legend className="text-lg font-bold">Information About You</Legend>
            {
                // Name and country fields
            }
            <Field>
                <Label>Name:</Label>
                <Label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    {
                        // Input field for the name
                    }
                    <Input type="text" className="grow" placeholder="Enter your name" />
                </Label>
            </Field>
            <Field>
                <Label>Country:</Label>
                {
                    // Select field for the country
                    // replace with a country selector component
                }
                
                <Select className="select select-bordered w-full" name="country">
                    <option disabled selected>Select a country</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                    <option>United States</option>
                </Select>
            </Field>
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
                        // TODO: Add actual content to the tabs (settings and profile information)
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
                            <TabPanel><ProfileInformation /></TabPanel>
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
    return (<div className="hero-content flex-col lg:flex-row-reverse h-full w-full">
        {props.children}
    </div>)
}
