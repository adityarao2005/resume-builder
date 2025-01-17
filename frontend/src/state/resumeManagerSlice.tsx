import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FilterModalProps, IResumeEntry, ResumeManagerState, SearchingProps, SortModalProps } from '@/models/resume-manager'

export const initialState: ResumeManagerState = {
    entries: [],
    view: [],
    idToken: '',
    sortProps: { by: "title", order: "ascending" },
    filterProps: { skills: [] },
    searchProps: { query: "" }
};


const compareStringDates = (dateStrA: string, dateStrB: string): number => {
    const partsA = dateStrA.split('-').map(Number);
    const partsB = dateStrB.split('-').map(Number);

    // Compare year
    if (partsA[0] !== partsB[0]) return partsA[0] - partsB[0];
    // Compare month
    if (partsA[1] !== partsB[1]) return partsA[1] - partsB[1];
    // Compare day
    return partsA[2] - partsB[2];
};

function generateView(state: ResumeManagerState) {
    let entries = state.entries;

    // Apply search
    if (state.searchProps) {
        // Get the search value
        const searchValue = state.searchProps.query;
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
    if (state.filterProps) {
        // Get the filter values
        const { before, after, skills } = state.filterProps;


        // Filter entries based on filter values
        entries = entries
            .filter(entry =>
            (!before || compareStringDates(entry.createdAt, before) < 0 &&
                (!after || compareStringDates(entry.createdAt, after) > 0 &&
                    skills.every(skill => entry.skills.includes(skill))
                )))

    }

    // Apply sort
    if (state.sortProps) {
        // Get the sort values
        const { by, order } = state.sortProps;
        // Sort entries based on sort values
        entries = entries.sort((a, b) => {
            if (by === "title") {
                return order === "ascending" ?
                    a.job.title.localeCompare(b.job.title) :
                    b.job.title.localeCompare(a.job.title);
            } else {
                return order === "ascending" ?
                    compareStringDates(a.createdAt, b.createdAt) :
                    compareStringDates(b.createdAt, a.createdAt)
            }
        });
    }

    state.view = entries;
}

export const resumeManagerSlice = createSlice({
    name: 'resume-manager',
    initialState,
    reducers: {
        setIdToken: (state, action: PayloadAction<string>) => {
            state.idToken = action.payload;
        },
        setEntries: (state, action: PayloadAction<IResumeEntry[]>) => {
            state.entries = action.payload;
            generateView(state);
        },
        setSortProps: (state, action: PayloadAction<SortModalProps>) => {
            state.sortProps = action.payload;
            generateView(state);
        },
        setFilterProps: (state, action: PayloadAction<FilterModalProps>) => {
            state.filterProps = action.payload;
            generateView(state);
        },
        setSearchProps: (state, action: PayloadAction<SearchingProps>) => {
            state.searchProps = action.payload;
            generateView(state);
        }
    }
});

export const { setIdToken, setEntries, setSortProps, setFilterProps, setSearchProps } = resumeManagerSlice.actions;
export default resumeManagerSlice.reducer;

