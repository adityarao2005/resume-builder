import { Resume } from "@/models/types";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";

// Resume entry interface
export interface IResumeEntry {
    job: {
        summary: string;
        title: string;
        description: string;
    };
    documentId?: string;
    createdAt: Date;
    skills: string[];
}

// Sorting props
export type SortBy = "title" | "createdAt";
export type SortOrder = "ascending" | "descending";

export interface SortModalProps {
    by: SortBy;
    order: SortOrder;
}

// Filtering props
export interface FilterModalProps {
    before?: Date;
    after?: Date;
    skills: string[];
}

export interface SearchingProps {
    query: string;
}

export class ResumeManager {
    // Entries that are fetched from the server
    entries: IResumeEntry[];
    // Viewable entries based on sort, filter, and search
    readonly view: IResumeEntry[];
    // Set view
    private setView: (view: IResumeEntry[]) => void;
    // JWT token
    idToken: string;

    // Sort, filter, and search props - these are used to filter the entries and populate view
    private sortProps?: SortModalProps;
    private filterProps?: FilterModalProps;
    private searchProps?: SearchingProps;

    constructor(entries: IResumeEntry[], view: IResumeEntry[], setView: (view: IResumeEntry[]) => void) {
        this.entries = entries;
        this.view = view;
        this.setView = setView;
        this.idToken = "";

    }


    async deleteEntry(documentId: string) {
        // Delete entry from server
        const response = await fetch(`/api/resume/${documentId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${this.idToken}`
            }
        });

        // If failed then log error
        if (!response.ok) {
            console.error("Failed to delete resume entry");
            return;
        }

        // Remove entry from entries
        this.entries = this.entries.filter((entry) => entry.documentId !== documentId);
        // Apply filters and generate view
        this.generateView();
    }

    generateView() {
        // Start with all entries 
        let entries = this.entries;

        console.log(entries)

        // Apply search
        if (this.searchProps) {
            // Get the search value
            const searchValue = this.searchProps.query;
            // Filter entries based on search value
            entries = entries
                .filter(entry =>
                    entry.job.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                    entry.job.summary.toLowerCase().includes(searchValue.toLowerCase()) ||
                    entry.job.description.toLowerCase().includes(searchValue.toLowerCase()) ||
                    entry.skills.map((e) =>
                        e.toLowerCase().includes(searchValue.toLowerCase())
                    ).reduce((a, b) => a || b, false)
                )
        }

        // Apply filters
        if (this.filterProps) {
            // Get the filter values
            const { before, after, skills } = this.filterProps;
            // Filter entries based on filter values
            entries = entries
                .filter(entry =>
                    (!before || entry.createdAt.getTime() < before.getTime()) &&
                    (!after || entry.createdAt.getTime() > after.getTime()) &&
                    skills.every(skill => entry.skills.includes(skill))
                )

        }

        // Apply sort
        if (this.sortProps) {
            // Get the sort values
            const { by, order } = this.sortProps;
            // Sort entries based on sort values
            entries = entries.sort((a, b) => {
                if (by === "title") {
                    return order === "ascending" ?
                        a.job.title.localeCompare(b.job.title) :
                        b.job.title.localeCompare(a.job.title);
                } else {
                    return order === "ascending" ?
                        a.createdAt.getTime() - b.createdAt.getTime() :
                        b.createdAt.getTime() - a.createdAt.getTime();
                }
            });
        }

        // Set the view
        this.setView(entries);

    }

    setSortProps(sortProps?: SortModalProps) {
        this.sortProps = sortProps;
        this.generateView();
    }

    setFilterProps(filterProps?: FilterModalProps) {
        this.filterProps = filterProps;
        this.generateView();
    }

    setSearchProps(searchProps?: SearchingProps) {
        this.searchProps = searchProps;
        this.generateView();
    }
}

// export interface IResumeManagerParams {
//     view: IResumeEntry[];
//     setView: (view: IResumeEntry[]) => void;
//     entries: IResumeEntry[];
//     setEntries: (entries: IResumeEntry[]) => void;
// }

// export class ResumeManager {
//     readonly view: IResumeEntry[];
//     private setView: (view: IResumeEntry[]) => void;
//     private entries: IResumeEntry[];
//     private setEntries: (entries: IResumeEntry[]) => void;

//     constructor(params: IResumeManagerParams) {
//         this.view = params.view;
//         this.setView = params.setView;
//         this.entries = params.entries;
//         this.setEntries = params.setEntries;
//     }

//     async init(idToken: string) {

//     }
// }

export const ResumeManagerContext = createContext<ResumeManager>(new ResumeManager([], [], () => { }));
export const useResumeManager = () => useContext(ResumeManagerContext);

export function ResumeManagerProvider({ children }: PropsWithChildren<{}>) {
    const [entries, setEntries] = useState<IResumeEntry[]>([]);
    const [view, setView] = useState<IResumeEntry[]>([]);
    const { user } = useAuthContext();
    const manager = new ResumeManager(entries, view, setView);

    // Initialize the manager
    useEffect(() => {
        manager.entries = entries;
        manager.generateView();
    }, [entries])

    useEffect(() => {
        // Initialize the manager with the user token
        async function init() {

            const idToken = await user?.getIdToken();
            // Fetch resume entries from server
            const response = await fetch("/api/resume", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${idToken}`
                }
            });

            // If failed then log error
            if (!response.ok) {
                console.error("Failed to fetch resume entries");
                return;
            }

            // Parse response and map to IResumeEntry
            const data: Resume.Resume[] = await response.json();
            // Map data to IResumeEntry
            setEntries(data.map((entry) => {
                // Set the summary
                const summary = `${entry.data.name}\'s Resume for ${entry.job.title} at ${entry.job.company} during ${entry.job.duration.start} to ${entry.job.duration.end}. ${entry.job.description.substring(0, 50)}${((entry.job.description.length > 50) ? '...' : '')}`;
                return {
                    job: {
                        summary,
                        title: entry.job.title,
                        description: entry.job.description
                    },
                    skills: entry.data.skills.map((skill) => skill.name),
                    createdAt: new Date(entry.createdAt),
                    documentId: entry.documentId
                };
            }));
        }

        init();
    }, [])

    return (<ResumeManagerContext.Provider value={manager}>
        {children}
    </ResumeManagerContext.Provider>);
}