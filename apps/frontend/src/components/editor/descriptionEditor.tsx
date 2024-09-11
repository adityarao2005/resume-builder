import { Common } from "@/models/types";
import { Field, Label, Button, Input } from "@headlessui/react";

// Description editor props
export interface IDescriptionEditorProps {
    description: Common.IDescription,
    setDescription: (description: Common.IDescription) => void
}

// Add line button
export function AddLineButton({ description, setDescription }: IDescriptionEditorProps) {
    return (
        <Field className="flex">
            <Button
                className="btn bg-base-100 shadow-md flex-1"
                onClick={() => setDescription({ lines: [...description.lines, ''] })}>
                Add Line
            </Button>
        </Field>)
}

// Lines view model
export function Lines({ description, setDescription }: IDescriptionEditorProps) {
    // return line view model list
    return description.lines.map((line, index) => (
        <Field key={index} className="flex flex-col">
            <Label className="font-bold">Line {index + 1}:</Label>
            {
                // Line input
            }
            <div className="flex flex-row">
                <Input
                    className="input input-bordered rounded-r-none flex-1"
                    value={line}
                    onChange={(source) => {
                        const lines = [...description.lines];
                        lines[index] = source.target.value;
                        setDescription({ lines });
                    }}
                    placeholder="Enter a line" />
                <Button
                    className="btn input-bordered rounded-l-none bg-base-300"
                    onClick={() => {
                        const lines = [...description.lines];
                        lines.splice(index, 1);
                        setDescription({ lines });
                    }}>
                    X
                </Button>
            </div>
        </Field>
    ))
}

// Description editor
export default function DescriptionEditor({ description, setDescription }: IDescriptionEditorProps) {
    return (
        <>
            <AddLineButton description={description} setDescription={setDescription} />
            <Lines description={description} setDescription={setDescription} />
        </>
    );
}