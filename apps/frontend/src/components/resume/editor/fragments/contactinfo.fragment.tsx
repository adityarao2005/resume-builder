"use client"
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Field, Fieldset, Input, Label, Switch } from "@headlessui/react";
import { CountrySelector, PhoneInput, defaultCountries, parseCountry } from 'react-international-phone';
import 'react-international-phone/style.css';
import { setContactInfo } from "@/state/resumeSlice";
import { Resume, Common } from "@/models/types";
import { parsePhoneNumber } from "libphonenumber-js";
import AddressEditor from "@/components/resume/editor/addressEditor";

export default function ContactInfoFragment() {
    const contactInfo = useAppSelector((state) => state.resume.contactInfo);
    const dispatch = useAppDispatch();

    const setPhone = (phone: string) => {
        dispatch(setContactInfo({ ...contactInfo, phone: parsePhoneNumber(phone).formatInternational() }));
    }

    const setEmail = (email: string) => {
        dispatch(setContactInfo({ ...contactInfo, email }))
    }

    const setContactValue = (key: Resume.MediaProfile, value: string) => {
        const contactInfo0 = { ...contactInfo };
        contactInfo0.mediaProfiles = new Map(contactInfo.mediaProfiles);
        contactInfo0.mediaProfiles.set(key, value);
        dispatch(setContactInfo(contactInfo0));
    }

    const setAddress = (address?: Common.IAddress) => {
        dispatch(setContactInfo({ ...contactInfo, address }));
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
                        <Input
                            className="input input-bordered w-full"
                            type="email"
                            value={contactInfo.email}
                            onChange={(source) => setEmail(source.target.value)}
                            placeholder="Email" />
                    </Field>
                    <Field className="flex flex-col">
                        <Label className="font-bold">LinkedIn:</Label>
                        <Input
                            className="input input-bordered w-full"
                            type="text"
                            value={contactInfo.mediaProfiles.get('LinkedIn')}
                            onChange={(source) => setContactValue('LinkedIn', source.target.value)}
                            placeholder="LinkedIn" />
                    </Field>

                    <Field className="flex flex-col">
                        <Label className="font-bold">Github:</Label>
                        <Input
                            className="input input-bordered w-full"
                            type="text"
                            value={contactInfo.mediaProfiles.get('Github')}
                            onChange={(source) => setContactValue('Github', source.target.value)}
                            placeholder="Github" />
                    </Field>

                    <Field className="flex flex-col">
                        <Label className="font-bold">Website:</Label>
                        <Input
                            className="input input-bordered w-full"
                            type="text"
                            value={contactInfo.mediaProfiles.get('Website')}
                            onChange={(source) => setContactValue('Website', source.target.value)}
                            placeholder="Website" />
                    </Field>

                    <Field className="flex">
                        <Label className="font-bold flex-1">Address:</Label>
                        <Switch className="toggle" onChange={(enabled) => setAddress(enabled ? { city: '', country: 'ca' } : undefined)} />
                    </Field>

                    {contactInfo.address && <AddressEditor address={contactInfo.address} setAddress={setAddress} />}
                </Fieldset>
            </div>
        </details>)
}
