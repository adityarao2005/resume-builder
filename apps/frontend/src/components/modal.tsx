import { PropsWithChildren } from "react";

export function showModal(name: string) {
    const modal = document.getElementById(name) as HTMLDialogElement;
    modal?.showModal();
}

export default function Modal({ children, name, title }: PropsWithChildren<{ name: string, title: string }>) {
    return (
        <dialog id={name} className="modal">
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">{title}</h3>
                <div className="py-4">{children}</div>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}