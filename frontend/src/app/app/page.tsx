'use client'
import { useAuthContext } from "@/components/context/AuthContext";
import { formatDate } from "@/components/formatDate";
import Modal, { showModal } from "@/components/modal";
import { FilterModalProps, IResumeEntry, SortBy, SortModalProps, SortOrder } from "@/models/resume-manager";
import SearchBar from "@/components/resume/SearchBar";
import TabStopper from "@/components/resume/TabStopper";
import { Field, Fieldset, Label, Select, Textarea, Input, Button, Switch, Checkbox } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { useResumeManager } from "@/state/hooks";
import { AppDispatch, useAppDispatch } from "@/state/store";
import { setEntries, setFilterProps, setIdToken, setSearchProps, setSortProps } from "@/state/resumeManagerSlice";
import { Common, Resume } from "@/models/types";
import { FilterModal, SortModal } from "@/components/resume/SnS";
import Pagination, { Pages } from "@/components/pagination";
import { useFormState, useFormStatus } from "react-dom";
import { CreateFromScratch } from "@/components/resume/create-from-scratch";
import { CreateWithAI } from "@/components/resume/build-from-ai";


async function fetchEntries(token: string, dispatch: AppDispatch, resumeManager: ReturnType<typeof useResumeManager>) {
    const response = await fetch("/api/resume", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if (response.ok) {
        const data: Resume.Resume[] = await response.json();
        const dataEntries = data.map((entry) => {
            const desc = `${entry.data.name}\'s Resume for ${entry.job.title} at ${entry.job.company} during ${entry.job.duration.start} to ${entry.job.duration.end}. ${entry.job.description.substring(0, 50)}${((entry.job.description.length > 50) ? '...' : '')}`;
            return {
                job: {
                    summary: desc,
                    title: entry.job.title,
                    description: entry.job.description
                },
                skills: entry.data.skills.map((skill) => skill.name),
                createdAt: entry.createdAt,
                documentId: entry.documentId
            }
        });
        dispatch(setEntries(dataEntries));
    } else {
        console.error("Failed to fetch resume entries");
    }
}


function ResumeEntry({ props }: { props: IResumeEntry }) {
    const resumeManager = useResumeManager();
    const dispatch = useAppDispatch();

    const onDelete = async () => {
        const token = await resumeManager.idToken;
        const response = await fetch(`/api/resume/${props.documentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        if (response.ok) {
            await fetchEntries(resumeManager.idToken, dispatch, resumeManager);
        } else {
            console.log("Something went wrong")
        }

    }

    return (
        <div className="card bg-base-100 w-full max-w-xs shrink-0 shadow-2xl m-2">
            <figure className="bg-base-300">
                <div className="h-52" />
            </figure>
            <div className="card-body">
                <h2 className="card-title"><Link href={"/app/resume/" + props.documentId} className="link">{props.job.title}</Link></h2>
                <div>
                    <p className="font-bold">Created At: {props.createdAt}</p>
                    <p>{props.job.summary}</p>
                </div>
                <div className="card-actions justify-end">
                    {props.skills.map((skill, index) => <div key={index} className="badge badge-outline">{skill}</div>)}
                </div>
                <div>
                    <Button className="btn btn-primary" onClick={onDelete}>Delete</Button>
                </div>
            </div>
        </div>
    );
}

function Content() {
    const resumeManager = useResumeManager();
    const { user } = useAuthContext();
    const view = resumeManager.view;
    const searchValue = resumeManager.searchProps.query;
    const filterProps = resumeManager.filterProps;
    const sortProps = resumeManager.sortProps;
    const dispatch = useAppDispatch();


    useEffect(() => {
        async function init() {
            const token = await user!.getIdToken();
            dispatch(setIdToken(token));
            await fetchEntries(token, dispatch, resumeManager);
        }

        init()
    }, [])

    const setSearchValue = (query: string) => {
        dispatch(setSearchProps({ query }));
    }

    const setFilterProperties = (props: FilterModalProps) => {
        dispatch(setFilterProps(props));
    }

    const setSortProperties = (props: SortModalProps) => {
        dispatch(setSortProps(props));
    }

    return (<div className="flex-1 flex px-52 bg-base-300">
        <div className="bg-base-100 flex-1 flex flex-col">
            <div className="w-full flex flex-row p-4 space-x-2">
                <div className="flex flex-col h-full align-middle justify-center">Search:</div>
                <SearchBar value={resumeManager.searchProps.query} onChange={setSearchValue} />

                <Button className="btn btn-primary" onClick={() => showModal('filter_modal')}>Filter</Button>
                <FilterModal filterProps={resumeManager.filterProps} setFilterProps={setFilterProperties} />

                <Button className="btn btn-primary" onClick={() => showModal('sort_modal')}>Sort</Button>
                <SortModal sortProps={resumeManager.sortProps} setSortProps={setSortProperties} />

                <Button className="btn btn-primary" onClick={() => showModal('create_scratch_modal')}>Create From Scratch</Button>
                <CreateFromScratch />

                <Button className="btn btn-primary" onClick={() => showModal('create_ai_modal')}>Create With AI</Button>
                <CreateWithAI />
            </div>
            <div className="w-full flex flex-row p-4 space-x-2">
                {searchValue.length > 0 && <TabStopper text={searchValue} action={() => setSearchValue("")} />}
                {filterProps.before &&
                    <TabStopper
                        text={`Before: ${filterProps.before}`}
                        action={() => setFilterProps({ ...filterProps, before: undefined })} />
                }
                {filterProps.after &&
                    <TabStopper
                        text={`After: ${filterProps.after}`}
                        action={() => setFilterProps({ ...filterProps, after: undefined })} />
                }
                {
                    filterProps.skills.map((skill, index) => {
                        const list = [...filterProps.skills];
                        list.splice(index, 1)
                        return <TabStopper key={index} text={skill} action={() => setFilterProps({ ...filterProps, skills: list })} />
                    })
                }
                <TabStopper text={`Sort by: ${sortProps.by} (${sortProps.order})`} action={() => setSortProps({ order: 'ascending', by: 'title' })} />
            </div>
            <div className="flex flex-wrap p-4">
                {view.map((entry, index) => <ResumeEntry key={index} props={entry} />)}
            </div>
        </div>
    </div>
    )
}

export default function Page() {
    const { user } = useAuthContext();
    const router = useRouter();

    if (!user) {
        router.push("/app/login");
        return;
    }

    return (
        <Content />
    );
}