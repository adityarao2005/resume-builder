import ReduxProvider from "@/state/redux-provider"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <ReduxProvider>{children}</ReduxProvider>
}