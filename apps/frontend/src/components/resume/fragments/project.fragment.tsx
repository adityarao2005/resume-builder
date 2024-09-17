"use client"
import { Common, Resume } from "@/models/types";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Button, Field, Fieldset } from "@headlessui/react";
import 'react-international-phone/style.css';
import DescriptionEditor from "@/components/editor/descriptionEditor";
import { setProjects } from "@/state/resumeSlice";
import Collapsable, { DraggableCollapsable } from "@/components/editor/collapsableContainer";
import { formatDate } from "@/components/formatDate";
import { IDragAndDrop, useDragAndDrop } from "@/components/dnd";
import Editor from "@/components/editor/editor";

function ProjectsEntryFragment({ entry, index, dragEnd, dragEnter, dragStart }: { entry: Resume.IProject, index: number } & IDragAndDrop) {
    const projects = useAppSelector((state) => state.resume.projects);
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

    // Remove project
    const removeProject = () => {
        const copy = projects ? [...projects] : [];
        copy.splice(index, 1);
        dispatch(setProjects(copy));
    }

    return (<Editor title={entry.title}
        dragEnd={dragEnd} dragEnter={dragEnter} dragStart={dragStart} destructor={removeProject}>
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
                // Remove button
            }
            <div>
                <Button className="btn bg-base-100 shadow-md w-full" onClick={removeProject}>Remove Projects</Button>
            </div>
        </Fieldset>
    </Editor>)
}

export default function ProjectFragment() {
    const projects = useAppSelector((state) => state.resume.projects);
    const dispatch = useAppDispatch();

    // Add project
    const addProject = () => {
        const copy = projects ? [...projects] : [];
        copy.push({
            title: '',
            description: { lines: [] },
            duration: { start: new Date(), end: new Date() },
        });
        dispatch(setProjects(copy));
    }

    const { dragEnter, dragEnd, dragStart } = useDragAndDrop(projects, (e) => dispatch(setProjects(e)));

    return (
        <Collapsable title="Projects">
            <Button className="btn bg-base-100 shadow-md w-full" onClick={addProject}>Add Projects</Button>
            {projects.map((entry, index) => <ProjectsEntryFragment key={index} entry={entry} index={index}
                dragEnter={e => dragEnter(e, index)}
                dragEnd={dragEnd}
                dragStart={e => dragStart(e, index)} />)}
        </Collapsable>
    )
}
