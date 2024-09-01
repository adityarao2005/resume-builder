"use client"
import React from 'react';
import { Document, Page, View, Text, Font, Line, Link, Svg, Path, Image } from '@react-pdf/renderer';
import { styles } from './resume.style';
import { PhoneIcon, MailIcon, LinkedInIcon, GithubIcon, UserIcon } from './resume.icons';

function PDFLink(props: { src: string }) {
    return (<Link src={props.src}>{props.src}</Link>)
}

function LineBreak() {
    return (<View style={{ flexDirection: 'row' }}>
        <Svg height={5} style={{ flexGrow: 1 }}>
            <Line x1="0" y1="5" x2="600" y2="5" strokeWidth={1} stroke="rgb(0,0,0)" />
        </Svg>
    </View>);
}

const data = {
    name: "Aditya Rao",
    contactInfo: {
        phone: "647-978-3730",
        email: "raoa32@mcmaster.ca",
        linkedin: "https://www.linkedin.com/in/aditya-g-rao",
        github: "https://github.com/adityarao2005",
        portfolio: "https://adityarao-portfolio.vercel.app"
    },
    education: [
        {
            institution: "McMaster University",
            school: "McMaster University, Hamilton, ON",
            degree: "Bachelor of Engineering CO-OP",
            major: "Majoring in Software Engineering",
            date: "Sept 2023 - April 2028"
        }
    ]
}

// Create Document Component
export const ResumeDocument = (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.title}>
                <Text>{data.name}</Text>
            </View>
            <View style={styles.contactInfo}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <PhoneIcon />
                    <Text>&nbsp; {data.contactInfo.phone} | </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <MailIcon />
                    <Text>&nbsp;
                        <PDFLink src={data.contactInfo.email} /> | &nbsp;
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <LinkedInIcon />
                    <Text>&nbsp;
                        <PDFLink src="https://www.linkedin.com/in/aditya-g-rao" /> | &nbsp;
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <GithubIcon />
                    <Text>&nbsp;
                        <PDFLink src="https://github.com/adityarao2005" /> | &nbsp;
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <UserIcon />
                    <Text>&nbsp;
                        <PDFLink src="https://adityarao-portfolio.vercel.app" />
                    </Text>
                </View>
            </View>
            <View style={styles.section}>
                <View>
                    <Text style={styles.sectionTitle}>Education</Text>
                    <LineBreak />
                </View>
                <View style={{ padding: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexGrow: 1 }}>
                            <Text style={styles.text}>McMaster University, Hamilton, ON</Text>
                            <Text style={styles.text}>Bachelor of Engineering CO-OP, GPA: 4.0 first year</Text>
                            <Text style={styles.text}>Majoring in Software Engineering</Text>
                        </View>
                        <Text style={styles.text}>Sept 2023 - April 2028</Text>
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <View>
                    <Text style={styles.sectionTitle}>Experience</Text>
                    <LineBreak />
                </View>
                <View style={{ padding: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexGrow: 1 }}>
                            <Text style={{ ...styles.text, fontWeight: 'bold' }}>Medium AI</Text>
                            <Text style={styles.text}>Full-stack Developer Part-Time Intern (unpaid)</Text>
                        </View>
                        <Text style={styles.text}>May 2024 – Aug 2024</Text>
                    </View>
                    <View style={{ flexDirection: 'column', marginTop: 5 }}>
                        <View style={{ flexDirection: "row", marginBottom: 0, fontSize: 14 }}>
                            <Text style={{ marginHorizontal: 8 }}>•</Text>
                            <Text style={{ ...styles.text, marginRight: 10, paddingRight: 10 }}>Medium AI is a startup company created by McMaster students which is being incubated and supported by the McMaster Forge Startup Survivor Program</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginBottom: 0, fontSize: 14 }}>
                            <Text style={{ marginHorizontal: 8 }}>•</Text>
                            <Text style={{ ...styles.text, marginRight: 10, paddingRight: 10 }}>The product being developed at Medium AI is a tool which helps doctors create a transcript of their doctor-patient conversation and also provides doctors with some potential diagnoses as well as some solutions to address the patient’s issue</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginBottom: 0, fontSize: 14 }}>
                            <Text style={{ marginHorizontal: 8 }}>•</Text>
                            <Text style={{ ...styles.text, marginRight: 10, paddingRight: 10 }}>My role as a Full-stack developer part-time intern was to create mock servers, handle online webm to wav conversion with ffmpeg, migrate from Flask to aiohttp, and migrate from older frameworks to newer and more robust frameworks which allow for transcription and diagnosis in real-time</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Page>
    </Document>)
