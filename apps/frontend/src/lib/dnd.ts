import { DragEvent, DragEventHandler, useRef } from "react";

export interface IDragAndDropProxy {
    dragStart: (event: DragEvent, index: number) => void;
    dragEnter: (event: DragEvent, index: number) => void;
    dragEnd: DragEventHandler;
}

export interface IDragAndDrop {
    dragStart: DragEventHandler;
    dragEnter: DragEventHandler;
    dragEnd: DragEventHandler;
}

export function useDragAndDrop(items: any[], setItems: (items: any[]) => void): IDragAndDropProxy {
    const dragItem = useRef<number | null>();
    const dragOverItem = useRef<number | null>();

    const dragStart = (event: DragEvent, index: number) => {
        dragItem.current = index;
    }

    const dragEnter = (event: DragEvent, index: number) => {
        dragOverItem.current = index;
    }

    const dragEnd = async () => {
        const copy = [...items];

        const draggedItemContent = copy[dragItem.current!];
        copy.splice(dragItem.current!, 1);
        copy.splice(dragOverItem.current!, 0, draggedItemContent);

        dragItem.current = null;
        dragOverItem.current = null;
        setItems(copy);
    }

    return { dragStart, dragEnter, dragEnd };
}