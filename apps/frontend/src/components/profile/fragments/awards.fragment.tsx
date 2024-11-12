import { CollapsableField } from "@/components/editor/collapsableContainer";
import { AwardsEditor } from "@/components/resume/fragments/awards.fragment";
import { setOtherAwards } from "@/state/profileSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";

export default function AwardsFragment() {
    // 1. Get awards from the Redux store
    const awards = useAppSelector((state) => state.profile.otherAwards);
    // 2. Get the dispatch function
    const dispatch = useAppDispatch();

    // Use AwardsEditor to render the awards
    return (
        <CollapsableField title="Other Awards/Acheivements">
            <AwardsEditor awards={awards} setAwards={copy => dispatch(setOtherAwards(copy))} />
        </CollapsableField>
    )
}