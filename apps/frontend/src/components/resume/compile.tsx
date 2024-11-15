import { useAppSelector } from "@/state/store";
import { useStompClient } from "react-stomp-hooks";

export function compileResume() {
    const client = useStompClient();
    const resumeState = useAppSelector((state) => state.resume);

    client?.publish({
        destination: `/app/resume/compile`,
        body: JSON.stringify({
            resume: resumeState,
            format: "JSON"
        }),
        headers: {
            "content-type": "application/json",
        }
    })
}