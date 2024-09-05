"use client"
import { Common, Resume } from "@/models/types";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Button, Description, Field, Fieldset } from "@headlessui/react";
import 'react-international-phone/style.css';
import AddressEditor from "@/components/resume/editor/addressEditor";
import DescriptionEditor from "@/components/resume/editor/descriptionEditor";
import { setExperiences } from "@/state/resumeSlice";
import CourseEditor from "../coursesEditor";

function ExperienceEntryFragment({ entry, index }: { entry: Resume.IExperience, index: number }) {
    const experiences = useAppSelector((state) => state.resume.experiences);
    const dispatch = useAppDispatch();

    const setAddress = (address: Common.IAddress) => {
        const copy = experiences ? [...experiences] : [];
        copy[index] = { ...copy[index], location: address };
        dispatch(setExperiences(copy));
    }

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const setStartDate = (date: string) => {
        const copy = experiences ? [...experiences] : [];
        copy[index] = { ...copy[index], duration: { ...copy[index].duration, start: new Date(date) } };
        dispatch(setExperiences(copy));
    }

    const setEndDate = (date: string) => {
        const copy = experiences ? [...experiences] : [];
        copy[index] = { ...copy[index], duration: { ...copy[index].duration, end: new Date(date) } };
        dispatch(setExperiences(copy));
    }

    const setCompany = (company: string) => {
        const copy = experiences ? [...experiences] : [];
        copy[index] = { ...copy[index], company: company };
        dispatch(setExperiences(copy));
    }

    const setTitle = (title: string) => {
        const copy = experiences ? [...experiences] : [];
        copy[index] = { ...copy[index], title: title };
        dispatch(setExperiences(copy));
    }

    const setDescription = (description: Common.IDescription) => {
        const copy = experiences ? [...experiences] : [];
        copy[index] = { ...copy[index], description: description };
        dispatch(setExperiences(copy));
    }


    const removeExperience = () => {
        const copy = experiences ? [...experiences] : [];
        copy.splice(index, 1);
        dispatch(setExperiences(copy));
    }

    return (<div className="border border-black rounded p-2">
        <Fieldset className="space-y-2">
            <Field>
                <label className="font-bold">Company:</label>
                <input className="input input-bordered w-full" value={entry.company} onChange={(source) => setCompany(source.target.value)} />
            </Field>
            <Field>
                <label className="font-bold">Title:</label>
                <input className="input input-bordered w-full" value={entry.title} onChange={(source) => setTitle(source.target.value)} />
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

            <div className="space-y-1">
                <label className="font-bold">Description:</label>
                <DescriptionEditor description={entry.description} setDescription={setDescription} />
            </div>

            <div>
                <Button className="btn bg-base-100 shadow-md w-full" onClick={removeExperience}>Remove Experience</Button>
            </div>
        </Fieldset>
    </div>)
}

export default function ExperienceFragment() {
    const experiences = useAppSelector((state) => state.resume.experiences);
    const dispatch = useAppDispatch();

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

    return (
        <details className="collapse collapse-arrow border-base-300 border bg-base-200 shadow-md">
            <summary className="collapse-title text-xl font-bold">Experience</summary>
            <div className="collapse-content space-y-2">
                <Button className="btn bg-base-100 shadow-md w-full" onClick={addExperience}>Add Experience</Button>
                {experiences && experiences.map((entry, index) => <ExperienceEntryFragment key={index} entry={entry} index={index} />)}
            </div>
        </details>
    )
}
