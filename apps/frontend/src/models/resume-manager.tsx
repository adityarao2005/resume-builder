import { Resume } from "@/models/types";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useAuthContext } from "../components/context/AuthContext";

// Resume entry interface
export interface IResumeEntry {
    job: {
        summary: string;
        title: string;
        description: string;
    };
    documentId?: string;
    createdAt: string;
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
    before?: string;
    after?: string;
    skills: string[];
}

export interface SearchingProps {
    query: string;
}

export interface ResumeManagerState {
    view: IResumeEntry[];
    entries: IResumeEntry[];
    idToken: string;
    sortProps: SortModalProps;
    filterProps: FilterModalProps;
    searchProps: SearchingProps;
}