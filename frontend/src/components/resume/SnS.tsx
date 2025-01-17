import { FilterModalProps, SortBy, SortModalProps, SortOrder } from "@/models/resume-manager";
import { useState } from "react";
import Modal from "../modal";
import { Button, Field, Fieldset, Input, Label, Select } from "@headlessui/react";
import TabStopper from "./TabStopper";

export function FilterModal({ filterProps, setFilterProps }: { filterProps: FilterModalProps, setFilterProps: (props: FilterModalProps) => void }) {
    const [searchValue, setSearchValue] = useState("");

    const addSkill = () => {
        const list = [...filterProps.skills];
        list.push(searchValue);
        setSearchValue("");
        setFilterProps({ ...filterProps, skills: list });
    }

    const removeSkill = (index: number) => {
        const list = [...filterProps.skills];
        list.splice(index, 1)
        setFilterProps({ ...filterProps, skills: list });
    }

    const setBeforeState = (before?: string) => {
        setFilterProps({ ...filterProps, before });
    }

    const setAfterState = (after?: string) => {
        setFilterProps({ ...filterProps, after });
    }

    return (<Modal name="filter_modal" title="Filter">
        <Fieldset className="space-y-1">
            <Field>
                <Label className="font-bold">Before Creation:&nbsp;</Label>
                <Input className="input input-bordered" type="date" value={filterProps.before ? filterProps.before : ''}
                    onChange={(e) => setBeforeState(e.target.value)} />
                <Button className="btn btn-primary rounded-l-none" onClick={() => setBeforeState()}>Reset</Button>
            </Field>
            <Field>
                <Label className="font-bold">After Creation:&nbsp;</Label>
                <Input className="input input-bordered" type="date" value={filterProps.after ? filterProps.after : ''}
                    onChange={(e) => setAfterState(e.target.value)} />
                <Button className="btn btn-primary rounded-l-none" onClick={() => setAfterState()}>Reset</Button>
            </Field>
            <Field>
                <Label className="font-bold">Skills:&nbsp;</Label>
                <Input className="input input-bordered rounded-r-none" type="text" value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)} />
                <Button className="btn btn-primary rounded-l-none" onClick={addSkill}>Add Skill</Button>
            </Field>
            <div className="w-full flex flex-row p-4 space-x-2">
                {
                    filterProps.skills.map((skill, index) => {
                        return <TabStopper key={index} text={skill} action={() => removeSkill(index)} />
                    })
                }
            </div>
        </Fieldset>
    </Modal>)
}

export function SortModal({ sortProps, setSortProps }: { sortProps: SortModalProps, setSortProps: (props: SortModalProps) => void }) {
    const [sortBy, setSortBy] = useState<SortBy>("title");
    const [sortOrder, setSortOrder] = useState<SortOrder>("ascending");

    const setSortByState = (by: SortBy) => {
        setSortBy(by);
        setSortProps({ ...sortProps, by });
    }

    const setSortOrderState = (order: SortOrder) => {
        setSortOrder(order);
        setSortProps({ ...sortProps, order });
    }

    return (<Modal name="sort_modal" title="Sort">
        <Fieldset className="space-y-1">
            <Field>
                <Label className="font-bold">By: &nbsp;</Label>
                <Select name="sort-by" className="select select-bordered w-full max-w-xs"
                    aria-label="Sort by select"
                    value={sortBy}
                    onChange={e => setSortByState(e.target.value as SortBy)}>
                    <option value="title">Title</option>
                    <option value="createdAt">Created At</option>
                </Select>
            </Field>
            <Field>
                <Label className="font-bold">Order: &nbsp;</Label>
                <Select name="sort-order" className="select select-bordered w-full max-w-xs"
                    aria-label="Sort order select"
                    value={sortOrder}
                    onChange={e => setSortOrderState(e.target.value as SortOrder)}>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </Select>
            </Field>
        </Fieldset>
    </Modal >)
}
