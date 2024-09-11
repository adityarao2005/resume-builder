import { SkillsEditor } from "@/components/resume/fragments/skills.fragment";
import { setOtherSkills } from "@/state/profileSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";

export default function SkillsFragment() {
    const skills = useAppSelector((state) => state.profile.otherSkills);
    const dispatch = useAppDispatch();

    return (
        <div className="space-y-2 flex-1 drop-shadow-md bg-base-100 rounded-xl p-2">
            <h1 className="text-lg font-bold">Other Skills</h1>
            <SkillsEditor skills={skills} setSkills={copy => dispatch(setOtherSkills(copy))} />
        </div>
    )
}