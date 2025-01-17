import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";
import Modal from "../modal";
import { Button, Field, Fieldset, Input, Label, Textarea } from "@headlessui/react";

export function CreateFromScratch() {
    const { user } = useAuthContext();
    const router = useRouter();


    async function onSubmit(formData: FormData) {
        const title = formData.get("title") as string;
        const company = formData.get("company") as string;
        const startDate = formData.get("startDate") as string;
        const endDate = formData.get("endDate") as string;
        const description = formData.get("description") as string;

        const job = {
            title,
            company,
            duration: {
                start: startDate,
                end: endDate
            },
            description: description
        }

        const resume = {
            job,
            data: {
                name: '',
                contactInfo: { mediaProfiles: [] },
                education: [],
                highlights: [],
                experiences: [],
                projects: [],
                extraCurriculars: [],
                awards: [],
                hobbies: [],
                skills: [],
            },
        }

        const token = await user?.getIdToken();
        const response = await fetch("/api/resume", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(resume)
        })
        const documentId = (await response.json()).documentId;

        if (response.ok) {
            router.push('/app/resume/' + documentId)
        } else {
            alert("Something went wrong")
        }
    }

    return (
        <Modal name="create_scratch_modal" title="Create Resume">
            <form action={onSubmit} className="flex w-full flex-col">
                <div className="pb-2">
                    <h2 className="text-md font-bold">Enter the job details</h2>
                    <Fieldset className="space-y-1">
                        <Field className="flex flex-row items-center">
                            <Label className="font-bold">Title:&nbsp;</Label>
                            <Input className="input input-bordered flex-1" type="text" name="title" />
                        </Field>
                        <Field className="flex flex-row items-center">
                            <Label className="font-bold">Company:&nbsp;</Label>
                            <Input className="input input-bordered flex-1" type="text" name="company" />
                        </Field>
                        <Field className="flex flex-row items-center">
                            <Label className="font-bold">Start Date:&nbsp;</Label>
                            <Input className="input input-bordered flex-1" type="date" name="startDate" />
                        </Field>
                        <Field className="flex flex-row items-center">
                            <Label className="font-bold">End Date:&nbsp;</Label>
                            <Input className="input input-bordered flex-1" type="date" name="endDate" />
                        </Field>
                        <Field className="flex flex-col">
                            <Label className="font-bold">Description:&nbsp;</Label>
                            <Textarea className="input input-bordered h-20" name="description" />
                        </Field>
                    </Fieldset>
                </div>
                <div>
                    <Button type="submit" className="btn btn-primary cursor-pointer">Submit</Button>
                </div>
            </form>
        </Modal>
    )
}