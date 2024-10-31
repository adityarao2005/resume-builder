"use client";
import { useAuthContext } from "@/components/context/AuthContext";
import ToolBar from "@/components/resume/ToolBar"
import { NameFragment, ContactInfoFragment, HoQFragment, EducationFragment, ExperienceFragment, ProjectFragment, ECFragment, SkillsFragment, HobbiesFragment, AwardsFragment } from "@/components/resume/fragments"
import ResumeViewer from "@/components/resume/pdf-viewer"
import { updateResume, setName } from "@/state/resumeSlice";
import { useAppDispatch } from "@/state/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StompSessionProvider, useStompClient, useSubscription } from 'react-stomp-hooks';
import { DocumentProvider, useDocument } from "./hooks";


function Sidebar() {
    const client = useStompClient();
    const dispatch = useAppDispatch();
    const { id } = useDocument();


    useSubscription("/user/queue/resume", (message) => {
        if (message.body) {
            const resume = JSON.parse(message.body);
            dispatch(updateResume(resume));
        }
    })

    useEffect(() => {
        if (client) {
            client.publish({
                destination: `/app/resume/set/${id}`,
                body: JSON.stringify({}),
            })
            console.log("Published set resume request: /app/resume/set/" + id)
        }
    }, [client])

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

enum LoadingState {
    LOADING,
    NOT_FOUND
}

type LoadingType = LoadingState.LOADING | LoadingState.NOT_FOUND | string;

export default function ResumePage({ params }: { params: { id: string } }) {
    const { user } = useAuthContext();
    const router = useRouter();
    const [loaded, setLoaded] = useState<LoadingType>(LoadingState.LOADING);

    if (!user) {
        router.push("/app/login");
        return;
    }

    useEffect(() => {
        async function registerResume() {
            const token = await user?.getIdToken();
            const response = await fetch("/api/resume/exists/" + params.id, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                setLoaded(LoadingState.NOT_FOUND);
            } else {
                setLoaded(`/api/ws?access_token=${token}`);
            }
        }

        registerResume();
    }, [])

    if (loaded == LoadingState.LOADING) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                    <h2 className="text-center text-gray-600 text-xl font-semibold">Loading...</h2>
                    <p className="text-gray-500">Please wait while we load your resume.</p>
                </div>
            </div>)
    } else if (loaded == LoadingState.NOT_FOUND) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <h2 className="text-center text-gray-600 text-xl font-semibold">Resume not found</h2>
                    <p className="text-gray-500">The resume you are looking for could not be found.</p>
                </div>
            </div>
        )
    } else {
        return (<div className="flex flex-col flex-1">
            <ToolBar />
            {
                // sidebar and main content
            }

            <DocumentProvider value={params}>

                <StompSessionProvider url={loaded} debug={STOMP => console.log({ STOMP })}
                    onConnect={() => console.log({ STOMP_CONNECT: 'TCP connection successfully established' })}>
                    <div className="flex flex-row h-full flex-1">
                        <Sidebar />
                        <MainContent />
                    </div>
                </StompSessionProvider>
            </DocumentProvider>

        </div>)
    }
}