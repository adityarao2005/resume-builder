import { useDocument } from "@/app/app/resume/[id]/hooks";
import { NavMenu } from "@/components/navbar.components"
import { Button, Field, Fieldset, Select, Tab, TabGroup, TabList, Label, Switch } from "@headlessui/react"
import { compileResume } from "@/components/resume/compile";

// toolbar component
export default function ToolBar() {
    const { autoCompile, setAutoCompile } = useDocument();
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
            <li>
                <Fieldset className="h-full flex">
                    {!autoCompile &&
                        <Field>
                            <Button className="btn btn-primary h-full" onClick={compileResume}>Compile</Button>
                        </Field>
                    }
                    <Field className="h-full flex-1 flex flex-col align-middle">
                        <div className="flex-1"></div>
                        <div className="space-x-1">
                            <Label>Auto-Compile:</Label>
                            <Switch
                                checked={autoCompile}
                                onChange={setAutoCompile}
                                className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
                            >
                                <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                            </Switch>
                        </div>
                        <div className="flex-1"></div>
                    </Field>
                </Fieldset>
            </li>
            <li><Button className="btn btn-primary m-2">Score</Button></li>
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