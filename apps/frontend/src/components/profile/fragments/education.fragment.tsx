"use client"
import { Common, Resume } from "@/models/types";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Button, Field, Fieldset } from "@headlessui/react";
import 'react-international-phone/style.css';
import AddressEditor from "@/components/editor/addressEditor";
import DescriptionEditor from "@/components/editor/descriptionEditor";
import { setEducation } from "@/state/profileSlice";
import CourseEditor from "../../editor/coursesEditor";
import Collapsable, { DraggableCollapsable } from "@/components/editor/collapsableContainer";
import { formatDate } from "@/components/formatDate";
import { IDragAndDrop, useDragAndDrop } from "@/lib/dnd";

function EducationEntryFragment({ entry, index, dragEnd, dragEnter, dragStart }: { entry: Resume.IEducationEntry, index: number } & IDragAndDrop) {
    const education = useAppSelector((state) => state.profile.education);
    const dispatch = useAppDispatch();

    // Set address
    const setAddress = (address: Common.IAddress) => {
        const copy = [...education];
        copy[index] = { ...copy[index], location: address };
        dispatch(setEducation(copy));
    }

    // Set start date
    const setStartDate = (date: string) => {
        const copy = [...education];
        copy[index] = { ...copy[index], duration: { ...copy[index].duration, start: new Date(date) } };
        dispatch(setEducation(copy));
    }

    // Set end date
    const setEndDate = (date: string) => {
        const copy = [...education];
        copy[index] = { ...copy[index], duration: { ...copy[index].duration, end: new Date(date) } };
        dispatch(setEducation(copy));
    }

    // Set institution
    const setInstitution = (institution: string) => {
        const copy = [...education];
        copy[index] = { ...copy[index], institution: institution };
        dispatch(setEducation(copy));
    }

    // Set discipline
    const setQualification = (qualification: string) => {
        const copy = [...education];
        copy[index] = { ...copy[index], qualification: qualification };
        dispatch(setEducation(copy));
    }

    // Set description
    const setDescription = (description: Common.IDescription) => {
        const copy = [...education];
        copy[index] = { ...copy[index], description: description };
        dispatch(setEducation(copy));
    }

    // Set courses
    const setCourses = (courses: string[]) => {
        const copy = [...education];
        copy[index] = { ...copy[index], courses: courses };
        dispatch(setEducation(copy));
    }

    // Remove education
    const removeEducation = () => {
        const copy = [...education];
        copy.splice(index, 1);
        dispatch(setEducation(copy));
    }

    return (<DraggableCollapsable title={entry.qualification} color="bg-base-100"
        dragEnd={dragEnd} dragEnter={dragEnter} dragStart={dragStart}>
        <Fieldset className="space-y-2">
            {
                // Set school input
            }
            <Field>
                <label className="font-bold">School:</label>
                <input className="input input-bordered w-full" value={entry.institution} onChange={(source) => setInstitution(source.target.value)} />
            </Field>
            {
                // Set degree input
            }
            <Field>
                <label className="font-bold">Qualification:</label>
                <input className="input input-bordered w-full" value={entry.qualification} onChange={(source) => setQualification(source.target.value)} />
            </Field>
            {
                // Set start date input
            }
            <Field>
                <label className="font-bold">Start Date:</label>
                <input
                    className="input input-bordered w-full"
                    type="date"
                    value={formatDate(entry.duration.start)} onChange={(source) => setStartDate(source.target.value)} />
            </Field>
            {
                // Set end date input
            }
            <Field>
                <label className="font-bold">End Date:</label>
                <input
                    className="input input-bordered w-full"
                    type="date"
                    value={formatDate(entry.duration.end)} onChange={(source) => setEndDate(source.target.value)} />
            </Field>
            {
                // Set address input
            }
            <AddressEditor address={entry.location} setAddress={setAddress} />

            {
                // Set courses input
            }
            <div className="space-y-2">
                <label className="font-bold">Courses:</label>
                <CourseEditor courses={entry.courses} setCourses={setCourses} />
            </div>

            {
                // Set description input
            }
            <div className="space-y-1">
                <label className="font-bold">Description:</label>
                <DescriptionEditor description={entry.description} setDescription={setDescription} />
            </div>

            {
                // Remove education button
            }
            <div>
                <Button className="btn bg-base-100 shadow-md w-full" onClick={removeEducation}>Remove Education</Button>
            </div>
        </Fieldset>
    </DraggableCollapsable>)
}

export default function EducationFragment() {
    const education = useAppSelector((state) => state.profile.education);
    const dispatch = useAppDispatch();

    // Add education
    const addEducation = () => {
        const copy = [...education];
        copy.push({
            institution: '',
            qualification: '',
            duration: { start: new Date(), end: new Date() },
            location: { city: '', country: 'ca' },
            courses: [],
            description: { lines: [] }
        });
        dispatch(setEducation(copy));
    }

    const { dragEnter, dragEnd, dragStart } = useDragAndDrop(education, (e) => dispatch(setEducation(e)));

    return (
        <Collapsable title="Education" color="bg-base-100">
            <Button className="btn bg-base-100 shadow-md w-full" onClick={addEducation}>Add Education</Button>
            {education.map((entry, index) => <EducationEntryFragment key={index} entry={entry} index={index}
                dragEnter={e => dragEnter(e, index)}
                dragEnd={dragEnd}
                dragStart={e => dragStart(e, index)} />)}
        </Collapsable>
    )
}
