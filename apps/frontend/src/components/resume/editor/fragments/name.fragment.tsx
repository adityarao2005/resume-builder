"use client"
import { useAppDispatch, useAppSelector } from "@/state/store";
import { setName } from "@/state/resumeSlice";

export default function NameFragment() {
    const name = useAppSelector((state) => state.resume.name);
    const dispatch = useAppDispatch();

    return (
        <details className="collapse collapse-arrow border-base-300 border bg-base-200 shadow-md">
            <summary className="collapse-title text-xl font-bold">Name</summary>
            <div className="collapse-content">
                <input 
                    type="text"
                    className="input input-bordered"
                    value={name}
                    onChange={(source) => dispatch(setName(source.target.value))}
                    placeholder="Name" />
            </div>
        </details>
    )
}