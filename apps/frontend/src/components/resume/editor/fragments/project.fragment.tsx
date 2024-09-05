"use client"
import { Common, Resume } from "@/models/types";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Button, Field, Fieldset } from "@headlessui/react";
import 'react-international-phone/style.css';
import DescriptionEditor from "@/components/resume/editor/descriptionEditor";
import { setProjects } from "@/state/resumeSlice";

function ProjectsEntryFragment({ entry, index }: { entry: Resume.IProject, index: number }) {
    const projects = useAppSelector((state) => state.resume.projects);
    const dispatch = useAppDispatch();

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const setStartDate = (date: string) => {
        const copy = projects ? [...projects] : [];
        copy[index] = { ...copy[index], duration: { ...copy[index].duration, start: new Date(date) } };
        dispatch(setProjects(copy));
    }

    const setEndDate = (date: string) => {
        const copy = projects ? [...projects] : [];
        copy[index] = { ...copy[index], duration: { ...copy[index].duration, end: new Date(date) } };
        dispatch(setProjects(copy));
    }

    const setTitle = (title: string) => {
        const copy = projects ? [...projects] : [];
        copy[index] = { ...copy[index], title: title };
        dispatch(setProjects(copy));
    }

    const setDescription = (description: Common.IDescription) => {
        const copy = projects ? [...projects] : [];
        copy[index] = { ...copy[index], description: description };
        dispatch(setProjects(copy));
    }


    const removeProject = () => {
        const copy = projects ? [...projects] : [];
        copy.splice(index, 1);
        dispatch(setProjects(copy));
    }

    return (<div className="border border-black rounded p-2">
        <Fieldset className="space-y-2">
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

            <div className="space-y-1">
                <label className="font-bold">Description:</label>
                <DescriptionEditor description={entry.description} setDescription={setDescription} />
            </div>

            <div>
                <Button className="btn bg-base-100 shadow-md w-full" onClick={removeProject}>Remove Projects</Button>
            </div>
        </Fieldset>
    </div>)
}

export default function ProjectFragment() {
    const projects = useAppSelector((state) => state.resume.projects);
    const dispatch = useAppDispatch();

    const addExperience = () => {
        const copy = projects ? [...projects] : [];
        copy.push({
            title: '',
            description: { lines: [] },
            duration: { start: new Date(), end: new Date() },
        });
        dispatch(setProjects(copy));
    }

    return (
        <details className="collapse collapse-arrow border-base-300 border bg-base-200 shadow-md">
            <summary className="collapse-title text-xl font-bold">Projects</summary>
            <div className="collapse-content space-y-2">
                <Button className="btn bg-base-100 shadow-md w-full" onClick={addExperience}>Add Projects</Button>
                {projects.map((entry, index) => <ProjectsEntryFragment key={index} entry={entry} index={index} />)}
            </div>
        </details>
    )
}
