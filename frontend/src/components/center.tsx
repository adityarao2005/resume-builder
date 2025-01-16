import { PropsWithChildren } from "react";

// Center component
export default function Center({ children }: PropsWithChildren<{}>) {
    return (
        <div className="flex flex-1 flex-col">
            <div className="flex-1"></div>
            <div className="flex flex-row">
                <div className="flex-1"></div>
                {children}
                <div className="flex-1"></div>
            </div>
            <div className="flex-1"></div>
        </div>
    );
}