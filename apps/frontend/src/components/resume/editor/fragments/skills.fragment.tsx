import { Resume } from "@/models/types";
import { setSkills } from "@/state/resumeSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Field, Button, Input } from "@headlessui/react";
import Collapsable from "@/components/resume/editor/collapsableContainer";
import AddButton from "@/components/resume/editor/addbutton";

// Skill editor props
export interface ISkillsEditorProps {
    skills: Resume.ISkill[],
    setSkills: (description: Resume.ISkill[]) => void
}

// Skills view model
export function Skills({ skills, setSkills }: ISkillsEditorProps) {
    // Return skills view model list
    return skills.map((skill, index) => (
        <Field key={index} className="flex flex-col">
            <div className="flex flex-col border border-black rounded p-2 space-y-2">
                {
                    // Name input
                }
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
                {
                    // Type input
                }
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
                {
                    // Remove button
                }
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

// Skills editor
function SkillsEditor({ skills, setSkills }: ISkillsEditorProps) {
    return (
        <>
            <AddButton<Resume.ISkill> data={skills} setData={setSkills} title="Skill" sample={{ type: '', name: '' }} />
            <Skills skills={skills} setSkills={setSkills} />
        </>
    );
}

export default function SkillsFragment() {
    const skills = useAppSelector((state) => state.resume.skills);
    const dispatch = useAppDispatch();

    // Return the skills editor
    return (
        <Collapsable title="Skills">
            <SkillsEditor skills={skills} setSkills={copy => dispatch(setSkills(copy))} />
        </Collapsable>
    )
}
