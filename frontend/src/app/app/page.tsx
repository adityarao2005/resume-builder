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


function CreateFromScratch() {
    const { user } = useAuthContext();
    const router = useRouter();


    async function onSubmit(formData: FormData) {
        const title = formData.get("title") as string;
        const company = formData.get("company") as string;
        const startDate = formData.get("startDate") as string;
        const endDate = formData.get("endDate") as string;
        const description = formData.get("description") as string;

        const job = {
            title,
            company,
            duration: {
                start: startDate,
                end: endDate
            },
            description: description
        }

        const resume = {
            job,
            data: {
                name: '',
                contactInfo: { mediaProfiles: [] },
                education: [],
                highlights: [],
                experiences: [],
                projects: [],
                extraCurriculars: [],
                awards: [],
                hobbies: [],
                skills: [],
            },
        }

        const token = await user?.getIdToken();
        const response = await fetch("/api/resume", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(resume)
        })
        const documentId = (await response.json()).documentId;

        if (response.ok) {
            router.push('/app/resume/' + documentId)
        } else {
            alert("Something went wrong")
        }
    }

    return (
        <Modal name="create_scratch_modal" title="Create Resume">
            <form action={onSubmit} className="flex w-full flex-col">
                <div className="pb-2">
                    <h2 className="text-md font-bold">Enter the job details</h2>
                    <Fieldset className="space-y-1">
                        <Field className="flex flex-row">
                            <Label className="font-bold">Title:&nbsp;</Label>
                            <Input className="input input-bordered flex-1" type="text" name="title" />
                        </Field>
                        <Field className="flex flex-row">
                            <Label className="font-bold">Company:&nbsp;</Label>
                            <Input className="input input-bordered flex-1" type="text" name="company" />
                        </Field>
                        <Field className="flex flex-row">
                            <Label className="font-bold">Start Date:&nbsp;</Label>
                            <Input className="input input-bordered flex-1" type="date" name="startDate" />
                        </Field>
                        <Field className="flex flex-row">
                            <Label className="font-bold">End Date:&nbsp;</Label>
                            <Input className="input input-bordered flex-1" type="date" name="endDate" />
                        </Field>
                        <Field className="flex flex-col">
                            <Label className="font-bold">Description:&nbsp;</Label>
                            <Textarea className="input input-bordered h-20" name="description" />
                        </Field>
                    </Fieldset>
                </div>
                <div>
                    <Button type="submit" className="btn btn-primary cursor-pointer">Submit</Button>
                </div>
            </form>
        </Modal>
    )
}

interface ResumeCreationStrategy {
    pages: number
    minExperiences: number
    maxExperiences: number
    minProjects: number
    maxProjects: number
    minExtraCurriculars: number
    maxExtraCurriculars: number
}

interface ResumeCreationOptions {
    addSkills: boolean
    addHighlights: boolean
    addAwards: boolean
    addHobbies: boolean
    minDescriptionLength: number
    maxDescriptionLength: number
    filterStrategy: ResumeCreationStrategy
}

interface ResumeCreationRequest {
    job: Common.IJob
    options: ResumeCreationOptions
}

interface FormStatus {
    status: 'error' | 'ready' | 'idle'
    message: ResumeCreationRequest | string[] | string
}

