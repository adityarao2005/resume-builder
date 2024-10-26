"use client"
import { useAppDispatch, useAppSelector } from "@/state/store";
import { setName } from "@/state/resumeSlice";
import Collapsable from "@/components/editor/collapsableContainer";
import { useResumeDataSelector } from "@/state/resumeSelectors";
import { useEffect, useState } from "react";

export default function NameFragment() {
    const name = useResumeDataSelector((state) => state.name);
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("Name: " + name)
    }, [name])

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