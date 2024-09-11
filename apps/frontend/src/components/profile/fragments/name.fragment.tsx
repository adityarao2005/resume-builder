import { CollapsableField } from "@/components/editor/collapsableContainer";
import { setName } from "@/state/profileSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Field, Input, Label } from "@headlessui/react";

export default function Name() {
    const name = useAppSelector((state) => state.profile.name);
    const dispatch = useAppDispatch();

    const setNameState = (name: string) => {
        dispatch(setName(name));
    }

    return (
        <CollapsableField title="Name">
            <Field>
                <Label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <Input type="text" className="grow" placeholder="Enter your name" value={name} onChange={(e) => setNameState(e.target.value)} />
                </Label>
            </Field>
        </CollapsableField>
    );
}