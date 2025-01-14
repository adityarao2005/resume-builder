"use client"
import { useAppDispatch, useAppSelector } from "@/state/store";
import { Field, Fieldset, Input, Label, Switch } from "@headlessui/react";
import { setContactInfo } from "@/state/profileSlice";
import { Resume, Common } from "@/models/types";
import AddressEditor from "@/components/editor/addressEditor";
import { CollapsableField } from "@/components/editor/collapsableContainer";
import MediaProfilesEditor from "@/components/editor/mediaProfilesEditor";

export default function ContactInfoFragment() {
    const contactInfo = useAppSelector((state) => state.profile.contactInfo);
    const dispatch = useAppDispatch();


    // Set address
    const onEnable = (enabled: boolean) => {
        console.log("Enabled: " + enabled)
        setAddress(enabled ? { city: '', country: 'ca' } : undefined)
    }

    const setAddress = (address?: Common.IAddress) => {
        dispatch(setContactInfo({ ...contactInfo, address }));
    }

    return (
        <CollapsableField title="Contact Info">
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
                    <Switch className="toggle" onChange={onEnable} />
                </Field>

                {
                    // Address editor
                }
                {contactInfo.address &&
                    <AddressEditor address={contactInfo.address} setAddress={setAddress} />}
            </Fieldset>
        </CollapsableField>)
}
