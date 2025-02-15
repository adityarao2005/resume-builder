import { Resume, Common } from "@/models/types";
import { Document, Page, View, Text, Link } from "@react-pdf/renderer";
import { styles } from "./resume.style";
import { Components } from './resume.components';
import { MediaIcon } from './resume.icons';
import { convertISOAddressToName } from "@/components/editor/addressEditor";

// TODO: Replace the styles from resume.style.ts with the styles provided from the user
// ALlow the user to customize the styles of the resume including whether they want to wrap the sub section or not
// and line spacing, font size, font family, background color, formatting of the text, etc.

// Name component of resume
function Name({ name }: { name: string }) {
    return (<View style={styles.title}>
        <Text>{name}</Text>
    </View>);
}

// Contact information component of resume
function ContactInfo({ contactInfo }: { contactInfo: Resume.IContactInfo }) {
    const profiles = [...contactInfo.mediaProfiles];
    const addressName = contactInfo.address ? convertISOAddressToName(contactInfo.address) : '';

    return (
        <View style={styles.contactInfo}>
            {
                contactInfo.address &&
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <MediaIcon type="Address" />
                    <Text>&nbsp;{contactInfo.address.city}, {addressName} | &nbsp;</Text>
                </View>
            }

            {
                profiles.map(({ platform, handle }, index, array) => (
                    <View key={handle} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <MediaIcon type={platform} />

                        <Text>&nbsp;
                            <Components.PDFLink src={handle} /> {index != array.length - 1 && "|"} &nbsp;
                        </Text>
                    </View>
                ))
            }
        </View>)
}

// Highlights component of resume
function Highlights({ highlights }: { highlights: Common.IDescription }) {
    return (
        <Components.Section title="Highlights Of Qualification">
            <Components.List type={"bullet"} items={highlights} />
        </Components.Section>
    )
}

// Format the date
function formatDate(date: string) {
    const [year, month] = date.split('-');

    // Convert the month to a string
    switch (month) {
        case '01': return `Jan ${year}`;
        case '02': return `Feb ${year}`;
        case '03': return `Mar ${year}`;
        case '04': return `Apr ${year}`;
        case '05': return `May ${year}`;
        case '06': return `Jun ${year}`;
        case '07': return `Jul ${year}`;
        case '08': return `Aug ${year}`;
        case '09': return `Sep ${year}`;
        case '10': return `Oct ${year}`;
        case '11': return `Nov ${year}`;
        case '12': return `Dec ${year}`;
    }

    return `${month} ${year}`;
}

// Education entry component of resume
function EducationEntry({ entry }: { entry: Resume.IEducationEntry }) {
    // Create the list of items to be displayed
    const list = [];
    entry.courses.length > 0 && list.push("Relavent Courses: " + entry.courses.join(", "));
    list.push(...entry.description);

    return (
        // 
        <View wrap={false}>
            <View style={styles.splitSection}>
                <View style={styles.leftSection}>
                    <Text style={{ ...styles.text, fontWeight: 'bold' }}>{entry.institution}</Text>
                    <Text style={styles.text}>{entry.qualification}</Text>
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

// Education component of resume
function Education({ education }: { education: Resume.IEducationEntry[] }) {
    return (
        <Components.Section title="Education">
            {education.map(entry => <EducationEntry key={entry.qualification} entry={entry} />)}
        </Components.Section>
    )
}

// Experience entry component of resume
function ExperienceEntry({ entry }: { entry: Resume.IExperience }) {
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
        <Components.List type={"bullet"} items={entry.description} />
    </View>)
}

// Experience component of resume
function Experience({ experience }: { experience: Resume.IExperience[] }) {
    return (
        <Components.Section title="Experience">
            {experience.map(entry => <ExperienceEntry key={entry.title + entry.company} entry={entry} />)}
        </Components.Section>
    )
}

// Projects component of resume
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
                    <Components.List type={"bullet"} items={entry.description} />
                </View>
            ))}
        </Components.Section>
    )
}

// Extra curricular component of resume
function ExtraCurricular({ experience }: { experience: Resume.IExperience[] }) {
    return (
        <Components.Section title="Extra Curricular">
            {experience.map(entry => <ExperienceEntry key={entry.title + entry.company} entry={entry} />)}
        </Components.Section>
    )
}

// Skills component of resume
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

// Awards component of resume
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
                            <Text style={styles.text}>{award.date}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </Components.Section>
    );
}

// Hobbies component of resume
function Hobbies({ hobbies }: { hobbies: string[] }) {
    return (
        <Components.Section title="Hobbies">
            <View><Text style={styles.text}>{hobbies.join(', ')}</Text></View>
        </Components.Section>
    )
}

export default function RenderResumeDocument({ document }: { document: Resume.ResumeData }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Name name={document.name} />
                <ContactInfo contactInfo={document.contactInfo} />
                {document.highlights.length > 0 && <Highlights highlights={document.highlights} />}
                {document.education.length > 0 && <Education education={document.education} />}
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