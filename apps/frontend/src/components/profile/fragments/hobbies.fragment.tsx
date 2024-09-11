import { CollapsableField } from "@/components/editor/collapsableContainer";
import { DescriptionEditor } from "@/components/resume/fragments/hobbies.fragment";
import { setHobbies } from "@/state/profileSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";

export default function HobbiesFragment() {
    const description = useAppSelector((state) => state.profile.hobbies);
    const dispatch = useAppDispatch();

    // Set hobbies
    const setDescription = (description: string[]) => {
        dispatch(setHobbies(description));
    }

    return (
        <CollapsableField title="Hobbies">
            <DescriptionEditor description={description} setDescription={setDescription} />
        </CollapsableField>
    )
}