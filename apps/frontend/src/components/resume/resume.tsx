"use client"
import React from 'react';
import { CenterHorizontal, FlexView, Section, SectionContent, SectionList, SectionListItem, SectionTitle, Stretch, Title } from '@/components/resume/pdf/mechanics';
import { Document, Page, View, StyleSheet } from '@/lib/react-pdf';
import { Line, Link, Svg } from '@react-pdf/renderer';


// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF'
    },
    section: {
        margin: 10,
        padding: 10,
    }
});

function PDFLink(props: { src: string }) {
    return (<Link src={props.src}>{props.src}</Link>)
}

// Create Document Component
export const ResumeDocument = (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <CenterHorizontal>
                    <Title>Aditya Rao</Title>
                </CenterHorizontal>
            </View>
            <Section>
                <CenterHorizontal>
                    <SectionContent>
                        647-978-3730 | <PDFLink src="raoa32@mcmaster.ca" /> | <PDFLink src="https://www.linkedin.com/in/aditya-g-rao" />
                    </SectionContent>
                </CenterHorizontal>

                <CenterHorizontal>
                    <SectionContent>
                        <PDFLink src="https://github.com/adityarao2005" /> | <PDFLink src="https://adityarao-portfolio.vercel.app" />
                    </SectionContent>
                </CenterHorizontal>
            </Section>
            <Section>
                <SectionTitle>Education</SectionTitle>
                <FlexView>
                    <Svg height="10" style={{flexGrow: 1}}>
                        <Line x1="0" y1="5" x2="600" y2="5" strokeWidth={1} stroke="rgb(0,0,0)" />
                    </Svg>
                </FlexView>
                <FlexView>
                    <SectionContent >McMaster University</SectionContent><SectionContent>, Hamilton, ON</SectionContent>
                    <Stretch />
                    <SectionContent>Sept 2023 - April 2028</SectionContent>
                </FlexView>
                <SectionContent>
                </SectionContent>
                <FlexView>
                    <SectionContent>Hello</SectionContent>
                    <Stretch />
                    <SectionContent>World</SectionContent>
                </FlexView>
                <SectionList>
                    <SectionListItem>Email: adityarao2005@gmail.com</SectionListItem>
                    <SectionListItem>Phone: ...</SectionListItem>
                </SectionList>
            </Section>
        </Page>
    </Document>)

