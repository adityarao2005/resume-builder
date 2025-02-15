import { IDragAndDrop } from "@/components/dnd";
import { PropsWithChildren, useRef } from "react";
import { DraggableCollapsable } from "./collapsableContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faGripVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal, { showModal } from "../modal";
import { randomBytes } from "crypto";

// Editor properties, has title and what to do when it is destroyed
export interface IEditorPropsFragment {
    destructor: () => void;
    title: string;
}

// Editor properties, has drag and drop functionality
export type IEditorProps = PropsWithChildren<IEditorPropsFragment & IDragAndDrop>;

// Collapsable editor component
export function CollapsableEditor(props: IEditorProps & { id: string }) {
    // Render a collapsable editor component where the editor appears as a dropdown component underneath the card
    return (<DraggableCollapsable
        title={props.title}
        color="bg-base-100"
        dragEnd={props.dragEnd}
        dragEnter={props.dragEnter}
        dragStart={props.dragStart}
        deleteValue={props.destructor}>
        {props.children}
    </DraggableCollapsable>);
}


export function ModalEditor(props: IEditorProps & { id: string }) {
    // Render a modal editor component where the editor appears as a modal
    return (
        <div>
            <div className="border-base-300 border bg-base-100 shadow-md rounded-xl flex flex-row p-3 space-x-2"
                onDragEnd={props.dragEnd}
                onDragEnter={props.dragEnter}
                onDragStart={props.dragStart}
                onDragOver={(e) => e.preventDefault()}
                draggable>
                <h3 className="text-xl font-bold flex-1">{props.title}</h3>
                {
                    // Implement trash button
                }
                <div className="flex flex-col">
                    <div className="flex-1" />
                    <FontAwesomeIcon icon={faTrash} onClick={props.destructor} className="text-xl hover:cursor-pointer" />
                    <div className="flex-1" />
                </div>
                {
                    // Implement edit button
                }
                <div className="flex flex-col">
                    <div className="flex-1" />
                    <FontAwesomeIcon icon={faEdit} onClick={() => showModal(props.id!)} className="text-xl hover:cursor-pointer" />
                    <div className="flex-1" />
                </div>
                {
                    // Implement drag handle
                }
                <div className="flex flex-col">
                    <div className="flex-1" />
                    <FontAwesomeIcon icon={faGripVertical} className="text-xl hover:cursor-move" />
                    <div className="flex-1" />
                </div>
            </div>
            <Modal name={props.id!} title={props.title}>
                {props.children}
            </Modal>
        </div>
    );
}

// Editor component
export default function Editor(props: IEditorProps & { id?: string }) {
    if (props.id)
        return <ModalEditor {...props} id={props.id} />;
    else
        return <ModalEditor {...props} id={randomBytes(16).toString('hex')} />;
}