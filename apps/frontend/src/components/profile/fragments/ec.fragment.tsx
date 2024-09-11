"use client"
import { Common, Profile, Resume } from "@/models/types";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Button, Field, Fieldset } from "@headlessui/react";
import 'react-international-phone/style.css';
import AddressEditor from "@/components/editor/addressEditor";
import DescriptionEditor from "@/components/editor/descriptionEditor";
import { setExtraCurriculars } from "@/state/profileSlice";
import { formatDate } from "@/components/formatDate";
import { SkillsEditor } from "@/components/resume/fragments/skills.fragment";
import { CollapsableField } from "@/components/editor/collapsableContainer";

function ExperienceEntryFragment({ entry, index }: { entry: Profile.IProfileExperience, index: number }) {
    const experiences = useAppSelector((state) => state.profile.extraCurriculars);
    const dispatch = useAppDispatch();

    // Set address
    const setAddress = (address: Common.IAddress) => {
        const copy = experiences ? [...experiences] : [];
        copy[index] = { ...copy[index], location: address };
        dispatch(setExtraCurriculars(copy));
    }

    // Set start date
    const setStartDate = (date: string) => {
        const copy = experiences ? [...experiences] : [];
        copy[index] = { ...copy[index], duration: { ...copy[index].duration, start: new Date(date) } };
        dispatch(setExtraCurriculars(copy));
    }

    // Set end date
    const setEndDate = (date: string) => {
        const copy = experiences ? [...experiences] : [];
        copy[index] = { ...copy[index], duration: { ...copy[index].duration, end: new Date(date) } };
        dispatch(setExtraCurriculars(copy));
    }

    // Set company
    const setCompany = (company: string) => {
        const copy = experiences ? [...experiences] : [];
        copy[index] = { ...copy[index], company: company };
        dispatch(setExtraCurriculars(copy));
    }

    // Set title
    const setTitle = (title: string) => {
        const copy = experiences ? [...experiences] : [];
        copy[index] = { ...copy[index], title: title };
        dispatch(setExtraCurriculars(copy));
    }

    // Set description
    const setDescription = (description: Common.IDescription) => {
        const copy = experiences ? [...experiences] : [];
        copy[index] = { ...copy[index], description: description };
        dispatch(setExtraCurriculars(copy));
    }

    // Set skills
    const setSkills = (skills: Resume.ISkill[]) => {
        const copy = experiences ? [...experiences] : [];
        copy[index] = { ...copy[index], skills: skills };
        dispatch(setExtraCurriculars(copy));
    }

    // Remove experience
    const removeExperience = () => {
        const copy = experiences ? [...experiences] : [];
        copy.splice(index, 1);
        dispatch(setExtraCurriculars(copy));
    }

    return (<div className="border border-black rounded p-2">
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
                // Skills input
            }
            <SkillsEditor skills={entry.skills} setSkills={setSkills} />

            {
                // Remove button
            }
            <div>
                <Button className="btn bg-base-100 shadow-md w-full" onClick={removeExperience}>Remove Experience</Button>
            </div>
        </Fieldset>
    </div>)
}

export default function ECFragment() {
    const experiences = useAppSelector((state) => state.profile.extraCurriculars);
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
            skills: []
        });
        dispatch(setExtraCurriculars(copy));
    }

    return (
        <CollapsableField title="Extra Curriculars">
            <Button className="btn bg-base-100 shadow-md w-full" onClick={addExperience}>Add Extra Curricular Activity</Button>
            {experiences.map((entry, index) => <ExperienceEntryFragment key={index} entry={entry} index={index} />)}
        </CollapsableField>
    )
}
