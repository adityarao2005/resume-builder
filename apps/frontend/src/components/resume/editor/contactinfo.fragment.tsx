"use client"
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Field, Fieldset, Input, Label } from "@headlessui/react";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { setContactInfo } from "@/state/resumeSlice";

export default function ContactInfoFragment() {
    const contactInfo = useAppSelector((state) => state.resume.contactInfo);
    const dispatch = useAppDispatch();

    const setPhone = (phone: string) => {
        dispatch(setContactInfo({ ...contactInfo, phone }));
    }

    const setEmail = (email: string) => {
        dispatch(setContactInfo({ ...contactInfo, email }))
    }

    return (
        <details className="collapse collapse-arrow border-base-300 border bg-base-200 shadow-md">
            <summary className="collapse-title text-xl font-bold">Contact Info</summary>
            <div className="collapse-content">
                <Fieldset className="space-y-2 flex-1">
                    <Field>
                        <Label className="font-bold">Phone:</Label>
                        <PhoneInput defaultCountry="ua" className="w-full" value={contactInfo.phone} onChange={setPhone} />
                    </Field>
                    <Field className="flex flex-col">
                        <Label className="font-bold">Email:</Label>
                        <Input className="input input-bordered w-full" type="email" value={contactInfo.email} onChange={(source) => setEmail(source.target.value)} placeholder="Email" />
                    </Field>
                </Fieldset>
            </div>
        </details>)
}
