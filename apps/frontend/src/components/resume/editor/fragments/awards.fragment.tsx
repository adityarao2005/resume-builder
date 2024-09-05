import { Common, Resume } from "@/models/types";
import { setAwards } from "@/state/resumeSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Field, Button, Input } from "@headlessui/react";

export interface IDescriptionEditorProps {
    awards: Common.IAward[],
    setAwards: (description: Common.IAward[]) => void
}

// TODO: Fix code debt

export function AddAwardsButton({ awards, setAwards }: IDescriptionEditorProps) {
    return (
        <Field className="flex">
            <Button
                className="btn bg-base-100 shadow-md flex-1"
                onClick={() => setAwards([...awards, { date: new Date(), title: '' }])}>
                Add Award
            </Button>
        </Field>
    )
}

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export function Awards({ awards, setAwards }: IDescriptionEditorProps) {
    const setTitle = (title: string, index: number) => {
        const list = [...awards];
        list[index] = { title: title, date: list[index].date };
        setAwards(list);
    }

    const setDate = (date: string, index: number) => {
        const list = [...awards];
        list[index] = { title: list[index].title, date: new Date(date) };
        setAwards(list);
    }

    return awards.map((award, index) => (
        <Field key={index} className="flex flex-col">
            <div className="flex flex-col border border-black rounded p-2 space-y-2">
                <label className="font-bold">Title:</label>
                <Input
                    className="input input-bordered w-full"
                    value={award.title}
                    onChange={source => setTitle(source.target.value, index)}
                    placeholder="Enter a line" />
                <label className="font-bold">Date:</label>
                <input
                    className="input input-bordered w-full"
                    type="date"
                    value={formatDate(award.date)} onChange={source => setDate(source.target.value, index)} />
                <Button
                    className="btn input-bordered w-full bg-base-300"
                    onClick={() => {
                        const list = [...awards];
                        list.splice(index, 1);
                        setAwards(list);
                    }}>
                    X
                </Button>
            </div>
        </Field>
    ))
}

function AwardsEditor({ awards, setAwards }: IDescriptionEditorProps) {
    return (
        <>
            <AddAwardsButton awards={awards} setAwards={setAwards} />
            <Awards awards={awards} setAwards={setAwards} />
        </>
    );
}

export default function AwardsFragment() {
    const awards = useAppSelector((state) => state.resume.awards);
    const dispatch = useAppDispatch();

    return (
        <details className="collapse collapse-arrow border-base-300 border bg-base-200 shadow-md">
            <summary className="collapse-title text-xl font-bold">Awards and Acheivements</summary>
            <div className="collapse-content space-y-2">
                <AwardsEditor awards={awards} setAwards={copy => dispatch(setAwards(copy))} />
            </div>
        </details>
    )
}
