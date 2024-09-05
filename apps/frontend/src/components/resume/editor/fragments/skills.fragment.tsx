import { Resume } from "@/models/types";
import { setSkills } from "@/state/resumeSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Field, Button, Input } from "@headlessui/react";

export interface IDescriptionEditorProps {
    skills: Resume.ISkill[],
    setSkills: (description: Resume.ISkill[]) => void
}


export function AddSkillsButton({ skills, setSkills }: IDescriptionEditorProps) {
    return (
        <Field className="flex">
            <Button
                className="btn bg-base-100 shadow-md flex-1"
                onClick={() => setSkills([...skills, { type: '', name: '' }])}>
                Add Skill
            </Button>
        </Field>
    )
}

export function Skills({ skills, setSkills }: IDescriptionEditorProps) {
    return skills.map((skill, index) => (
        <Field key={index} className="flex flex-col">
            <div className="flex flex-col border border-black rounded p-2 space-y-2">
                <label className="font-bold">Name:</label>
                <Input
                    className="input input-bordered w-full"
                    value={skill.name}
                    onChange={(source) => {
                        const list = [...skills];
                        list[index] = { name: source.target.value, type: list[index].type };
                        setSkills(list);
                    }}
                    placeholder="Enter a line" />
                <label className="font-bold">Type:</label>
                <Input
                    className="input input-bordered w-full"
                    value={skill.type}
                    onChange={(source) => {
                        const list = [...skills];
                        list[index] = { name: list[index].name, type: source.target.value };
                        setSkills(list);
                    }}
                    placeholder="Enter a line" />
                <Button
                    className="btn input-bordered w-full bg-base-300"
                    onClick={() => {
                        const list = [...skills];
                        list.splice(index, 1);
                        setSkills(list);
                    }}>
                    X
                </Button>
            </div>
        </Field>
    ))
}

function SkillsEditor({ skills, setSkills }: IDescriptionEditorProps) {
    return (
        <>
            <AddSkillsButton skills={skills} setSkills={setSkills} />
            <Skills skills={skills} setSkills={setSkills} />
        </>
    );
}

export default function SkillsFragment() {
    const skills = useAppSelector((state) => state.resume.skills);
    const dispatch = useAppDispatch();

    return (
        <details className="collapse collapse-arrow border-base-300 border bg-base-200 shadow-md">
            <summary className="collapse-title text-xl font-bold">Skills</summary>
            <div className="collapse-content space-y-2">
                <SkillsEditor skills={skills} setSkills={copy => dispatch(setSkills(copy))} />
            </div>
        </details>
    )
}
