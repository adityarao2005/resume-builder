import { NavMenu } from "@/components/navbar.components"
import { Button, Field, Fieldset, Select, Tab, TabGroup, TabList, Label } from "@headlessui/react"

// toolbar component
export default function ToolBar() {
    // TODO: Add switch field for enabling auto-compile (in non autocompile mode, the compile button should be enabled & the editing would not happen immediately which means some delay in the UI must occur from context to cache)
    return (<div className="navbar bg-base-100 drop-shadow">
        <TabGroup>
            <TabList className="tabs tabs-boxed">
                <Tab className="tab h-12 font-bold">Edit Data</Tab>
                <Tab className="tab h-12 font-bold">Edit Style</Tab>
                <Tab className="tab h-12 font-bold">Edit Job Type</Tab>
            </TabList>
        </TabGroup>
        <div className="flex-1"></div>
        <NavMenu>
            <li><Button className="btn mx-2 h-full">Compile</Button></li>
            <li><Button className="btn mx-2 h-full">Score</Button></li>
            <li>
                <Fieldset>
                    <Field className="space-x-1">
                        <Label>Orientation</Label>
                        <Select name="orientation" className="select select-bordered w-fit" aria-label="Project status">
                            <option value="landscape">Landscape</option>
                            <option value="portrait">Portrait</option>
                        </Select>
                    </Field>
                </Fieldset>
            </li>
            <li>
                <Fieldset>
                    <Field className="space-x-1">
                        <Label>Paper</Label>
                        <Select name="paper" className="select select-bordered w-fit" aria-label="Project status">
                            <option value="A4">A4</option>
                            <option value="A3">A3</option>
                            <option value="A2">A2</option>
                            <option value="letter">letter</option>
                        </Select>
                    </Field>
                </Fieldset>
            </li>
        </NavMenu>
    </div>)
}