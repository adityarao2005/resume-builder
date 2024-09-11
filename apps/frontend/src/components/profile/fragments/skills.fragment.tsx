import { CollapsableField } from "@/components/editor/collapsableContainer";
import { SkillsEditor } from "@/components/resume/fragments/skills.fragment";
import { setOtherSkills } from "@/state/profileSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";

export default function SkillsFragment() {
    const skills = useAppSelector((state) => state.profile.otherSkills);
    const dispatch = useAppDispatch();

    return (
        <CollapsableField title="Other Skills">
            <SkillsEditor skills={skills} setSkills={copy => dispatch(setOtherSkills(copy))} />
        </CollapsableField>
    )
}