'use client'
import { useAuthContext } from "@/components/context/AuthContext";
import { formatDate } from "@/components/formatDate";
import Modal, { showModal } from "@/components/modal";
import { FilterModalProps, IResumeEntry, SortBy, SortModalProps, SortOrder } from "@/models/resume-manager";
import SearchBar from "@/components/resume/SearchBar";
import TabStopper from "@/components/resume/TabStopper";
import { Field, Fieldset, Label, Select, Textarea, Input, Button } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useResumeManager } from "@/state/hooks";
import { AppDispatch, useAppDispatch } from "@/state/store";
import { setEntries, setFilterProps, setIdToken, setSearchProps, setSortProps } from "@/state/resumeManagerSlice";
import { Resume } from "@/models/types";


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


function FilterModal({ filterProps, setFilterProps }: { filterProps: FilterModalProps, setFilterProps: (props: FilterModalProps) => void }) {
    const [searchValue, setSearchValue] = useState("");

    const addSkill = () => {
        const list = [...filterProps.skills];
        list.push(searchValue);
        setSearchValue("");
        setFilterProps({ ...filterProps, skills: list });
    }

    const removeSkill = (index: number) => {
        const list = [...filterProps.skills];
        list.splice(index, 1)
        setFilterProps({ ...filterProps, skills: list });
    }

    const setBeforeState = (before?: string) => {
        setFilterProps({ ...filterProps, before });
    }

    const setAfterState = (after?: string) => {
        setFilterProps({ ...filterProps, after });
    }

    return (<Modal name="filter_modal" title="Filter">
        <Fieldset className="space-y-1">
            <Field>
                <Label className="font-bold">Before Creation:&nbsp;</Label>
                <Input className="input input-bordered" type="date" value={filterProps.before ? filterProps.before : ''}
                    onChange={(e) => setBeforeState(e.target.value)} />
                <Button className="btn btn-primary rounded-l-none" onClick={() => setBeforeState()}>Reset</Button>
            </Field>
            <Field>
                <Label className="font-bold">After Creation:&nbsp;</Label>
                <Input className="input input-bordered" type="date" value={filterProps.after ? filterProps.after : ''}
                    onChange={(e) => setAfterState(e.target.value)} />
                <Button className="btn btn-primary rounded-l-none" onClick={() => setAfterState()}>Reset</Button>
            </Field>
            <Field>
                <Label className="font-bold">Skills:&nbsp;</Label>
                <Input className="input input-bordered rounded-r-none" type="text" value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)} />
                <Button className="btn btn-primary rounded-l-none" onClick={addSkill}>Add Skill</Button>
            </Field>
            <div className="w-full flex flex-row p-4 space-x-2">
                {
                    filterProps.skills.map((skill, index) => {
                        return <TabStopper key={index} text={skill} action={() => removeSkill(index)} />
                    })
                }
            </div>
        </Fieldset>
    </Modal>)
}

function SortModal({ sortProps, setSortProps }: { sortProps: SortModalProps, setSortProps: (props: SortModalProps) => void }) {
    const [sortBy, setSortBy] = useState<SortBy>("title");
    const [sortOrder, setSortOrder] = useState<SortOrder>("ascending");

    const setSortByState = (by: SortBy) => {
        setSortBy(by);
        setSortProps({ ...sortProps, by });
    }

    const setSortOrderState = (order: SortOrder) => {
        setSortOrder(order);
        setSortProps({ ...sortProps, order });
    }

    return (<Modal name="sort_modal" title="Sort">
        <Fieldset className="space-y-1">
            <Field>
                <Label className="font-bold">By: &nbsp;</Label>
                <Select name="sort-by" className="select select-bordered w-full max-w-xs"
                    aria-label="Sort by select"
                    value={sortBy}
                    onChange={e => setSortByState(e.target.value as SortBy)}>
                    <option value="title">Title</option>
                    <option value="createdAt">Created At</option>
                </Select>
            </Field>
            <Field>
                <Label className="font-bold">Order: &nbsp;</Label>
                <Select name="sort-order" className="select select-bordered w-full max-w-xs"
                    aria-label="Sort order select"
                    value={sortOrder}
                    onChange={e => setSortOrderState(e.target.value as SortOrder)}>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </Select>
            </Field>
        </Fieldset>
    </Modal >)
}

function CreateModal() {
    const { user } = useAuthContext();
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");

    async function createScratch() {

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
            console.log("Something went wrong")
        }
    }

    return (
        <Modal name="create_modal" title="Create Resume">
            <div className="flex w-full flex-col">
                <div className="pb-2">
                    <h2 className="text-md font-bold">Enter the job details</h2>
                    <Fieldset className="space-y-1">
                        <Field className="flex flex-row">
                            <Label className="font-bold">Title:&nbsp;</Label>
                            <Input className="input input-bordered flex-1" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                        </Field>
                        <Field className="flex flex-row">
                            <Label className="font-bold">Company:&nbsp;</Label>
                            <Input className="input input-bordered flex-1" type="text" value={company} onChange={e => setCompany(e.target.value)} />
                        </Field>
                        <Field className="flex flex-row">
                            <Label className="font-bold">Start Date:&nbsp;</Label>
                            <Input className="input input-bordered flex-1" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                        </Field>
                        <Field className="flex flex-row">
                            <Label className="font-bold">End Date:&nbsp;</Label>
                            <Input className="input input-bordered flex-1" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                        </Field>
                        <Field className="flex flex-col">
                            <Label className="font-bold">Description:&nbsp;</Label>
                            <Textarea className="input input-bordered h-20" value={description} onChange={e => setDescription(e.target.value)} />
                        </Field>
                    </Fieldset>
                </div>
                <div className="flex-row flex-1 flex">
                    <div className="card bg-base-300 rounded-box grid h-32 flex-grow place-items-center">Create with AI</div>
                    <div className="divider lg:divider-horizontal">OR</div>
                    <div className="card bg-base-300 rounded-box grid h-32 flex-grow place-items-center cursor-pointer hover:bg-base-200" onClick={createScratch}>Create from scratch</div>
                </div>
            </div>
        </Modal>
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

                <Button className="btn btn-primary" onClick={() => showModal('create_modal')}>Create</Button>
                <CreateModal />
            </div>
            <div className="w-full flex flex-row p-4 space-x-2">
                {searchValue.length > 0 && <TabStopper text={searchValue} action={() => setSearchValue("")} />}
                {filterProps.before &&
                    <TabStopper
                        text={`Before: ${formatDate(filterProps.before)}`}
                        action={() => setFilterProps({ ...filterProps, before: undefined })} />
                }
                {filterProps.after &&
                    <TabStopper
                        text={`After: ${formatDate(filterProps.after)}`}
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