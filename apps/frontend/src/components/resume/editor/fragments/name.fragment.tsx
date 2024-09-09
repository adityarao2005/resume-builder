"use client"
import { useAppDispatch, useAppSelector } from "@/state/store";
import { setName } from "@/state/resumeSlice";
import Collapsable from "@/components/resume/editor/collapsableContainer";

export default function NameFragment() {
    const name = useAppSelector((state) => state.resume.name);
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