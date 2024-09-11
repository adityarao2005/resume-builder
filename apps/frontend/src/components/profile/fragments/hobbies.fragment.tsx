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
        <div className="space-y-2 flex-1 drop-shadow-md bg-base-100 rounded-xl p-2">
            <h1 className="text-lg font-bold">Hobbies</h1>
            <DescriptionEditor description={description} setDescription={setDescription} />
        </div>
    )
}