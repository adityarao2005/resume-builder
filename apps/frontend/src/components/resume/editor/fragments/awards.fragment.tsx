import { Common } from "@/models/types";
import { setAwards } from "@/state/resumeSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Field, Button, Input } from "@headlessui/react";
import Collapsable from "@/components/resume/editor/collapsableContainer";
import AddButton from "@/components/resume/editor/addbutton";
import { formatDate } from "@/components/formatDate";

// Award editor props
export interface IAwardEditorProps {
    awards: Common.IAward[],
    setAwards: (description: Common.IAward[]) => void
}

// Award section
export function Awards({ awards, setAwards }: IAwardEditorProps) {
    // Set title
    const setTitle = (title: string, index: number) => {
        const list = [...awards];
        list[index] = { title: title, date: list[index].date };
        setAwards(list);
    }

    // Set date
    const setDate = (date: string, index: number) => {
        const list = [...awards];
        list[index] = { title: list[index].title, date: new Date(date) };
        setAwards(list);
    }

    // Remove award
    const removeAward = (index: number) => {
        const list = [...awards];
        list.splice(index, 1);
        setAwards(list);
    }

    // Return a list of award view models
    return awards.map((award, index) => (
        <Field key={index} className="flex flex-col">
            <div className="flex flex-col border border-black rounded p-2 space-y-2">
                {
                    // Title input
                }
                <label className="font-bold">Title:</label>
                <Input
                    className="input input-bordered w-full"
                    value={award.title}
                    onChange={source => setTitle(source.target.value, index)}
                    placeholder="Enter a line" />

                {
                    // Date input
                }
                <label className="font-bold">Date:</label>
                <Input
                    className="input input-bordered w-full"
                    type="date"
                    value={formatDate(award.date)}
                    onChange={source => setDate(source.target.value, index)} />
                {
                    // Remove button
                }
                <Button
                    className="btn input-bordered w-full bg-base-300"
                    onClick={() => removeAward(index)}>
                    X
                </Button>
            </div>
        </Field>
    ))
}

function AwardsEditor({ awards, setAwards }: IAwardEditorProps) {
    // Return a list of award view models
    return (
        <>
            <AddButton<Common.IAward> data={awards} setData={setAwards} title="Awards/Achievments" sample={{ date: new Date(), title: '' }} />
            <Awards awards={awards} setAwards={setAwards} />
        </>
    );
}

export default function AwardsFragment() {
    const awards = useAppSelector((state) => state.resume.awards);
    const dispatch = useAppDispatch();

    // Return the awards editor
    return (
        <Collapsable title="Awards and Achievments">
            <AwardsEditor awards={awards} setAwards={copy => dispatch(setAwards(copy))} />
        </Collapsable>
    )
}
