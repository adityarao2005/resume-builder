"use client";
import Modal, { showModal } from "@/components/modal";
import { Input, Button, Field, Fieldset, Label, Select } from "@headlessui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDate } from "@/components/formatDate"

interface ResumeEntry {
    job: {
        summary: string;
        title: string;
        description: string;
    };
    createdAt: Date;
    skills: string[];
}

function ResumeEntry(props: ResumeEntry) {
    return (
        <div className="card bg-base-100 w-full max-w-xs shrink-0 shadow-2xl m-2">
            <figure className="bg-base-300">
                <div className="h-52" />
            </figure>
            <div className="card-body">
                <h2 className="card-title"><Link href="/app/resume/0" className="link">{props.job.title}</Link></h2>
                <p>{props.job.summary}</p>
                <div className="card-actions justify-end">
                    {props.skills.map((skill, index) => <div key={index} className="badge badge-outline">{skill}</div>)}
                </div>
            </div>
        </div>
    );
}

const resumeEntries: ResumeEntry[] = [
    {
        job: {
            summary: "Developed software for a variety of clients.",
            title: "Software Engineer",
            description: "Developed software for a variety of clients."
        },
        skills: ["Java", "C++", "Python", "JavaScript"],
        createdAt: new Date(2022, 1, 1)
    },
    {
        job: {
            summary: "Developed websites for a variety of clients.",
            title: "Web Developer",
            description: "Developed websites for a variety of clients."
        },
        skills: ["HTML", "CSS", "JavaScript", "React"],
        createdAt: new Date(2023, 1, 1)
    },
    {
        job: {
            summary: "Analyzed data for a variety of clients.",
            title: "Data Scientist",
            description: "Analyzed data for a variety of clients."
        },
        skills: ["Python", "R", "SQL", "Excel"],
        createdAt: new Date(2024, 1, 1)
    }
]

function SearchBar({ value, onChange }: { value: string, onChange: (text: string) => void }) {
    return (
        <Field className="input input-bordered flex flex-1 items-center gap-2">
            <Input type="text" className="grow" placeholder="Search" value={value} onChange={(source) => onChange(source.target.value)} />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd" />
            </svg>
        </Field>
    )
}

function TabStopper({ text, action }: { text: string, action: () => void }) {
    return (
        <Button className="btn" onClick={action}>
            ✕
            <div className="badge">{text}</div>
        </Button>
    );
}

interface FilterModalProps {
    before?: Date;
    after?: Date;
    skills: string[];
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

type SortBy = "title" | "createdAt";
type SortOrder = "ascending" | "descending";

interface SortModalProps {
    by: SortBy;
    order: SortOrder;
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
    return (
        <Modal name="create_modal" title="Create">
            <div className="flex w-full flex-col lg:flex-row">
                <div className="card bg-base-300 rounded-box grid h-32 flex-grow place-items-center">Create with AI</div>
                <div className="divider lg:divider-horizontal">OR</div>
                <div className="card bg-base-300 rounded-box grid h-32 flex-grow place-items-center">Create from scratch</div>
            </div>
        </Modal>
    )
}

export default function Page() {
    const initialState = resumeEntries;

    const [entries, setEntries] = useState(initialState);
    const [searchValue, setSearchValue] = useState("");
    const [filterProps, setFilterProps] = useState<FilterModalProps>({ skills: [] });
    const [sortProps, setSortProps] = useState<SortModalProps>({ by: "title", order: "ascending" });

    // Filter entries based on search query & filter queries & sort queries
    const generateEntries = () => {
        let entries = initialState;

        // search
        entries = entries
            .filter(entry =>
                entry.job.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                entry.job.summary.toLowerCase().includes(searchValue.toLowerCase()) ||
                entry.job.description.toLowerCase().includes(searchValue.toLowerCase()) ||
                entry.skills.map((e) =>
                    e.toLowerCase().includes(searchValue.toLowerCase())
                ).reduce((a, b) => a || b)
            )

        // filter
        if (filterProps.before) {
            entries = entries.filter(entry => entry.createdAt < filterProps.before!);
        }
        if (filterProps.after) {
            entries = entries.filter(entry => entry.createdAt > filterProps.after!);
        }
        if (filterProps.skills.length > 0) {
            entries = entries.filter(entry =>
                entry.skills.map((e) =>
                    filterProps.skills.includes(e)
                ).reduce((a, b) => a || b)
            );
        }

        // sort
        entries = entries.sort((a, b) => {
            if (sortProps.by === 'title') {
                return sortProps.order === 'ascending' ?
                    a.job.title.localeCompare(b.job.title) :
                    b.job.title.localeCompare(a.job.title);
            } else {
                return sortProps.order === 'ascending' ?
                    a.createdAt.getTime() - b.createdAt.getTime() :
                    b.createdAt.getTime() - a.createdAt.getTime();
            }
        })

        setEntries(entries);
    }

    // Search for entries based on query
    const search = (query: string) => {
        setSearchValue(query);
    }

    const filter = (filterProps: FilterModalProps) => {
        setFilterProps(filterProps);
    }

    const sort = (sortProps: SortModalProps) => {
        setSortProps(sortProps);
    }

    useEffect(() => {
        generateEntries();
    }, [searchValue, filterProps, sortProps]);

    return (<div className="flex-1 flex px-52 bg-base-300">
        <div className="bg-base-100 flex-1 flex flex-col">
            <div className="w-full flex flex-row p-4 space-x-2">
                <div className="flex flex-col h-full align-middle justify-center">Search:</div>
                <SearchBar value={searchValue} onChange={search} />

                <Button className="btn btn-primary" onClick={() => showModal('filter_modal')}>Filter</Button>
                <FilterModal filterProps={filterProps} setFilterProps={filter} />

                <Button className="btn btn-primary" onClick={() => showModal('sort_modal')}>Sort</Button>
                <SortModal sortProps={sortProps} setSortProps={sort} />

                <Button className="btn btn-primary" onClick={() => showModal('create_modal')}>Create</Button>
                <CreateModal />
            </div>
            <div className="w-full flex flex-row p-4 space-x-2">
                {searchValue.length > 0 && <TabStopper text={searchValue} action={() => search("")} />}
                {filterProps.before &&
                    <TabStopper
                        text={`Before: ${formatDate(filterProps.before)}`}
                        action={() => filter({ ...filterProps, before: undefined })} />
                }
                {filterProps.after &&
                    <TabStopper
                        text={`After: ${formatDate(filterProps.after)}`}
                        action={() => filter({ ...filterProps, after: undefined })} />
                }
                {
                    filterProps.skills.map((skill, index) => {
                        const list = [...filterProps.skills];
                        list.splice(index, 1)
                        return <TabStopper key={index} text={skill} action={() => filter({ ...filterProps, skills: list })} />
                    })
                }
                <TabStopper text={`Sort by: ${sortProps.by} (${sortProps.order})`} action={() => sort({ order: 'ascending', by: 'title' })} />
            </div>
            <div className="flex flex-wrap p-4">
                {entries.map((entry, index) => <ResumeEntry key={index} {...entry} />)}
            </div>
        </div>
    </div>);
}