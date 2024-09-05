"use client"
import { Common, Resume } from "@/models/types";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Button, Description, Field, Fieldset } from "@headlessui/react";
import 'react-international-phone/style.css';
import AddressEditor from "@/components/resume/editor/addressEditor";
import DescriptionEditor from "@/components/resume/editor/descriptionEditor";
import { setEducation } from "@/state/resumeSlice";
import CourseEditor from "../coursesEditor";

function EducationEntryFragment({ entry, index }: { entry: Resume.IEducationEntry, index: number }) {
    const education = useAppSelector((state) => state.resume.education);
    const dispatch = useAppDispatch();

    const setAddress = (address: Common.IAddress) => {
        const copy = [...education];
        copy[index] = { ...copy[index], location: address };
        dispatch(setEducation(copy));
    }

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const setStartDate = (date: string) => {
        const copy = [...education];
        copy[index] = { ...copy[index], duration: { ...copy[index].duration, start: new Date(date) } };
        dispatch(setEducation(copy));
    }

    const setEndDate = (date: string) => {
        const copy = [...education];
        copy[index] = { ...copy[index], duration: { ...copy[index].duration, end: new Date(date) } };
        dispatch(setEducation(copy));
    }

    const setInstitution = (institution: string) => {
        const copy = [...education];
        copy[index] = { ...copy[index], institution: institution };
        dispatch(setEducation(copy));
    }

    const setDegree = (degree: string) => {
        const copy = [...education];
        copy[index] = { ...copy[index], degree: degree };
        dispatch(setEducation(copy));
    }

    const setDiscipline = (discipline: string) => {
        const copy = [...education];
        copy[index] = { ...copy[index], discipline: discipline };
        dispatch(setEducation(copy));
    }

    const setDescription = (description: Common.IDescription) => {
        const copy = [...education];
        copy[index] = { ...copy[index], description: description };
        dispatch(setEducation(copy));
    }

    const setCourses = (courses: string[]) => {
        const copy = [...education];
        copy[index] = { ...copy[index], courses: courses };
        dispatch(setEducation(copy));
    }

    const removeEducation = () => {
        const copy = [...education];
        copy.splice(index, 1);
        dispatch(setEducation(copy));
    }

    return (<div className="border border-black rounded p-2">
        <Fieldset className="space-y-2">
            <Field>
                <label className="font-bold">School:</label>
                <input className="input input-bordered w-full" value={entry.institution} onChange={(source) => setInstitution(source.target.value)} />
            </Field>
            <Field>
                <label className="font-bold">Degree:</label>
                <input className="input input-bordered w-full" value={entry.degree} onChange={(source) => setDegree(source.target.value)} />
            </Field>
            <Field>
                <label className="font-bold">Discipline:</label>
                <input className="input input-bordered w-full" value={entry.discipline} onChange={(source) => setDiscipline(source.target.value)} />
            </Field>
            <Field>
                <label className="font-bold">Start Date:</label>
                <input
                    className="input input-bordered w-full"
                    type="date"
                    value={formatDate(entry.duration.start)} onChange={(source) => setStartDate(source.target.value)} />
            </Field>
            <Field>
                <label className="font-bold">End Date:</label>
                <input
                    className="input input-bordered w-full"
                    type="date"
                    value={formatDate(entry.duration.end)} onChange={(source) => setEndDate(source.target.value)} />
            </Field>
            <AddressEditor address={entry.location} setAddress={setAddress} />

            <div className="space-y-2">
                <label className="font-bold">Courses:</label>
                <CourseEditor courses={entry.courses} setCourses={setCourses} />
            </div>

            <div className="space-y-1">
                <label className="font-bold">Description:</label>
                <DescriptionEditor description={entry.description} setDescription={setDescription} />
            </div>

            <div>
                <Button className="btn bg-base-100 shadow-md w-full" onClick={removeEducation}>Remove Education</Button>
            </div>
        </Fieldset>
    </div>)
}

export default function EducationFragment() {
    const education = useAppSelector((state) => state.resume.education);
    const dispatch = useAppDispatch();

    const addEducation = () => {
        const copy = [...education];
        copy.push({
            institution: '',
            degree: '',
            discipline: '',
            duration: { start: new Date(), end: new Date() },
            location: { city: '', country: 'ca' },
            courses: [],
            description: { lines: [] }
        });
        dispatch(setEducation(copy));
    }

    return (
        <details className="collapse collapse-arrow border-base-300 border bg-base-200 shadow-md">
            <summary className="collapse-title text-xl font-bold">Education</summary>
            <div className="collapse-content space-y-2">
                <Button className="btn bg-base-100 shadow-md w-full" onClick={addEducation}>Add Education</Button>
                {education.map((entry, index) => <EducationEntryFragment key={index} entry={entry} index={index} />)}
            </div>
        </details>
    )
}
