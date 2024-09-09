import { Common } from "@/models/types";
import { Field, Input, Label } from "@headlessui/react";
import { CountrySelector, defaultCountries, parseCountry } from "react-international-phone";

// Convert ISO address to name
export function convertISOAddressToName(address: Common.IAddress) {
    return defaultCountries
        .map(parseCountry)
        .filter((country) => country.iso2 == address.country)[0]
        .name;
}

export default function AddressEditor(props: { address: Common.IAddress, setAddress: (address: Common.IAddress) => void }) {
    // Convert ISO address to name
    const addressName = convertISOAddressToName(props.address);

    return (
        <>
            <Field className="flex flex-col">
                {
                    // City input
                }
                <Label className="font-bold">City:</Label>
                <Input
                    className="input input-bordered w-full"
                    type="text"
                    value={props.address.city}
                    onChange={(source) => props.setAddress({ country: props.address.country, city: source.target.value })}
                    placeholder="City" />
            </Field>
            <Field className="flex flex-col">
                {
                    // Country input
                }
                <Label className="font-bold">Country:</Label>
                <div className="flex flex-row">
                    {
                        // Country selector
                    }
                    <CountrySelector
                        className="h-full"
                        selectedCountry={props.address!.country}
                        onSelect={(country) => props.setAddress({ city: props.address.city, country: country.iso2 })} />
                    {
                        // Country name
                    }
                    <Input
                        className="input input-bordered rounded-l-none p-2 h-full flex-1"
                        contentEditable={false}
                        value={addressName} readOnly />
                </div>
            </Field>
        </>
    )
}