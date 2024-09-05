"use client"
import { Common } from "@/models/types";
import { setHobbies } from "@/state/resumeSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Fieldset, Field, Button, Label, Input } from "@headlessui/react";

export interface IDescriptionEditorProps {
    description: string[],
    setDescription: (description: string[]) => void
}


export function AddLineButton({ description, setDescription }: IDescriptionEditorProps) {
    return (
        <Field className="flex">
            <Button
                className="btn bg-base-100 shadow-md flex-1"
                onClick={() => setDescription([...description, ''])}>
                Add Hobby
            </Button>
        </Field>)
}

export function Lines({ description, setDescription }: IDescriptionEditorProps) {
    return description.map((line, index) => (
        <Field key={index} className="flex flex-col">
            <Label className="font-bold">Line {index + 1}:</Label>
            <div className="flex flex-row">
                <Input
                    className="input input-bordered rounded-r-none flex-1"
                    value={line}
                    onChange={(source) => {
                        const lines = [...description];
                        lines[index] = source.target.value;
                        setDescription(lines);
                    }}
                    placeholder="Enter a line" />
                <Button
                    className="btn input-bordered rounded-l-none bg-base-300"
                    onClick={() => {
                        const lines = [...description];
                        lines.splice(index, 1);
                        setDescription(lines);
                    }}>
                    X
                </Button>
            </div>
        </Field>
    ))
}

export function DescriptionEditor({ description, setDescription }: IDescriptionEditorProps) {
    return (
        <>
            <AddLineButton description={description} setDescription={setDescription} />
            <Lines description={description} setDescription={setDescription} />
        </>
    );
}

export default function HobbiesFragment() {
    const description = useAppSelector((state) => state.resume.hobbies);
    const dispatch = useAppDispatch();

    const setDescription = (description: string[]) => {
        dispatch(setHobbies(description));
    }

    return (
        <details className="collapse collapse-arrow border-base-300 border bg-base-200 shadow-md">
            <summary className="collapse-title text-xl font-bold">Hobbies</summary>
            <div className="collapse-content">
                <Fieldset className="space-y-2 flex-1">
                    {<DescriptionEditor description={description} setDescription={setDescription} />}
                </Fieldset>
            </div>
        </details>
    )
}
