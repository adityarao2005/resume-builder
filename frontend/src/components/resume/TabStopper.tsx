import { Button } from "@headlessui/react";

export default function TabStopper({ text, action }: { text: string, action: () => void }) {
    return (
        <Button className="btn" onClick={action}>
            ✕
            <div className="badge">{text}</div>
        </Button>
    );
}