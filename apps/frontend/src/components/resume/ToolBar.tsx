import { useDocument } from "@/app/app/resume/[id]/hooks";
import { NavMenu } from "@/components/navbar.components"
import { Button, Field, Fieldset, Select, Tab, TabGroup, TabList, Label, Switch } from "@headlessui/react"
import { compileResume } from "@/components/resume/compile";
import { useStompClient, useSubscription } from "react-stomp-hooks";
import { useEffect, useState } from "react";
import Modal, { showModal } from "../modal";

interface ResumeScore {
    score: number;
    pros: string[];
    cons: string[];
    improvements: string[];
}

export type ResumeScoreReport = ResumeScore | null | "Loading";

// toolbar component
export default function ToolBar() {
    const { autoCompile, setAutoCompile } = useDocument();
    const client = useStompClient();
    const [score, setScore] = useState<ResumeScoreReport>(null);

    useSubscription("/user/queue/resume/score", (message) => {
        if (message.body) {
            const report = JSON.parse(message.body) as ResumeScore;
            setScore(report);
        }
    })

    async function scoreResume() {
        client?.publish({
            destination: `/app/resume/score`
        })
        setScore("Loading")
    }

    useEffect(() => {
        if (score === "Loading") {
            showModal("score_modal");
        }
    }, [score])


    return (<div className="navbar bg-base-100 drop-shadow">
        <TabGroup>
            <TabList className="tabs tabs-boxed">
                <Tab className="tab h-12 font-bold">Edit Data</Tab>
                <Tab className="tab h-12 font-bold">Edit Style</Tab>
                <Tab className="tab h-12 font-bold">Edit Job Type</Tab>
            </TabList>
        </TabGroup>
        {
            score == null ? <></> :
                (
                    // Have the modal here
                    <Modal name="score_modal" title="Resume Score">
                        {score === "Loading" ? (<div className="text-center">
                            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                            <h2 className="text-center text-gray-600 text-xl font-semibold">Loading...</h2>
                            <p className="text-gray-500">Please wait while we load your resume.</p>
                        </div>) : (
                            <div className="flex flex-col">
                                <div className="flex flex-row">
                                    <div className="font-bold">Score: </div>{score.score}
                                </div>
                                <div className="flex flex-col">
                                    <div className="font-bold">Pros of the resume: </div>
                                    <ul>
                                        {score.pros.map((pro) => <li>{pro}</li>)}
                                    </ul>
                                </div>
                                <div className="flex flex-col">
                                    <div className="font-bold">Cons of the resume: </div>
                                    <ul>
                                        {score.cons.map((pro) => <li>{pro}</li>)}
                                    </ul>
                                </div>
                                <div className="flex flex-col">
                                    <div className="font-bold">Ways to improve the resume: </div>
                                    <ul>
                                        {score.improvements.map((pro) => <li>{pro}</li>)}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </Modal>
                )
        }
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
            <li><Button className="btn btn-primary m-2" onClick={scoreResume}>Score</Button></li>
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