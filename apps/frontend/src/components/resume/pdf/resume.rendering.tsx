import { Resume, Common } from "@/models/types";
import { Document, Page, View, Text, Link } from "@react-pdf/renderer";
import { styles } from "./resume.style";
import { Components } from './resume.components';
import { MediaIcon } from './resume.icons';
import { defaultCountries, parseCountry } from 'react-international-phone';
import { convertISOAddressToName } from "@/components/resume/editor/addressEditor";

// TODO: Replace the styles from resume.style.ts with the styles provided from the user
// ALlow the user to customize the styles of the resume including whether they want to wrap the sub section or not
// and line spacing, font size, font family, background color, formatting of the text, etc.


function Name({ name }: { name: string }) {
    return (<View style={styles.title}>
        <Text>{name}</Text>
    </View>);
}

function ContactInfo({ contactInfo }: { contactInfo: Resume.IContactInfo }) {
    const profiles = [...contactInfo.mediaProfiles.entries()].filter(([type, data]) => data.trim().length > 0);
    const addressName = contactInfo.address ? convertISOAddressToName(contactInfo.address) : '';

    return (
        <View style={styles.contactInfo}>
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
                contactInfo.address &&
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <MediaIcon type="Address" />
                    <Text>&nbsp;{contactInfo.address.city}, {addressName} | &nbsp;</Text>
                </View>
            }

            {
                profiles.map(([type, data], index, array) => (
                    <View key={data} style={{ flexDirection: 'row', justifyContent: 'center' }}>
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
    list.push(...entry.description.lines);

    return (
        // 
        <View wrap={false}>
            <View style={styles.splitSection}>
                <View style={styles.leftSection}>
                    <Text style={{ ...styles.text, fontWeight: 'bold' }}>{entry.institution}</Text>
                    <Text style={styles.text}>{entry.degree} of {entry.discipline}</Text>
                </View>
                <View style={styles.rightSection}>
                    <Text style={styles.text}>{entry.location.city}, {convertISOAddressToName(entry.location)}</Text>
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
            {education.map(entry => <EducationEntry key={entry.degree + entry.discipline} entry={entry} />)}
        </Components.Section>
    )
}

function ExperienceEntry({ entry }: { entry: Resume.IExperience }) {
    console.log(entry.location);
    return (<View wrap={false}>
        <View style={styles.splitSection}>
            <View style={styles.leftSection}>
                <Text style={{ ...styles.text, fontWeight: 'bold' }}>{entry.title}</Text>
                <Text style={styles.text}>{entry.company}</Text>
            </View>
            <View style={styles.rightSection}>
                <Text style={styles.text}>{entry.location.city}, {convertISOAddressToName(entry.location)}</Text>
                <Text style={styles.text}>{formatDate(entry.duration.start)} - {formatDate(entry.duration.end)}</Text>
            </View>
        </View>
        <Components.List type={"bullet"} items={entry.description.lines} />
    </View>)
}

function Experience({ experience }: { experience: Resume.IExperience[] }) {
    return (
        <Components.Section title="Experience">
            {experience.map(entry => <ExperienceEntry key={entry.title + entry.company} entry={entry} />)}
        </Components.Section>
    )
}

function Projects({ projects }: { projects: Resume.IProject[] }) {
    return (
        <Components.Section title="Projects">
            {projects.map(entry => (
                <View key={entry.title} wrap={false}>
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
            {experience.map(entry => <ExperienceEntry key={entry.title + entry.company} entry={entry} />)}
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
                <View key={entry[0]} style={{ flexDirection: 'row' }}>
                    <Text style={{ ...styles.text, fontWeight: 'bold' }}>{entry[0]}:</Text>
                    <Text style={styles.text}>&nbsp;{entry[1].join(', ')}</Text>
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
                    <View key={award.title} style={styles.splitSection}>
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
                {document.highlights.lines.length > 0 && <Highlights highlights={document.highlights} />}
                <Education education={document.education} />
                {document.experiences.length > 0 && <Experience experience={document.experiences} />}
                {document.projects.length > 0 && <Projects projects={document.projects} />}
                {document.extraCurriculars.length > 0 && <ExtraCurricular experience={document.extraCurriculars} />}
                {document.skills.length > 0 && <Skills skills={document.skills} />}
                {document.awards.length > 0 && <Awards awards={document.awards} />}
                {document.hobbies.length > 0 && <Hobbies hobbies={document.hobbies} />}
            </Page>
        </Document>
    );
}