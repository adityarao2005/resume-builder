import { Resume } from "@/models/types";
import { Document, Page, View, Text, Svg, Line } from "@react-pdf/renderer";
import { styles } from "./resume.style";
import { Components } from './resume.components';
import { MediaIcon } from './resume.icons';

function Name({ name }: { name: string }) {
    return (<View style={styles.title}>
        <Text>{name}</Text>
    </View>);
}

function ContactInfoEntry(props: { type: Resume.MediaProfile | 'Phone' | 'Email', data: string, last?: boolean }) {
    return (<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <MediaIcon type={props.type} />
        <Text>&nbsp; {props.data} {!props.last && "|"}</Text>
    </View>);
}

function ContactInfo({ contactInfo }: { contactInfo: Resume.IContactInfo }) {
    return (<View style={styles.contactInfo}>
        <ContactInfoEntry type="Phone" data={contactInfo.phone} />
        {
            contactInfo.mediaProfiles.map(([type, data]) => (
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <MediaIcon type={type} />
                    <Text>&nbsp;
                        <Components.PDFLink src={data} /> | &nbsp;
                    </Text>
                </View>
            ))
        }
        <ContactInfoEntry type="Email" data={contactInfo.email} last={true} />
    </View>)
}

function Education({ education }: { education: Resume.IEducationEntry }) {
    return (
        <View style={styles.section}>

        </View>
    )
}

function RenderResumeDocument(document: Resume.ResumeDetails) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Name name={document.name} />
                <ContactInfo contactInfo={document.contactInfo} />
            </Page>
        </Document>
    );
}