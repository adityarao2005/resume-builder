"use client"
import { useAppDispatch, useAppSelector } from "@/state/store";
import { setName } from "@/state/resumeSlice";
import Collapsable from "@/components/editor/collapsableContainer";
import { useResumeDataSelector } from "@/state/resumeSelectors";

export default function NameFragment() {
    const name = useResumeDataSelector((state) => state.name);
    const dispatch = useAppDispatch();

    // Render the component
    return (
        <Collapsable title="Name">
            <input
                type="text"
                className="input input-bordered"
                value={name}
                onChange={(source) => dispatch(setName(source.target.value))}
                placeholder="Name" />
        </Collapsable>
    )
}