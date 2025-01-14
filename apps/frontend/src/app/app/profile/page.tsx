"use client"
import { Fieldset, Legend, Tab, TabGroup, TabList, TabPanel, TabPanels, Button } from "@headlessui/react";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import 'react-international-phone/style.css';
import { NameFragment, ContactInfoFragment, EducationFragment, ExperienceFragment, ProjectFragment, ECFragment, SkillsFragment, AwardsFragment, HobbiesFragment } from "@/components/profile/fragments";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Resume, Profile } from "@/models/types";
import { initialState } from "@/state/resumeSlice";
import { updateProfile } from "@/state/profileSlice";
import RenderResumeDocument from "@/components/resume/pdf/resume.rendering";
import dynamic from "next/dynamic";
import { useAuthContext } from "@/components/context/AuthContext";
import { useRouter } from "next/navigation";
import { formatDate } from "@/components/formatDate";
import { User } from "firebase/auth";

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

    return (<div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Profile Page!</h1>
    </div>)
}

function DownloadLink({ cv }: { cv: Resume.Resume }) {
    /*
        useEffect(() => {
            if (ref.current) {
                clearTimeout(ref.current);
            }
    
            // Add a delay/timeout to the state update to prevent document from reloading on every state change
            ref.current = setTimeout(() => {
                setCV(
                    {
                        data: {
                            name: profile.name,
                            contactInfo: profile.contactInfo,
                            education: profile.education,
                            highlights: [],
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
                        },
                        createdAt: formatDate(new Date()),
                        job: {
                            title: '',
                            company: '',
                            description: '',
                            duration: { start: formatDate(new Date()), end: formatDate(new Date()) },
                        },
                        documentId: ''
                    });
            }, 1000);
        }, [profile]);*/


    return (
        <PDFDownloadLink document={<RenderResumeDocument document={cv.data} />} fileName="cv.pdf" className="btn btn-primary flex-1">Download CV</PDFDownloadLink>
    );
}

function morphProfileToCV(profile: Profile.IProfile): Resume.Resume {
    return {
        data: {
            name: profile.name,
            contactInfo: profile.contactInfo,
            education: profile.education,
            highlights: [],
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
        },
        createdAt: formatDate(new Date()),
        job: {
            title: '',
            company: '',
            description: '',
            duration: { start: formatDate(new Date()), end: formatDate(new Date()) },
        },
        documentId: ''
    };
}

function SaveButton({ setCV }: { setCV: (cv: Resume.Resume) => void }) {
    const profile = useAppSelector((state) => state.profile);
    const dispatch = useAppDispatch();
    const [warning, setWarning] = useState<string>("btn-primary");
    const { user } = useAuthContext();
    const initRef = useRef(false);

    const action = () => {
        updateProfileSource(user!, profile).then(() => alert("Saved!"));
        setCV(morphProfileToCV(profile));
        setWarning("primary")
    }

    useEffect(() => {
        if (initRef.current == true) {
            console.log("Changes detected");
            setWarning("btn-warning")

        }
    }, [profile]);

    useEffect(() => {
        async function init() {
            const profile = await loadProfile(user);
            console.log(profile)
            dispatch(updateProfile(profile));
            await new Promise((resolve) => setTimeout(resolve, 500));
            initRef.current = true;
        }

        init();

        if (typeof window !== undefined) {
            window.onbeforeunload = () => {
                if (warning !== "primary") {
                    return "You have unsaved changes. Are you sure you want to leave?";
                }
            }
        }
    }, [])

    return (
        <Button className={`btn ${warning} flex-1`} onClick={action}>Save</Button>
    )
}

function ProfileInformation() {

    return (
        <Fieldset className="space-y-2 bg-base-200 rounded-b-xl py-2">
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

function ProfileContent() {
    const [cv, setCV] = useState<Resume.Resume>(initialState);

    return (
        <div className="mx-40 p-10 flex-1 bg-base-200 drop-shadow-md">
            {
                // Keep content in a hero component and centered
            }
            <Header />
            <ProfileInformation />
            <div className="flex flex-row space-x-2">
                <DownloadLink cv={cv} />
                <SaveButton setCV={setCV} />
            </div>
        </div>

    );
}

async function loadProfile(user?: User): Promise<Profile.IProfile> {

    const token = await user?.getIdToken();

    const response = await fetch("/api/profile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    });

    const profile: Profile.IProfile = await response.json();

    return profile;
}

async function updateProfileSource(user: User, profile: Profile.IProfile): Promise<Profile.IProfile> {

    const token = await user.getIdToken();

    const response = await fetch("/api/profile", {
        method: "POST",
        body: JSON.stringify(profile),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    });

    return await response.json();
}

export default function ProfilePage() {
    const { user } = useAuthContext();
    const router = useRouter();

    if (!user) {
        router.push("/app/login");
        return;
    }

    return (<div className="flex-1 flex bg-base-300">
        <ProfileContent />
    </div>);
}
