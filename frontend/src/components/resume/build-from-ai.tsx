import { Common } from "@/models/types"
import { useAuthContext } from "../context/AuthContext"
import { useRouter } from "next/navigation"
import { useFormState } from "react-dom"
import { useEffect } from "react"
import Modal from "../modal"
import Pagination from "../pagination"
import { Button, Field, Fieldset, Input, Label, Switch, Textarea } from "@headlessui/react"

interface ResumeCreationStrategy {
    pages: number
    minExperiences: number
    maxExperiences: number
    minProjects: number
    maxProjects: number
    minExtraCurriculars: number
    maxExtraCurriculars: number
}

interface ResumeCreationOptions {
    addSkills: boolean
    addHighlights: boolean
    addAwards: boolean
    addHobbies: boolean
    minDescriptionLength: number
    maxDescriptionLength: number
    filterStrategy: ResumeCreationStrategy
}

interface ResumeCreationRequest {
    job: Common.IJob
    options: ResumeCreationOptions
}

interface FormStatus {
    status: 'error' | 'ready' | 'idle'
    message: ResumeCreationRequest | string[] | string
}

function onSubmit(previousState: FormStatus, formData: FormData): FormStatus {
    // Job information
    const title = formData.get("title") as string;
    const company = formData.get("company") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const description = formData.get("description") as string;

    console.log(title, company, startDate, endDate, description);
    if (!title || !company || !startDate || !endDate || !description) {
        const errors = []
        if (!title) errors.push("Title is required (Page 1)")
        if (!company) errors.push("Company is required (Page 1)")
        if (!startDate) errors.push("Start Date is required (Page 1)")
        if (!endDate) errors.push("End Date is required (Page 1)")
        if (!description) errors.push("Description is required (Page 1)")
        return {
            message: errors,
            status: "error"
        }
    }

    // AI information
    const addSkills = formData.get("addSkills") === "on";
    const addHighlights = formData.get("addHighlights") === "on";
    const addAwards = formData.get("addAwards") === "on";
    const addHobbies = formData.get("addHobbies") === "on";
    const minDescriptionLength = parseInt(formData.get("minDescriptionLength") as string);
    const maxDescriptionLength = parseInt(formData.get("maxDescriptionLength") as string);

    if (minDescriptionLength > maxDescriptionLength) {
        return {
            message: "Min Description Length cannot be greater than Max Description Length",
            status: "error"
        }
    }

    // Page information
    const pages = parseInt(formData.get("pages") as string);
    const minExperiences = parseInt(formData.get("minExperiences") as string);
    const maxExperiences = parseInt(formData.get("maxExperiences") as string);
    const minProjects = parseInt(formData.get("minProjects") as string);
    const maxProjects = parseInt(formData.get("maxProjects") as string);
    const minExtraCurriculars = parseInt(formData.get("minExtraCurriculars") as string);
    const maxExtraCurriculars = parseInt(formData.get("maxExtraCurriculars") as string);

    return {
        message: {
            job: {
                title,
                company,
                duration: {
                    start: startDate,
                    end: endDate
                },
                description
            },
            options: {
                addSkills,
                addHighlights,
                addAwards,
                addHobbies,
                minDescriptionLength,
                maxDescriptionLength,
                filterStrategy: {
                    pages,
                    minExperiences,
                    maxExperiences,
                    minProjects,
                    maxProjects,
                    minExtraCurriculars,
                    maxExtraCurriculars
                }
            }
        },
        status: "ready"
    }
}

