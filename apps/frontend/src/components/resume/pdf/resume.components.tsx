import { Line, Link, Svg, Text, View } from "@react-pdf/renderer";
import { styles } from "./resume.style";
import { PropsWithChildren } from "react";



export namespace Components {

    export function LineBreak() {
        return (<View style={{ flexDirection: 'row' }}>
            <Svg height={5} style={{ flexGrow: 1 }}>
                <Line x1="0" y1="5" x2="600" y2="5" strokeWidth={1} stroke="rgb(0,0,0)" />
            </Svg>
        </View>);
    }


    export function PDFLink(props: { src: string }) {
        return (<Link src={props.src}>{props.src}</Link>)
    }

    export function Section(props: PropsWithChildren<{ title: string }>) {
        return (
            <View style={styles.section}>
                <View>
                    <Text style={styles.sectionTitle}>{props.title}</Text>
                    <LineBreak />
                </View>
                <View style={{ padding: 5 }}>
                    {props.children}
                </View>
            </View>
        )
    }

    export function List(props: { items: string[], type: 'bullet' | 'ordered' | 'dashed' }) {
        return (
            <View style={{ flexDirection: 'column', marginTop: 5 }}>
                {props.items.map((item, index) => (
                    <View key={index} style={{ flexDirection: "row", marginBottom: 0, fontSize: 14 }}>
                        {props.type === 'bullet' && <Text style={{ marginHorizontal: 8 }}>•</Text>}
                        {props.type === 'ordered' && <Text style={{ marginHorizontal: 8 }}>{index + 1}.</Text>}
                        {props.type === 'dashed' && <Text style={{ marginHorizontal: 8 }}>-</Text>}
                        <Text style={{ ...styles.text, marginRight: 10, paddingRight: 10 }}>{item}</Text>
                    </View>
                ))}
            </View>
        )
    }
}   