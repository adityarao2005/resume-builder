import Link from "next/link";
import { PropsWithChildren } from "react";

export function NavLink(props: PropsWithChildren<{ href: string }>) {
    return (<li><Link href={props.href}>{props.children}</Link></li>);
}

export function NavLinkParent(props: PropsWithChildren<{ title: string }>) {
    return (<li><details><summary>{props.title}</summary><ul className="bg-base-100 rounded-t-none p-2">{props.children}</ul></details></li>);
}

export function NavMenu(props: PropsWithChildren<{}>) {
    return (<div className="flex-none"><ul className="menu menu-horizontal px-1">{props.children}</ul></div>);
}

export function NavHeader(props: PropsWithChildren<{ href: string }>) {
    return (<div className="flex-1">
        <Link className="btn btn-ghost text-xl" href={props.href}>{props.children}</Link>
    </div>);
}