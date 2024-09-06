"use client"
import { setHobbies } from "@/state/resumeSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Fieldset, Field, Button, Label, Input } from "@headlessui/react";
import Collapsable from "@/components/resume/editor/collapsableContainer";
import AddButton from "@/components/resume/editor/addbutton";

// Hobbies Fragment
export interface IHobbiesEditorProps {
    description: string[],
    setDescription: (description: string[]) => void
}

// Lines
export function Lines({ description, setDescription }: IHobbiesEditorProps) {
    // Return lines view model
    return description.map((line, index) => (
        <Field key={index} className="flex flex-col">
            <Label className="font-bold">Line {index + 1}:</Label>
            <div className="flex flex-row">
                {
                    // Line input
                }
                <Input
                    className="input input-bordered rounded-r-none flex-1"
                    value={line}
                    onChange={(source) => {
                        const lines = [...description];
                        lines[index] = source.target.value;
                        setDescription(lines);
                    }}
                    placeholder="Enter a line" />
                {
                    // Remove button
                }
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

// Description Editor
export function DescriptionEditor({ description, setDescription }: IHobbiesEditorProps) {
    return (
        <>
            <AddButton<string> data={description} setData={setDescription} title="Hobby" sample="" />
            <Lines description={description} setDescription={setDescription} />
        </>
    );
}

export default function HobbiesFragment() {
    const description = useAppSelector((state) => state.resume.hobbies);
    const dispatch = useAppDispatch();

    // Set hobbies
    const setDescription = (description: string[]) => {
        dispatch(setHobbies(description));
    }

    return (
        <Collapsable title="Hobbies">
            <Fieldset className="space-y-2 flex-1">
                <DescriptionEditor description={description} setDescription={setDescription} />
            </Fieldset>
        </Collapsable>
    )
}
