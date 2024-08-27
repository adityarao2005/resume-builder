"use client"

import { createContext, PropsWithChildren, useContext, useState } from "react";

interface ITabContext {
    activeTab: number;
    setActiveTab: (tab: number) => void;
}

const TabContext = createContext<ITabContext>({ activeTab: 0, setActiveTab: () => { } });


function TabPane(props: PropsWithChildren<{}>) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <TabContext.Provider value={{ activeTab, setActiveTab }}>
            <div className="tab-pane flex flex-col h-full">
                {props.children}
            </div>
        </TabContext.Provider>
    );
}

function Tabs(props: PropsWithChildren<{}>) {
    return (
        <div role="tablist" className="tabs tabs-lifted">
            {props.children}
        </div>
    );
}

function TabContent(props: PropsWithChildren<{ tab: number }>) {
    const tabContext = useContext<ITabContext>(TabContext);
    return (
        <div className={`tab-content ${props.tab == tabContext.activeTab ? 'flex' : 'hidden'} flex-1 bg-base-100 border-base-300 rounded-b-lg p-6`}>
            {props.children}
        </div>
    );
}

function Tab(props: { title: string, checked?: boolean, tabName?: string, tab: number }) {
    const tabContext = useContext<ITabContext>(TabContext);
    return (
        <input
            type="radio"
            role="tab"
            name={props.tabName ? props.tabName : "tabs"}
            className="tab"
            aria-label={props.title}
            defaultChecked={props.checked}
            onClick={() => tabContext.setActiveTab(props.tab)}
        />
    );
}

export { TabPane, Tabs, TabContent, Tab };