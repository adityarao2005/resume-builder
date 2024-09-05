"use client"
import DescriptionEditor from "@/components/resume/editor/descriptionEditor";
import { Common } from "@/models/types";
import { setHighlights } from "@/state/resumeSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Fieldset, Field, Switch, Label, Button, Input } from "@headlessui/react";


export default function HoQFragment() {
    const description = useAppSelector((state) => state.resume.highlights);
    const dispatch = useAppDispatch();

    const setDescription = (description: Common.IDescription) => {
        dispatch(setHighlights(description));
    }

    return (
        <details className="collapse collapse-arrow border-base-300 border bg-base-200 shadow-md">
            <summary className="collapse-title text-xl font-bold">Highlights of Qualifications</summary>
            <div className="collapse-content">

                <Fieldset className="space-y-2 flex-1">
                    <Field className="flex">
                        <Label className="font-bold flex-1">Summary:</Label>
                        <Switch className="toggle" checked={description != undefined} onChange={(enabled) => dispatch(setHighlights(enabled ? { lines: [] } : undefined))} />
                    </Field>

                    {description && <DescriptionEditor description={description} setDescription={setDescription} />}
                </Fieldset>
            </div>
        </details>
    )
}
