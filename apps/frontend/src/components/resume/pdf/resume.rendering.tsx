import { Resume, Common } from "@/models/types";
import { Document, Page, View, Text, Link } from "@react-pdf/renderer";
import { styles } from "./resume.style";
import { Components } from './resume.components';
import { MediaIcon } from './resume.icons';

function Name({ name }: { name: string }) {
    return (<View style={styles.title}>
        <Text>{name}</Text>
    </View>);
}

function ContactInfo({ contactInfo }: { contactInfo: Resume.IContactInfo }) {
    return (<View style={styles.contactInfo}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <MediaIcon type='Phone' />
            <Text>&nbsp; {contactInfo.phone} |&nbsp;</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <MediaIcon type="Email" />
            <Text>&nbsp;
                <Link src={"mailto:" + contactInfo.email}>{contactInfo.email}</Link> | &nbsp;
            </Text>
        </View>

        {
            contactInfo.mediaProfiles.map(([type, data], index, array) => (
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <MediaIcon type={type} />

                    <Text>&nbsp;
                        <Components.PDFLink src={data} /> {index != array.length - 1 && "|"} &nbsp;
                    </Text>
                </View>
            ))
        }
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

function EducationEntry({ entry }: { entry: Resume.IEducationEntry }) {
    // Create the list of items to be displayed
    const list = [];
    entry.courses.length > 0 && list.push("Relavent Courses: " + entry.courses.join(", "));
    entry.awards.length > 0 && list.push("Awards: " + entry.awards.map(award => award.title).join(", "));
    list.push(...entry.description.lines);

    return (
        <View wrap={false}>
            <View style={styles.splitSection}>
                <View style={styles.leftSection}>
                    <Text style={{ ...styles.text, fontWeight: 'bold' }}>{entry.institution}</Text>
                    <Text style={styles.text}>{entry.degree} of {entry.discipline}</Text>
                </View>
                <View style={styles.rightSection}>
                    <Text style={styles.text}>{entry.location.city}, {entry.location.country}</Text>
                    <Text style={styles.text}>{formatDate(entry.duration.start)} - {formatDate(entry.duration.end)}</Text>
                </View>
            </View>
            <Components.List type={"bullet"} items={list} />
        </View>
    )
}

function Education({ education }: { education: Resume.IEducationEntry[] }) {
    return (
        <Components.Section title="Education">
            {education.map(entry => <EducationEntry entry={entry} />)}
        </Components.Section>
    )
}

function ExperienceEntry({ entry }: { entry: Resume.IExperience }) {
    return (<View wrap={false}>
        <View style={styles.splitSection}>
            <View style={styles.leftSection}>
                <Text style={{ ...styles.text, fontWeight: 'bold' }}>{entry.title}</Text>
                <Text style={styles.text}>{entry.company}</Text>
            </View>
            <View style={styles.rightSection}>
                <Text style={styles.text}>{entry.location.city}, {entry.location.country}</Text>
                <Text style={styles.text}>{formatDate(entry.duration.start)} - {formatDate(entry.duration.end)}</Text>
            </View>
        </View>
        <Components.List type={"bullet"} items={entry.description.lines} />
    </View>)
}

function Experience({ experience }: { experience: Resume.IExperience[] }) {
    return (
        <Components.Section title="Experience">
            {experience.map(entry => <ExperienceEntry entry={entry} />)}
        </Components.Section>
    )
}

function Projects({ projects }: { projects: Resume.IProject[] }) {
    return (
        <Components.Section title="Projects">
            {projects.map(entry => (
                <View wrap={false}>
                    <View style={styles.splitSection}>
                        <View style={styles.leftSection}>
                            <Text style={{ ...styles.text, fontWeight: 'bold' }}>{entry.title}</Text>
                        </View>
                        <View style={styles.rightSection}>
                            <Text style={styles.text}>{formatDate(entry.duration.start)} - {formatDate(entry.duration.end)}</Text>
                        </View>
                    </View>
                    <Components.List type={"bullet"} items={entry.description.lines} />
                </View>
            ))}
        </Components.Section>
    )
}

function ExtraCurricular({ experience }: { experience: Resume.IExperience[] }) {
    return (
        <Components.Section title="Extra Curricular">
            {experience.map(entry => <ExperienceEntry entry={entry} />)}
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
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ ...styles.text, fontWeight: 'bold' }}>{entry[0]}:</Text>
                    <Text style={styles.text}>&nbsp;{entry[1].join(',')}</Text>
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
                            <Text style={{ ...styles.text, fontWeight: 'bold' }}>{award.title}</Text>
                        </View>
                        <View style={styles.rightSection}>
                            <Text style={styles.text}>{formatDate(award.date)}</Text>
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
            <View><Text style={styles.text}>{hobbies.join(', ')}</Text></View>
        </Components.Section>
    )
}

export default function RenderResumeDocument({ document }: { document: Resume.ResumeDetails }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Name name={document.name} />
                <ContactInfo contactInfo={document.contactInfo} />
                {document.highlights && <Highlights highlights={document.highlights} />}
                <Education education={document.education} />
                {document.experiences && <Experience experience={document.experiences} />}
                {document.projects && <Projects projects={document.projects} />}
                {document.extraCurriculars && <ExtraCurricular experience={document.extraCurriculars} />}
                {document.skills && <Skills skills={document.skills} />}
                {document.awards && <Awards awards={document.awards} />}
                {document.hobbies && <Hobbies hobbies={document.hobbies} />}
            </Page>
        </Document>
    );
}