function onSubmit(previousState: FormStatus, formData: FormData): FormStatus {
    // Job information
    const title = formData.get("title") as string;
    const company = formData.get("company") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const description = formData.get("description") as string;

    console.log(title, company, startDate, endDate, description);
    if (!title || !company || !startDate || !endDate || !description) {
        const errors = []
        if (!title) errors.push("Title is required (Page 1)")
        if (!company) errors.push("Company is required (Page 1)")
        if (!startDate) errors.push("Start Date is required (Page 1)")
        if (!endDate) errors.push("End Date is required (Page 1)")
        if (!description) errors.push("Description is required (Page 1)")
        return {
            message: errors,
            status: "error"
        }
    }

    // AI information
    const addSkills = formData.get("addSkills") === "on";
    const addHighlights = formData.get("addHighlights") === "on";
    const addAwards = formData.get("addAwards") === "on";
    const addHobbies = formData.get("addHobbies") === "on";
    const minDescriptionLength = parseInt(formData.get("minDescriptionLength") as string);
    const maxDescriptionLength = parseInt(formData.get("maxDescriptionLength") as string);

    if (minDescriptionLength > maxDescriptionLength) {
        return {
            message: "Min Description Length cannot be greater than Max Description Length",
            status: "error"
        }
    }

    // Page information
    const pages = parseInt(formData.get("pages") as string);
    const minExperiences = parseInt(formData.get("minExperiences") as string);
    const maxExperiences = parseInt(formData.get("maxExperiences") as string);
    const minProjects = parseInt(formData.get("minProjects") as string);
    const maxProjects = parseInt(formData.get("maxProjects") as string);
    const minExtraCurriculars = parseInt(formData.get("minExtraCurriculars") as string);
    const maxExtraCurriculars = parseInt(formData.get("maxExtraCurriculars") as string);

    return {
        message: {
            job: {
                title,
                company,
                duration: {
                    start: startDate,
                    end: endDate
                },
                description
            },
            options: {
                addSkills,
                addHighlights,
                addAwards,
                addHobbies,
                minDescriptionLength,
                maxDescriptionLength,
                filterStrategy: {
                    pages,
                    minExperiences,
                    maxExperiences,
                    minProjects,
                    maxProjects,
                    minExtraCurriculars,
                    maxExtraCurriculars
                }
            }
        },
        status: "ready"
    }
}

