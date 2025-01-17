import { Button } from "@headlessui/react";
import { PropsWithChildren, ReactNode, useState } from "react";

export default function Pagination({ children, pages }: { pages: number, children: Iterable<ReactNode> }) {
    const [page, setPage] = useState(1);

    return (
        <>
            <div className="flex flex-row py-1">
                <Button type="button" className={`btn btn-primary cursor-pointer`} disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
                <div className="flex-1" />
                <div className="join">
                    {
                        [...Array(pages).keys()].map((i) => (
                            <Button key={i} type="button" className={`join-item btn ${page === i + 1 && 'btn-active'}`} onClick={() => setPage(i + 1)}>{i + 1}</Button>
                        ))
                    }
                </div>
                <div className="flex-1" />
                <Button type="button" className={`btn btn-primary cursor-pointer`} disabled={page === pages} onClick={() => setPage(page + 1)}>Next</Button>
            </div>

            {[...children].map((child, i) => (<Pages hidden={page !== i + 1} key={i}>{child}</Pages>))}
        </>
    )
}

export function Pages({ children, hidden }: PropsWithChildren<{ hidden: boolean }>) {
    return (
        <div className={`py-2 flex-1 ${hidden && 'hidden'}`}>
            {children}
        </div>
    )
}