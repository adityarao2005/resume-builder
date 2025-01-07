'use client'
import { useAuthContext } from "@/components/context/AuthContext";
import { formatDate } from "@/components/formatDate";
import Modal, { showModal } from "@/components/modal";
import { FilterModalProps, IResumeEntry, ResumeManagerProvider, SortBy, SortModalProps, SortOrder, useResumeManager } from "@/components/resume/manager";
import SearchBar from "@/components/resume/SearchBar";
import TabStopper from "@/components/resume/TabStopper";
import { Field, Fieldset, Label, Select, Textarea, Input, Button } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


function ResumeEntry({ props }: { props: IResumeEntry }) {

    return (
        <div className="card bg-base-100 w-full max-w-xs shrink-0 shadow-2xl m-2">
            <figure className="bg-base-300">
                <div className="h-52" />
            </figure>
            <div className="card-body">
                <h2 className="card-title"><Link href={"/app/resume/" + props.documentId} className="link">{props.job.title}</Link></h2>
                <p>{props.job.summary}</p>
                <div className="card-actions justify-end">
                    {props.skills.map((skill, index) => <div key={index} className="badge badge-outline">{skill}</div>)}
                </div>
                <div>
                    {props.documentId}
                </div>
            </div>
        </div>
    );
}


function FilterModal({ filterProps, setFilterProps }: { filterProps: FilterModalProps, setFilterProps: (props: FilterModalProps) => void }) {
    const [searchValue, setSearchValue] = useState("");

    const addSkill = () => {
        filterProps.skills.push(searchValue);
        setSearchValue("");
        setFilterProps({ ...filterProps });
    }

    const removeSkill = (index: number) => {
        const list = [...filterProps.skills];
        list.splice(index, 1)
        setFilterProps({ ...filterProps, skills: list });
    }

    const setBeforeState = (before: Date) => {
        setFilterProps({ ...filterProps, before });
    }

    const setAfterState = (after: Date) => {
        setFilterProps({ ...filterProps, after });
    }

    return (<Modal name="filter_modal" title="Filter">
        <Fieldset className="space-y-1">
            <Field>
                <Label className="font-bold">Before:&nbsp;</Label>
                <Input className="input input-bordered" type="date" value={filterProps.before ? formatDate(filterProps.before) : ''}
                    onChange={(e) => setBeforeState(new Date(e.target.value))} />
            </Field>
            <Field>
                <Label className="font-bold">After:&nbsp;</Label>
                <Input className="input input-bordered" type="date" value={filterProps.after ? formatDate(filterProps.after) : ''}
                    onChange={(e) => setAfterState(new Date(e.target.value))} />
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
    const view: IResumeEntry[] = resumeManager.view;
    const [searchValue, setSearchValue] = useState("");
    const [filterProps, setFilterProps] = useState<FilterModalProps>({ skills: [] });
    const [sortProps, setSortProps] = useState<SortModalProps>({ by: "title", order: "ascending" });

    useEffect(() => {
        console.log(view)
    }, [view])

    useEffect(() => {
        resumeManager.setFilterProps(filterProps);
    }, [filterProps])

    useEffect(() => {
        resumeManager.setSortProps(sortProps);
    }, [sortProps])

    useEffect(() => {
        resumeManager.setSearchProps({ query: searchValue });
    }, [searchValue])

    return (<div className="flex-1 flex px-52 bg-base-300">
        <div className="bg-base-100 flex-1 flex flex-col">
            <div className="w-full flex flex-row p-4 space-x-2">
                <div className="flex flex-col h-full align-middle justify-center">Search:</div>
                <SearchBar value={searchValue} onChange={setSearchValue} />

                <Button className="btn btn-primary" onClick={() => showModal('filter_modal')}>Filter</Button>
                <FilterModal filterProps={filterProps} setFilterProps={setFilterProps} />

                <Button className="btn btn-primary" onClick={() => showModal('sort_modal')}>Sort</Button>
                <SortModal sortProps={sortProps} setSortProps={setSortProps} />

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
        <ResumeManagerProvider>
            <Content />
        </ResumeManagerProvider>
    );
}