import { Button } from "@headlessui/react";

// PlusButton component via svg button
export default function PlusButton() {
    return (<Button className="btn btn-circle">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 0 L12 24 M0 12 L24 12" />
        </svg>
    </Button>)
}