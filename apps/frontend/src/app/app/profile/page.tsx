import { Tab, TabContent, TabPane, Tabs } from "@/components/tab";
import { PropsWithChildren } from "react";


// TODO - Left off in creating the tab components no wto populate it with settings and profile information

function Header() {
    return (<div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
    </div>)
}


export default function ProfilePage() {
    return (<div className="flex-1 flex bg-base-300">
        <div className="my-10 mx-40 p-10 flex-1 bg-base-200 hero drop-shadow-md rounded-lg">
            <Content>
                <Header />
                <div className="card bg-base-100 w-full h-full max-w-sm shrink-0 shadow-2xl">
                    <TabPane>
                        <Tabs>
                            <Tab title="Tab 1" checked={true} tab={0}></Tab>
                            <Tab title="Tab 2" tab={1}></Tab>
                            <Tab title="Tab 3" tab={2}></Tab>
                        </Tabs>
                        <TabContent tab={0}>
                            Hello from tab 1
                        </TabContent>
                        <TabContent tab={1}>
                            Hello from tab 2
                        </TabContent>
                        <TabContent tab={2}>
                            Hello from tab 3
                        </TabContent>
                    </TabPane>
                </div>
            </Content>
        </div>
    </div>);
}

function Content(props: PropsWithChildren<{}>) {
    return (<div className="hero-content flex-col lg:flex-row-reverse h-full">
        {props.children}
    </div>)
}
