import { Text, View } from '@react-pdf/renderer';

export function CenterHorizontal({ children }: React.PropsWithChildren<{}>) {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {children}
        </View>
    )
}

export function CenterVertical({ children }: React.PropsWithChildren<{}>) {
    return (
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            {children}
        </View>
    )
}

export function Center({ children }: React.PropsWithChildren<{}>) {
    return (
        <CenterHorizontal>
            <CenterVertical>
                {children}
            </CenterVertical>
        </CenterHorizontal>
    )
}

export function Title({ children }: React.PropsWithChildren<{}>) {
    return (
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{children}</Text>
    )
}

export function Section({ children }: React.PropsWithChildren<{}>) {
    return (
        <View style={{ margin: 10, padding: 10 }}>
            {children}
        </View>
    )
}

export function SectionTitle({ children }: React.PropsWithChildren<{}>) {
    return (
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{children}</Text>
    )
}

export function SectionContent({ children, ...props }: React.PropsWithChildren<{}>) {
    return (
        <Text style={{ fontSize: 14, ...props }}>{children}</Text>
    )
}

export function SectionList({ children }: React.PropsWithChildren<{}>) {
    return (
        <View style={{ flexDirection: 'column' }}>
            {children}
        </View>
    )
}

export function SectionListItem({ children }: React.PropsWithChildren<{}>) {
    return (
        <View style={{ flexDirection: "row", marginBottom: 4, fontSize: 14 }}>
            <Text style={{ marginHorizontal: 8 }}>•</Text>
            <Text>{children}</Text>
        </View>
    )
}

export function Stretch() {
    return (<View style={{ flex: 1 }}></View>)
}

export function FlexView({ children }: React.PropsWithChildren<{}>) {
    return (<View style={{ flexDirection: 'row' }}>{children}</View>)
}