function CreateWithAI() {
    const { user } = useAuthContext();
    const router = useRouter();


    const [state, formAction] = useFormState<FormStatus, FormData>(onSubmit, { status: 'idle', message: 'Ready' });

    useEffect(() => {
        async function makeRequest(request: ResumeCreationRequest) {
            const token = await user?.getIdToken();
            const response = await fetch("/api/resumes/build", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(request)
            })
            const documentId = (await response.json()).documentId;

            if (response.ok) {
                router.push('/app/resume/' + documentId)
            } else {
                alert("Something went wrong")
            }
        }

        if (state.status === 'ready') {
            makeRequest(state.message as ResumeCreationRequest);
        }
    }, [state])

    return (
        <Modal name="create_ai_modal" title="Build with AI">
            <form action={formAction} className="flex w-full flex-col">
                <Pagination pages={3}>
                    <div>
                        <h2 className="text-xl font-bold">Enter the job details</h2>
                        <Fieldset className="space-y-1">
                            <Field className="form-control">
                                <div className="label">
                                    <Label className="font-bold label-text">Title:&nbsp;</Label>
                                    <span className="label-text-alt text-red-700 font-bold">Required</span>
                                </div>
                                <Input className="input input-bordered" type="text" placeholder="Enter the position title here" name="title" />
                            </Field>

                            <Field className="form-control">
                                <div className="label">
                                    <Label className="font-bold label-text">Company:&nbsp;</Label>
                                    <span className="label-text-alt text-red-700 font-bold">Required</span>
                                </div>
                                <Input className="input input-bordered" type="text" placeholder="Enter the company title here" name="company" />
                            </Field>

                            <Field className="form-control">
                                <div className="label">
                                    <Label className="font-bold label-text">Start Date:&nbsp;</Label>
                                    <span className="label-text-alt text-red-700 font-bold">Required</span>
                                </div>
                                <Input className="input input-bordered" type="date" name="startDate" />
                            </Field>

                            <Field className="form-control">
                                <div className="label">
                                    <Label className="font-bold label-text">End Date:&nbsp;</Label>
                                    <span className="label-text-alt text-red-700 font-bold">Required</span>
                                </div>
                                <Input className="input input-bordered" type="date" name="endDate" />
                            </Field>


                            <Field className="form-control">
                                <div className="label">
                                    <Label className="font-bold label-text">Description:&nbsp;</Label>
                                    <span className="label-text-alt text-red-700 font-bold">Required</span>
                                </div>
                                <Textarea className="input input-bordered h-20" name="description" />
                            </Field>
                        </Fieldset>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Enter some parameters about the job</h2>
                        <Fieldset className="space-y-1">
                            <div className="grid grid-cols-2">
                                <Field className="flex flex-row py-1">
                                    <Label>Add Skills:&nbsp;</Label>
                                    <Switch className="toggle" name="addSkills" defaultChecked={true} />
                                </Field>
                                <Field className="flex flex-row py-1">
                                    <Label>Add Highlights:&nbsp;</Label>
                                    <Switch className="toggle" name="addHighlights" />
                                </Field>
                                <Field className="flex flex-row py-1">
                                    <Label>Add Awards:&nbsp;</Label>
                                    <Switch className="toggle" name="addAwards" />
                                </Field>
                                <Field className="flex flex-row py-1">
                                    <Label>Add Hobbies:&nbsp;</Label>
                                    <Switch className="toggle" name="addHobbies" />
                                </Field>
                            </div>
                            <h3 className="text-md py-2 font-bold">Description information:</h3>
                            <div className="space-y-1">
                                <Field className="form-control">
                                    <div className="label">
                                        <Label className="font-bold label-text">Min Length:&nbsp;</Label>
                                    </div>
                                    <Input type="number" className="input input-bordered" name="minDescriptionLength" defaultValue={0} min={0} />
                                </Field>
                                <Field className="form-control">
                                    <div className="label">
                                        <Label className="font-bold label-text">Max Length:&nbsp;</Label>
                                    </div>
                                    <Input type="number" className="input input-bordered" name="maxDescriptionLength" defaultValue={5} min={0} />
                                </Field>
                            </div>

                            <h3 className="text-md py-2 font-bold">Page information:</h3>
                            <div className="space-y-1">

                                <p>For any values which are unrestricted, keep -1.</p>

                                <Field className="form-control">
                                    <div className="label">
                                        <Label className="font-bold label-text">Max Pages:&nbsp;</Label>
                                    </div>
                                    <Input type="number" className="input input-bordered" name="pages" defaultValue={-1} min={-1} />
                                </Field>

                                <Field className="form-control">
                                    <div className="label">
                                        <Label className="font-bold label-text">Min Experience:&nbsp;</Label>
                                    </div>
                                    <Input type="number" className="input input-bordered" name="minExperiences" defaultValue={-1} min={-1} />
                                </Field>

                                <Field className="form-control">
                                    <div className="label">
                                        <Label className="font-bold label-text">Max Experience:&nbsp;</Label>
                                    </div>
                                    <Input type="number" className="input input-bordered" name="maxExperiences" defaultValue={-1} min={-1} />
                                </Field>

                                <Field className="form-control">
                                    <div className="label">
                                        <Label className="font-bold label-text">Min Projects:&nbsp;</Label>
                                    </div>
                                    <Input type="number" className="input input-bordered" name="minProjects" defaultValue={-1} min={-1} />
                                </Field>

                                <Field className="form-control">
                                    <div className="label">
                                        <Label className="font-bold label-text">Max Projects:&nbsp;</Label>
                                    </div>
                                    <Input type="number" className="input input-bordered" name="maxProjects" defaultValue={-1} min={-1} />
                                </Field>

                                <Field className="form-control">
                                    <div className="label">
                                        <Label className="font-bold label-text">Min Extra Curriculars:&nbsp;</Label>
                                    </div>
                                    <Input type="number" className="input input-bordered" name="minExtraCurriculars" defaultValue={-1} min={-1} />
                                </Field>

                                <Field className="form-control">
                                    <div className="label">
                                        <Label className="font-bold label-text">Max Extra Curriculars:&nbsp;</Label>
                                    </div>
                                    <Input type="number" className="input input-bordered" name="maxExtraCurriculars" defaultValue={-1} min={-1} />
                                </Field>

                            </div>
                        </Fieldset>
                    </div>
                    <div>
                        <div>
                            <h2 className="text-xl py-2 font-bold">Review and Submit:</h2>
                            <p className="py-2">When you are ready to submit, hit the submit button.</p>
                            {
                                state.status === 'error' && (<div>

                                    {(state.message as string[]).map((message, index) => <div key={index} className="alert alert-error my-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 shrink-0 stroke-current"
                                            fill="none"
                                            viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>{message}</div>
                                    </div>
                                    )}
                                </div>)
                            }
                            <Button type="submit" className="btn btn-primary cursor-pointer">Submit</Button>
                        </div>
                    </div>
                </Pagination>
            </form>
        </Modal >
    )
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