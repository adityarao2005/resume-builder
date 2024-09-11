import { AwardsEditor } from "@/components/resume/fragments/awards.fragment";
import { setOtherAwards } from "@/state/profileSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";

export default function AwardsFragment() {
    const awards = useAppSelector((state) => state.profile.otherAwards);
    const dispatch = useAppDispatch();

    return (
        <div className="space-y-2 flex-1 drop-shadow-md bg-base-100 rounded-xl p-2">
            <h1 className="text-lg font-bold">Other Awards/Acheivements</h1>
            <AwardsEditor awards={awards} setAwards={copy => dispatch(setOtherAwards(copy))} />
        </div>
    )
}