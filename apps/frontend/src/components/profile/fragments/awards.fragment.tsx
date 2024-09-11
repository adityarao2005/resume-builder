import { CollapsableField } from "@/components/editor/collapsableContainer";
import { AwardsEditor } from "@/components/resume/fragments/awards.fragment";
import { setOtherAwards } from "@/state/profileSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";

export default function AwardsFragment() {
    const awards = useAppSelector((state) => state.profile.otherAwards);
    const dispatch = useAppDispatch();

    return (
        <CollapsableField title="Other Awards/Acheivements">
            <AwardsEditor awards={awards} setAwards={copy => dispatch(setOtherAwards(copy))} />
        </CollapsableField>
    )
}