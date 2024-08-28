import { Tab, TabGroup, TabList } from "@headlessui/react";

export default function ContactInfoFragment() {
    return (<div className="text-xl font-bold flex flex-row">
        <div>Contact Info</div>
        <div className="flex-1"></div>
        <TabGroup>
            <TabList className="tabs tabs-boxed">
                <Tab className="tab">Default</Tab>
                <Tab className="tab">Edit</Tab>
            </TabList>
        </TabGroup>
    </div>)
}
