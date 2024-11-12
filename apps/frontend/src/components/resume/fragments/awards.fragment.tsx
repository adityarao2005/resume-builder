import { Common } from "@/models/types";
import { setAwards } from "@/state/resumeSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Field, Button, Input } from "@headlessui/react";
import Collapsable from "@/components/editor/collapsableContainer";
import AddButton from "@/components/editor/addbutton";
import Modal, { showModal } from "@/components/modal";
import { useResumeDataSelector } from "@/state/resumeSelectors";
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
        list[index] = { title: list[index].title, date: date };
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
                    value={award.date}
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

export function AwardsEditor({ awards, setAwards }: IAwardEditorProps) {
    // Return a list of award view models
    return (
        <div>
            <Button className="btn input-bordered w-full bg-base-300" onClick={() => showModal('award')}>Open Awards Editor</Button>

            <Modal name="award" title="Awards/Achievements">
                <AddButton<Common.IAward> data={awards} setData={setAwards} title="Awards/Achievments" sample={{ date: formatDate(new Date()), title: '' }} />
                <div className="grid grid-cols-3">
                    <Awards awards={awards} setAwards={setAwards} />
                </div>
            </Modal>
        </div>
    );
}

export default function AwardsFragment() {
    const awards = useResumeDataSelector(state => state.awards);
    const dispatch = useAppDispatch();

    // Return the awards editor
    return (
        <Collapsable title="Awards and Achievments">
            <AwardsEditor awards={awards} setAwards={copy => dispatch(setAwards(copy))} />
        </Collapsable>
    )
}
