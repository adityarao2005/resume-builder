import { Tab, TabGroup, TabList } from "@headlessui/react";

export default function HoQFragment() {
    return (<div className="text-xl font-bold flex flex-row">
        <div>Highlights of Qualifications</div>
        <div className="flex-1"></div>
        <TabGroup>
            <TabList className="tabs tabs-boxed">
                <Tab className="tab">None</Tab>
                <Tab className="tab">Edit</Tab>
            </TabList>
        </TabGroup>
    </div>)
}
