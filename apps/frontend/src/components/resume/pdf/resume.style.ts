import { StyleSheet, Font } from "@react-pdf/renderer";

// Register font
Font.register({
    family: 'Times-New-Roman',
    fonts: [
        {
            src: 'https://raw.githubusercontent.com/justrajdeep/fonts/master/Times%20New%20Roman.ttf',
            fontStyle: 'normal',
            fontWeight: 'normal'
        },
        {
            src: 'https://raw.githubusercontent.com/justrajdeep/fonts/master/Times%20New%20Roman%20Bold.ttf',
            fontStyle: 'normal',
            fontWeight: 'bold'
        },
        {
            src: 'https://raw.githubusercontent.com/justrajdeep/fonts/master/Times%20New%20Roman%20Italic.ttf',
            fontStyle: 'italic',
            fontWeight: 'normal'
        },
        {
            src: 'https://raw.githubusercontent.com/justrajdeep/fonts/master/Times%20New%20Roman%20Bold%20Italic.ttf',
            fontStyle: 'italic',
            fontWeight: 'bold'
        }
    ]
});

// disable word hyphenation
Font.registerHyphenationCallback(word => [word]);


// Create styles of resume
export const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 10
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'Times-New-Roman',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 10,
    },
    text: {
        fontSize: 11,
        fontFamily: 'Times-New-Roman',
    },
    contactInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        fontSize: 11,
        fontFamily: 'Times-New-Roman',
        textAlign: 'center',
        flexWrap: 'wrap',
        marginBottom: 2
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'Times-New-Roman',
        marginBottom: -5
    },
    section: {
        marginHorizontal: 10,
        marginTop: 1
    },
    splitSection: {
        flexDirection: 'row'
    },
    leftSection: {
        flex: 1
    },
    rightSection: {
        flexDirection: 'column',
        alignItems: 'flex-end'
    }
});