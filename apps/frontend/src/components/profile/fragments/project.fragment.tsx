"use client"
import { Common, Resume, Profile } from "@/models/types";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Button, Field, Fieldset } from "@headlessui/react";
import 'react-international-phone/style.css';
import DescriptionEditor from "@/components/editor/descriptionEditor";
import { setProjects } from "@/state/profileSlice";
import { formatDate } from "@/components/formatDate";
import { SkillsEditor } from "@/components/resume/fragments/skills.fragment";

function ProjectsEntryFragment({ entry, index }: { entry: Profile.IProfileProject, index: number }) {
    const projects = useAppSelector((state) => state.profile.projects);
    const dispatch = useAppDispatch();

    // Set start date
    const setStartDate = (date: string) => {
        const copy = projects ? [...projects] : [];
        copy[index] = { ...copy[index], duration: { ...copy[index].duration, start: new Date(date) } };
        dispatch(setProjects(copy));
    }

    // Set end date
    const setEndDate = (date: string) => {
        const copy = projects ? [...projects] : [];
        copy[index] = { ...copy[index], duration: { ...copy[index].duration, end: new Date(date) } };
        dispatch(setProjects(copy));
    }

    // Set title
    const setTitle = (title: string) => {
        const copy = projects ? [...projects] : [];
        copy[index] = { ...copy[index], title: title };
        dispatch(setProjects(copy));
    }

    // Set description
    const setDescription = (description: Common.IDescription) => {
        const copy = projects ? [...projects] : [];
        copy[index] = { ...copy[index], description: description };
        dispatch(setProjects(copy));
    }

    // Set skills
    const setSkills = (skills: Resume.ISkill[]) => {
        const copy = projects ? [...projects] : [];
        copy[index] = { ...copy[index], skills: skills };
        dispatch(setProjects(copy));
    }

    // Remove project
    const removeProject = () => {
        const copy = projects ? [...projects] : [];
        copy.splice(index, 1);
        dispatch(setProjects(copy));
    }

    return (<div className="border border-black rounded p-2">
        <Fieldset className="space-y-2">
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
                // Description input
            }
            <div className="space-y-1">
                <label className="font-bold">Description:</label>
                <DescriptionEditor description={entry.description} setDescription={setDescription} />
            </div>

            {
                // Skills input
            }
            <SkillsEditor skills={entry.skills} setSkills={setSkills} />

            {
                // Remove button
            }
            <div>
                <Button className="btn bg-base-100 shadow-md w-full" onClick={removeProject}>Remove Projects</Button>
            </div>
        </Fieldset>
    </div>)
}

export default function ProjectFragment() {
    const projects = useAppSelector((state) => state.profile.projects);
    const dispatch = useAppDispatch();

    // Add project
    const addProject = () => {
        const copy = projects ? [...projects] : [];
        copy.push({
            title: '',
            description: { lines: [] },
            duration: { start: new Date(), end: new Date() },
            skills: []
        });
        dispatch(setProjects(copy));
    }

    return (
        <div className="space-y-2 flex-1 drop-shadow-md bg-base-100 rounded-xl p-2">
            <h1 className="text-lg font-bold">Projects</h1>
            <Button className="btn bg-base-100 shadow-md w-full" onClick={addProject}>Add Projects</Button>
            {projects.map((entry, index) => <ProjectsEntryFragment key={index} entry={entry} index={index} />)}
        </div>
    )
}
