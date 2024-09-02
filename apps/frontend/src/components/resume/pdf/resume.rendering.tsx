import { Resume, Common } from "@/models/types";
import { Document, Page, View, Text } from "@react-pdf/renderer";
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

function Highlights({ highlights }: { highlights: Common.IDescription }) {
    return (
        <Components.Section title="Highlights Of Qualification">
            <Components.List type={"bullet"} items={highlights.lines} />
        </Components.Section>
    )
}

function formatDate(date: Date) {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function Education({ education }: { education: Resume.IEducationEntry[] }) {
    return (
        <Components.Section title="Education">
            {education.map(entry => (
                <View>
                    <View style={styles.splitSection}>
                        <View style={styles.leftSection}>
                            <Text style={styles.entryTitle}>{entry.institution}</Text>
                            <Text>{entry.degree} of {entry.discipline}</Text>
                        </View>
                        <View>
                            <Text>{entry.location.city}, {entry.location.country}</Text>
                            <Text>{formatDate(entry.duration.start)} - {formatDate(entry.duration.end)}</Text>
                        </View>
                    </View>
                    <Components.List type={"bullet"} items={entry.description.lines} />
                </View>
            ))}
        </Components.Section>
    )
}

function Experience({ experience }: { experience: Resume.IExperience[] }) {
    return (
        <Components.Section title="Experience">
            {experience.map(entry => (
                <View>
                    <View style={styles.splitSection}>
                        <View style={styles.leftSection}>
                            <Text style={styles.entryTitle}>{entry.title}</Text>
                            <Text>{entry.company}</Text>
                        </View>
                        <View>
                            <Text>{entry.location.city}, {entry.location.country}</Text>
                            <Text>{formatDate(entry.duration.start)} - {formatDate(entry.duration.end)}</Text>
                        </View>
                    </View>
                    <Components.List type={"bullet"} items={entry.description.lines} />
                </View>
            ))}
        </Components.Section>
    )
}

function Projects({ projects }: { projects: Resume.IProject[] }) {
    return (
        <Components.Section title="Projects">
            {projects.map(entry => (
                <View>
                    <View style={styles.splitSection}>
                        <View style={styles.leftSection}>
                            <Text style={styles.entryTitle}>{entry.title}</Text>
                        </View>
                        <View>
                            <Text>{formatDate(entry.duration.start)} - {formatDate(entry.duration.end)}</Text>
                        </View>
                    </View>
                    <Components.List type={"bullet"} items={entry.description.lines} />
                </View>
            ))}
        </Components.Section>
    )
}

function Skills({ skills }: { skills: Resume.ISkill[] }) {
    const map = new Map<string, string[]>();

    skills.forEach(skill => {
        if (!map.has(skill.type)) {
            map.set(skill.type, []);
        }
        map.get(skill.type)!.push(skill.name);
    });

    return (
        <Components.Section title="Skills">
            {Array.from(map.entries()).map(entry => (
                <View>
                    <Text style={{ ...styles.text, fontWeight: 'bold' }}>{entry[0]}:</Text>
                    <Text style={styles.text}>{entry[1].join(',')}</Text>
                </View>
            ), [])}
        </Components.Section>
    )
}

function Awards({ awards }: { awards: Common.IAward[] }) {
    return (
        <Components.Section title="Awards and Achievements">
            <View>
                {awards.map(award => (
                    <View style={styles.splitSection}>
                        <View style={{ ...styles.leftSection, fontWeight: 'bold' }}>
                            <Text style={styles.entryTitle}>{award.title}</Text>
                        </View>
                        <View>
                            <Text>{formatDate(award.date)}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </Components.Section>
    );
}

function Hobbies({ hobbies }: { hobbies: string[] }) {
    return (
        <Components.Section title="Hobbies">
            <View><Text>{hobbies.join(', ')}</Text></View>
        </Components.Section>
    )
}

export default function RenderResumeDocument(document: Resume.ResumeDetails) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Name name={document.name} />
                <ContactInfo contactInfo={document.contactInfo} />
                {document.highlights && <Highlights highlights={document.highlights} />}
                <Education education={document.education} />
                {document.experiences && <Experience experience={document.experiences} />}
                {document.projects && <Projects projects={document.projects} />}
                {document.extraCurriculars && <Experience experience={document.extraCurriculars} />}
                {document.skills && <Skills skills={document.skills} />}
                {document.awards && <Awards awards={document.awards} />}
                {document.hobbies && <Hobbies hobbies={document.hobbies} />}
            </Page>
        </Document>
    );
}