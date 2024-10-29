import { IDragAndDrop } from "@/components/dnd";
import { PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
    { title, children, color = "bg-base-200", dragStart, dragEnter, dragEnd, deleteValue }:
        PropsWithChildren<{ title: string, color?: string, deleteValue?: () => void } & IDragAndDrop>
) {
    return (
        <details className={`collapse collapse-arrow border-base-300 border ${color} shadow-md`}
            draggable onDragStart={dragStart} onDragEnter={dragEnter} onDragEnd={dragEnd}>
            <summary className="collapse-title text-xl font-bold">
                <div className="w-full flex flex-row">
                    <div className="flex-1">{title}</div>
                    {
                        // Implement trash button
                    }
                    <FontAwesomeIcon icon={faTrash} onClick={deleteValue} />
                </div>
            </summary>
            <div className="collapse-content space-y-2">{children}</div>
        </details>
    );
}

// Field which collapses
export function CollapsableField({ title, children }: PropsWithChildren<{ title: string }>) {
    return (
        <details className="collapse collapse-arrow border-base-300 border bg-base-100 shadow-md">
            <summary className="collapse-title text-xl font-bold">{title}</summary>
            <div className="collapse-content space-y-2">{children}</div>
        </details>
    );
}