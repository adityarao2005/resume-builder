import { IDragAndDrop } from "@/lib/dnd";
import { Field, Fieldset } from "@headlessui/react";
import { DragEventHandler, PropsWithChildren } from "react";

// Collapsable container
export default function Collapsable({ title, children, color = "bg-base-200" }: PropsWithChildren<{ title: string, color?: string }>) {
    return (
        <details className={`collapse collapse-arrow border-base-300 border ${color} shadow-md`}>
            <summary className="collapse-title text-xl font-bold">{title}</summary>
            <div className="collapse-content space-y-2">{children}</div>
        </details>
    );
}

// Collapsable container
export function DraggableCollapsable(
    { title, children, color = "bg-base-200", dragStart, dragEnter, dragEnd }:
        PropsWithChildren<{ title: string, color?: string } & IDragAndDrop>
) {
    return (
        <details className={`collapse collapse-arrow border-base-300 border ${color} shadow-md`}
            draggable onDragStart={dragStart} onDragEnter={dragEnter} onDragEnd={dragEnd}>
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