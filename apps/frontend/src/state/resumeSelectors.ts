import { Resume } from "@/models/types";
import { RootState, useAppDispatch, useAppSelector } from "./store";

export function useResumeDataSelector<T>(stateSelector: (state: Resume.ResumeData) => T): T {
    return useAppSelector((state) => stateSelector(state.resume.data)); // This will return the resume state
}