export function CreateWithAI() {
    const { user } = useAuthContext();
    const router = useRouter();


    const [state, formAction] = useFormState<FormStatus, FormData>(onSubmit, { status: 'idle', message: 'Ready' });

    useEffect(() => {
        async function makeRequest(request: ResumeCreationRequest) {
            const token = await user?.getIdToken();
            const response = await fetch("/api/resumes/build", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(request)
            })
            const documentId = (await response.json()).documentId;

            if (response.ok) {
                router.push('/app/resume/' + documentId)
            } else {
                alert("Something went wrong")
            }
        }

        if (state.status === 'ready') {
            makeRequest(state.message as ResumeCreationRequest);
        }
    }, [state])

    return (
        <Modal name="create_ai_modal" title="Build with AI">
            <form action={formAction} className="flex w-full flex-col">
                <Pagination pages={3}>
                    <div>
                        <h2 className="text-xl font-bold">Enter the job details</h2>
                        <Fieldset className="space-y-1">
                            <Field className="form-control">
                                <div className="label">
                                    <Label className="font-bold label-text">Title:&nbsp;</Label>
                                    <span className="label-text-alt text-red-700 font-bold">Required</span>
                                </div>
                                <Input className="input input-bordered" type="text" placeholder="Enter the position title here" name="title" />
                            </Field>

                            <Field className="form-control">
                                <div className="label">
                                    <Label className="font-bold label-text">Company:&nbsp;</Label>
                                    <span className="label-text-alt text-red-700 font-bold">Required</span>
                                </div>
                                <Input className="input input-bordered" type="text" placeholder="Enter the company title here" name="company" />
                            </Field>

                            <Field className="form-control">
                                <div className="label">
                                    <Label className="font-bold label-text">Start Date:&nbsp;</Label>
                                    <span className="label-text-alt text-red-700 font-bold">Required</span>
                                </div>
                                <Input className="input input-bordered" type="date" name="startDate" />
                            </Field>

                            <Field className="form-control">
                                <div className="label">
                                    <Label className="font-bold label-text">End Date:&nbsp;</Label>
                                    <span className="label-text-alt text-red-700 font-bold">Required</span>
                                </div>
                                <Input className="input input-bordered" type="date" name="endDate" />
                            </Field>


                            <Field className="form-control">
                                <div className="label">
                                    <Label className="font-bold label-text">Description:&nbsp;</Label>
                                    <span className="label-text-alt text-red-700 font-bold">Required</span>
                                </div>
                                <Textarea className="input input-bordered h-20" name="description" />
                            </Field>
                        </Fieldset>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Enter some parameters about the job</h2>
                        <Fieldset className="space-y-1">
                            <div className="grid grid-cols-2">
                                <Field className="flex flex-row py-1">
                                    <Label>Add Skills:&nbsp;</Label>
                                    <Switch className="toggle" name="addSkills" defaultChecked={true} />
                                </Field>
                                <Field className="flex flex-row py-1">
                                    <Label>Add Highlights:&nbsp;</Label>
                                    <Switch className="toggle" name="addHighlights" />
                                </Field>
                                <Field className="flex flex-row py-1">
                                    <Label>Add Awards:&nbsp;</Label>
                                    <Switch className="toggle" name="addAwards" />
                                </Field>
                                <Field className="flex flex-row py-1">
                                    <Label>Add Hobbies:&nbsp;</Label>
                                    <Switch className="toggle" name="addHobbies" />
                                </Field>
                            </div>
                            <h3 className="text-md py-2 font-bold">Description information:</h3>
                            <div className="space-y-1">
                                <Field className="form-control">
                                    <div className="label">
                                        <Label className="font-bold label-text">Min Length:&nbsp;</Label>
                                    </div>
                                    <Input type="number" className="input input-bordered" name="minDescriptionLength" defaultValue={0} min={0} />
                                </Field>
                                <Field className="form-control">
                                    <div className="label">
                                        <Label className="font-bold label-text">Max Length:&nbsp;</Label>
                                    </div>
                                    <Input type="number" className="input input-bordered" name="maxDescriptionLength" defaultValue={5} min={0} />
                                </Field>
                            </div>

                            <h3 className="text-md py-2 font-bold">Page information:</h3>
                            <div className="space-y-1">

                                <p>For any values which are unrestricted, keep -1.</p>

                                <Field className="form-control">
                                    <div className="label">
                                        <Label className="font-bold label-text">Max Pages:&nbsp;</Label>
                                    </div>
                                    <Input type="number" className="input input-bordered" name="pages" defaultValue={-1} min={-1} />
                                </Field>

                                <Field className="form-control">
                                    <div className="label">
                                        <Label className="font-bold label-text">Min Experience:&nbsp;</Label>
                                    </div>
                                    <Input type="number" className="input input-bordered" name="minExperiences" defaultValue={-1} min={-1} />
                                </Field>

                                <Field className="form-control">
                                    <div className="label">
                                        <Label className="font-bold label-text">Max Experience:&nbsp;</Label>
                                    </div>
                                    <Input type="number" className="input input-bordered" name="maxExperiences" defaultValue={-1} min={-1} />
                                </Field>

                                <Field className="form-control">
                                    <div className="label">
                                        <Label className="font-bold label-text">Min Projects:&nbsp;</Label>
                                    </div>
                                    <Input type="number" className="input input-bordered" name="minProjects" defaultValue={-1} min={-1} />
                                </Field>

                                <Field className="form-control">
                                    <div className="label">
                                        <Label className="font-bold label-text">Max Projects:&nbsp;</Label>
                                    </div>
                                    <Input type="number" className="input input-bordered" name="maxProjects" defaultValue={-1} min={-1} />
                                </Field>

                                <Field className="form-control">
                                    <div className="label">
                                        <Label className="font-bold label-text">Min Extra Curriculars:&nbsp;</Label>
                                    </div>
                                    <Input type="number" className="input input-bordered" name="minExtraCurriculars" defaultValue={-1} min={-1} />
                                </Field>

                                <Field className="form-control">
                                    <div className="label">
                                        <Label className="font-bold label-text">Max Extra Curriculars:&nbsp;</Label>
                                    </div>
                                    <Input type="number" className="input input-bordered" name="maxExtraCurriculars" defaultValue={-1} min={-1} />
                                </Field>

                            </div>
                        </Fieldset>
                    </div>
                    <div>
                        <div>
                            <h2 className="text-xl py-2 font-bold">Review and Submit:</h2>
                            <p className="py-2">When you are ready to submit, hit the submit button.</p>
                            {
                                state.status === 'error' && (<div>

                                    {(state.message as string[]).map((message, index) => <div key={index} className="alert alert-error my-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 shrink-0 stroke-current"
                                            fill="none"
                                            viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>{message}</div>
                                    </div>
                                    )}
                                </div>)
                            }
                            <Button type="submit" className="btn btn-primary cursor-pointer">Submit</Button>
                        </div>
                    </div>
                </Pagination>
            </form>
        </Modal >
    )
}
