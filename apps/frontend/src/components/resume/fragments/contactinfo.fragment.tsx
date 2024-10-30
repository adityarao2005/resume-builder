"use client"
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Field, Fieldset, Input, Label, Switch } from "@headlessui/react";
import { setContactInfo } from "@/state/resumeSlice";
import { Resume, Common } from "@/models/types";
import AddressEditor from "@/components/editor/addressEditor";
import Collapsable from "@/components/editor/collapsableContainer";
import { useResumeDataSelector } from "@/state/resumeSelectors";
import MediaProfilesEditor from "@/components/editor/mediaProfilesEditor";

export default function ContactInfoFragment() {
    const contactInfo = useResumeDataSelector((state) => state.contactInfo);
    const dispatch = useAppDispatch();

    // Set address
    const setAddress = (address?: Common.IAddress) => {
        dispatch(setContactInfo({ ...contactInfo, address }));
    }

    return (
        <Collapsable title="Contact Info">
            <Fieldset className="space-y-2 flex-1">
                {
                    // Media profiles editor
                }
                <MediaProfilesEditor mediaProfiles={contactInfo.mediaProfiles} setMediaProfiles={(mediaProfiles) => dispatch(setContactInfo({ ...contactInfo, mediaProfiles }))} />
                {
                    // Address input
                }
                <Field className="flex">
                    <Label className="font-bold flex-1">Address:</Label>
                    <Switch className="toggle" onChange={(enabled) => setAddress(enabled ? { city: '', country: 'ca' } : undefined)} />
                </Field>

                {
                    // Address editor
                }
                {contactInfo.address && <AddressEditor address={contactInfo.address} setAddress={setAddress} />}
            </Fieldset>
        </Collapsable>)
}
