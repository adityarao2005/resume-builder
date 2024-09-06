"use client"
import DescriptionEditor from "@/components/resume/editor/descriptionEditor";
import { Common } from "@/models/types";
import { setHighlights } from "@/state/resumeSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Fieldset } from "@headlessui/react";
import Collapsable from "@/components/resume/editor/collapsableContainer";


export default function HoQFragment() {
    const description = useAppSelector((state) => state.resume.highlights);
    const dispatch = useAppDispatch();

    // Set the description
    const setDescription = (description: Common.IDescription) => {
        dispatch(setHighlights(description));
    }

    // Render the component
    return (
        <Collapsable title="Highlights of Qualifications">
            <Fieldset className="space-y-2 flex-1">
                <DescriptionEditor description={description} setDescription={setDescription} />
            </Fieldset>
        </Collapsable>
    )
}
