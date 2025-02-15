"use client"
import { Common, Resume } from "@/models/types";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Button, Field, Fieldset } from "@headlessui/react";
import 'react-international-phone/style.css';
import AddressEditor from "@/components/editor/addressEditor";
import DescriptionEditor from "@/components/editor/descriptionEditor";
import { setExtraCurriculars } from "@/state/resumeSlice";
import Collapsable, { DraggableCollapsable } from "@/components/editor/collapsableContainer";
import { formatDate } from "@/components/formatDate";
import { IDragAndDrop, useDragAndDrop } from "@/components/dnd";
import Editor from "@/components/editor/editor";
import { useResumeDataSelector } from "@/state/hooks";

// Extra Curriculars Entry Fragment
function ExtraCurricularFragment({ entry, index, dragEnd, dragEnter, dragStart }:
    { entry: Resume.IExperience, index: number } & IDragAndDrop) {
    const extraCurriculars = useResumeDataSelector((state) => state.extraCurriculars);
    const dispatch = useAppDispatch();

    // Set address
    const setAddress = (address: Common.IAddress) => {
        const copy = extraCurriculars ? [...extraCurriculars] : [];
        copy[index] = { ...copy[index], location: address };
        dispatch(setExtraCurriculars(copy));
    }

    // Set start date
    const setStartDate = (date: string) => {
        const copy = extraCurriculars ? [...extraCurriculars] : [];
        copy[index] = { ...copy[index], duration: { ...copy[index].duration, start: date } };
        dispatch(setExtraCurriculars(copy));
    }

    // Set end date
    const setEndDate = (date: string) => {
        const copy = extraCurriculars ? [...extraCurriculars] : [];
        copy[index] = { ...copy[index], duration: { ...copy[index].duration, end: date } };
        dispatch(setExtraCurriculars(copy));
    }

    // Set company
    const setCompany = (company: string) => {
        const copy = extraCurriculars ? [...extraCurriculars] : [];
        copy[index] = { ...copy[index], company: company };
        dispatch(setExtraCurriculars(copy));
    }

    // Set title
    const setTitle = (title: string) => {
        const copy = extraCurriculars ? [...extraCurriculars] : [];
        copy[index] = { ...copy[index], title: title };
        dispatch(setExtraCurriculars(copy));
    }

    // Set description
    const setDescription = (description: Common.IDescription) => {
        const copy = extraCurriculars ? [...extraCurriculars] : [];
        copy[index] = { ...copy[index], description: description };
        dispatch(setExtraCurriculars(copy));
    }

    // Remove extra curriculars
    const removeExtraCurriculars = () => {
        const copy = extraCurriculars ? [...extraCurriculars] : [];
        copy.splice(index, 1);
        dispatch(setExtraCurriculars(copy));
    }

    return (<Editor title={`${entry.title} at ${entry.company}`}
        dragEnd={dragEnd} dragEnter={dragEnter} dragStart={dragStart} destructor={removeExtraCurriculars}>
        <Fieldset className="space-y-2">
            {
                // Company input
            }
            <Field>
                <label className="font-bold">Company:</label>
                <input className="input input-bordered w-full" value={entry.company} onChange={(source) => setCompany(source.target.value)} />
            </Field>
            {
                // Title input
            }
            <Field>
                <label className="font-bold">Title:</label>
                <input className="input input-bordered w-full" value={entry.title} onChange={(source) => setTitle(source.target.value)} />
            </Field>
            {
                // Start Date input
            }
            <Field>
                <label className="font-bold">Start Date:</label>
                <input
                    className="input input-bordered w-full"
                    type="date"
                    value={entry.duration.start} onChange={(source) => setStartDate(source.target.value)} />
            </Field>
            {
                // End Date input
            }
            <Field>
                <label className="font-bold">End Date:</label>
                <input
                    className="input input-bordered w-full"
                    type="date"
                    value={entry.duration.end} onChange={(source) => setEndDate(source.target.value)} />
            </Field>
            {
                // Address input
            }
            <AddressEditor address={entry.location} setAddress={setAddress} />

            {
                // Description input
            }
            <div className="space-y-1">
                <label className="font-bold">Description:</label>
                <DescriptionEditor description={entry.description} setDescription={setDescription} />
            </div>
        </Fieldset>
    </Editor>)
}

export default function ECFragment() {
    const extraCurriculars = useResumeDataSelector((state) => state.extraCurriculars);
    const dispatch = useAppDispatch();

    // Add extra curriculars
    const addExtraCurriculars = () => {
        const copy = extraCurriculars ? [...extraCurriculars] : [];
        copy.push({
            company: '',
            title: '',
            description: [],
            duration: { start: formatDate(new Date()), end: formatDate(new Date()) },
            location: { city: '', country: 'ca' },
        });
        dispatch(setExtraCurriculars(copy));
    }

    const { dragEnter, dragEnd, dragStart } = useDragAndDrop(extraCurriculars, (e) => dispatch(setExtraCurriculars(e)));


    return (
        <Collapsable title="Extra Curriculars">
            <Button className="btn bg-base-100 shadow-md w-full" onClick={addExtraCurriculars}>Add Extra Curriculars</Button>
            {extraCurriculars.map((entry, index) => <ExtraCurricularFragment key={index}
                entry={entry} index={index}
                dragEnter={e => dragEnter(e, index)}
                dragEnd={dragEnd}
                dragStart={e => dragStart(e, index)} />)}
        </Collapsable>
    )
}
