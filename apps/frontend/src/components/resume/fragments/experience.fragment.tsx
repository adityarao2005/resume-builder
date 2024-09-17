"use client"
import { Common, Resume } from "@/models/types";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Button, Field, Fieldset } from "@headlessui/react";
import 'react-international-phone/style.css';
import AddressEditor from "@/components/editor/addressEditor";
import DescriptionEditor from "@/components/editor/descriptionEditor";
import { setExperiences } from "@/state/resumeSlice";
import Collapsable, { DraggableCollapsable } from "@/components/editor/collapsableContainer";
import { formatDate } from "@/components/formatDate";
import { IDragAndDrop, useDragAndDrop } from "@/components/dnd";
import Editor from "@/components/editor/editor";

function ExperienceEntryFragment({ entry, index, dragEnd, dragEnter, dragStart }: { entry: Resume.IExperience, index: number } & IDragAndDrop) {
    const experiences = useAppSelector((state) => state.resume.experiences);
    const dispatch = useAppDispatch();

    // Set address
    const setAddress = (address: Common.IAddress) => {
        const copy = experiences ? [...experiences] : [];
        copy[index] = { ...copy[index], location: address };
        dispatch(setExperiences(copy));
    }

    // Set start date
    const setStartDate = (date: string) => {
        const copy = experiences ? [...experiences] : [];
        copy[index] = { ...copy[index], duration: { ...copy[index].duration, start: new Date(date) } };
        dispatch(setExperiences(copy));
    }

    // Set end date
    const setEndDate = (date: string) => {
        const copy = experiences ? [...experiences] : [];
        copy[index] = { ...copy[index], duration: { ...copy[index].duration, end: new Date(date) } };
        dispatch(setExperiences(copy));
    }

    // Set company
    const setCompany = (company: string) => {
        const copy = experiences ? [...experiences] : [];
        copy[index] = { ...copy[index], company: company };
        dispatch(setExperiences(copy));
    }

    // Set title
    const setTitle = (title: string) => {
        const copy = experiences ? [...experiences] : [];
        copy[index] = { ...copy[index], title: title };
        dispatch(setExperiences(copy));
    }

    // Set description
    const setDescription = (description: Common.IDescription) => {
        const copy = experiences ? [...experiences] : [];
        copy[index] = { ...copy[index], description: description };
        dispatch(setExperiences(copy));
    }

    // Remove experience
    const removeExperience = () => {
        const copy = experiences ? [...experiences] : [];
        copy.splice(index, 1);
        dispatch(setExperiences(copy));
    }

    return (<Editor title={`${entry.title} at ${entry.company}`}
        dragEnd={dragEnd} dragEnter={dragEnter} dragStart={dragStart} destructor={removeExperience}>
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
                // Start date input
            }
            <Field>
                <label className="font-bold">Start Date:</label>
                <input
                    className="input input-bordered w-full"
                    type="date"
                    value={formatDate(entry.duration.start)} onChange={(source) => setStartDate(source.target.value)} />
            </Field>
            {
                // End date input
            }
            <Field>
                <label className="font-bold">End Date:</label>
                <input
                    className="input input-bordered w-full"
                    type="date"
                    value={formatDate(entry.duration.end)} onChange={(source) => setEndDate(source.target.value)} />
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

            {
                // Remove button
            }
            <div>
                <Button className="btn bg-base-100 shadow-md w-full" onClick={removeExperience}>Remove Experience</Button>
            </div>
        </Fieldset>
    </Editor>)
}

export default function ExperienceFragment() {
    const experiences = useAppSelector((state) => state.resume.experiences);
    const dispatch = useAppDispatch();

    // Add experience
    const addExperience = () => {
        const copy = experiences ? [...experiences] : [];
        copy.push({
            company: '',
            title: '',
            description: { lines: [] },
            duration: { start: new Date(), end: new Date() },
            location: { city: '', country: 'ca' },
        });
        dispatch(setExperiences(copy));
    }

    const { dragEnter, dragEnd, dragStart } = useDragAndDrop(experiences, (e) => dispatch(setExperiences(e)));

    return (
        <Collapsable title="Experience">
            <Button className="btn bg-base-100 shadow-md w-full" onClick={addExperience}>Add Experience</Button>
            {experiences.map((entry, index) => <ExperienceEntryFragment key={index} entry={entry} index={index}
                dragEnter={e => dragEnter(e, index)}
                dragEnd={dragEnd}
                dragStart={e => dragStart(e, index)} />)}
        </Collapsable>
    )
}
