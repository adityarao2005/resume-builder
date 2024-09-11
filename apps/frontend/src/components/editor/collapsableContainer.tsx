import { Field, Fieldset } from "@headlessui/react";
import { PropsWithChildren } from "react";

// Collapsable container
export default function Collapsable({ title, children }: PropsWithChildren<{ title: string }>) {
    return (
        <details className="collapse collapse-arrow border-base-300 border bg-base-200 shadow-md">
            <summary className="collapse-title text-xl font-bold">{title}</summary>
            <div className="collapse-content space-y-2">{children}</div>
        </details>
    );
}

export function CollapsableField({ title, children }: PropsWithChildren<{ title: string }>) {
    return (
        <details className="collapse collapse-arrow border-base-300 border bg-base-100 shadow-md">
            <summary className="collapse-title text-xl font-bold">{title}</summary>
            <div className="collapse-content space-y-2">{children}</div>
        </details>
    );
}