import { Profile } from "@/models/types";

const hobbies = ['Sketching', 'Painting', 'Violin (Western and Carnatic)', 'Badminton', 'Swimming', 'Chess']
const certifications = ['AWS Cloud Practitioner', 'Docker & Kubernetes']

export const profile: Profile.IProfile = {
    userID: '1',
    name: "Aditya Rao",
    contactInfo: {
        phone: "+1 (647)-978-3730",
        email: "raoa32@mcmaster.ca",
        mediaProfiles: new Map([
            ["LinkedIn", "https://www.linkedin.com/in/aditya-g-rao"],
            ["Github", "https://github.com/adityarao2005"],
            ["Website", "https://adityarao-portfolio.vercel.app"]
        ])
    },
    education: [
        {
            degree: "Bachelors",
            discipline: "Engineering",
            institution: "McMaster University",
            location: { city: "Hamilton", country: "ca" },
            courses: ["Software Engineering", "Computer Science", "Electrical Engineering"],
            duration: { start: new Date(2019, 8), end: new Date(2023, 4) },
            description: { lines: ["First Year GPA: 4.0/4.0", "Majoring in Software Engineering", "Expected Graduation: April 2023"] }
        }
    ],
    experiences: [
        {
            title: "Full-stack Developer Part-Time Intern",
            company: "Medium AI",
            location: { city: "Toronto", country: "ca" },
            duration: { start: new Date(2024, 5), end: new Date(2024, 8) },
            description: {
                lines: [
                    "Medium AI is a startup company created by McMaster students which is being incubated and supported by the McMaster Forge Startup Survivor Program",
                    "The product being developed at Medium AI is a tool which helps doctors create a transcript of their doctor-patient conversation and also provides doctors with some potential diagnoses as well as some solutions to address the patient’s issue",
                    "My role as a Full-stack developer part-time intern was to create mock servers, handle online webm to wav conversion with ffmpeg, migrate from Flask to aiohttp, and migrate from older frameworks to newer and more robust frameworks which allow for transcription and diagnosis in real-time"
                ]
            },
            skills: [
                {
                    name: "Python",
                    type: "Programming Languages"
                },
                {
                    name: "TypeScript",
                    type: "Programming Languages"
                },
                {
                    name: "Flask",
                    type: "Libraries"
                },
                {
                    name: "React",
                    type: "Libraries"
                },
                {
                    name: "Express",
                    type: "Libraries"
                },
                {
                    name: "Firestore",
                    type: "Tools"
                },
                {
                    name: "FFMPEG",
                    type: "Tools"
                },
                {
                    name: "Aiohttp",
                    type: "Frameworks"
                },
                {
                    name: "gRPC",
                    type: "Frameworks"
                },
                {
                    name: "OpenAI Whisper",
                    type: "Tools"
                }
            ]
        }
    ],
    projects: [
        {
            title: "Portfolio Website",
            description: {
                lines: [
                    "Developed a personal portfolio which hosts both my projects, artwork, and professional portfolio",
                    "Developed a dashboard to manage the projects, artwork, and messages sent to me",
                    "Automated the creation of projects and artworks and developed a messaging system which saved around 50% of development time",
                    "Used Next.js and TailwindCSS for frontend and Express, MongoDB, Node.js, and Vercel Cloud for Backend"
                ]
            },
            duration: { start: new Date(2023, 12), end: new Date(2024, 3) },
            skills: [
                {
                    name: "Next.js",
                    type: "Frameworks"
                },
                {
                    name: "TypeScript",
                    type: "Programming Languages"
                },
                {
                    name: "TailwindCSS",
                    type: "Libraries"
                },
                {
                    name: "Express",
                    type: "Libraries"
                },
                {
                    name: "MongoDB",
                    type: "Tools"
                },
                {
                    name: "Mongoose",
                    type: "Framework"
                }
            ]
        },
        {
            title: "QuakeGuard",
            description: {
                lines: [
                    "Developed an earthquake prediction tool for DeltaHacks X, a hackathon hosted by McMaster University",
                    "Used Machine Learning libraries such as TensorFlow to train the prediction model, resulting in an 89% accuracy in predicting earthquakes at different locations and timestamps",
                    "Used AdamW optimizer to speed up the process of training and testing by 47%",
                    "Used Maps Geocoding API to highlight high-risk areas and implemented Google Pay for donations",
                    "Invited to GDSC McMaster's Solutions Challenge Hackathon to refine and present our product"
                ]
            },
            duration: { start: new Date(2024, 1), end: new Date(2024, 1) },
            skills: [
                {
                    name: "TensorFlow",
                    type: "Libraries"
                },
                {
                    name: "SciKit Learn",
                    type: "Libraries"
                },
                {
                    name: "Python",
                    type: "Programming Languages"
                },
                {
                    name: "TypeScript",
                    type: "Programming Languages"
                },
                {
                    name: "Next.js",
                    type: "Frameworks"
                },
                {
                    name: "Google Maps API",
                    type: "Libraries"
                },
                {
                    name: "Flask",
                    type: "Libraries"
                }
            ]
        },
        {
            title: "Task Management and Scheduling App",
            description: {
                lines: [
                    "Developed an enterprise-grade calendar tailored for efficient task management and daily organization",
                    "Features include being able to schedule events or tasks, manage Google Classroom events, manage alarms and reminders, and get work done with our Pomodoro work mode",
                    "Implemented a calendar view for scheduling tasks and a Kanban board for managing tasks",
                    "Built using JavaFX and Google Classroom API and stored data using MySQL database"
                ]
            },
            duration: { start: new Date(2023, 5), end: new Date(2023, 6) },
            skills: [
                {
                    name: "JavaFX",
                    type: "Frameworks"
                },
                {
                    name: "Java",
                    type: "Programming Languages"
                },
                {
                    name: "Google Classroom API",
                    type: "Libraries"
                },
                {
                    name: "MySQL",
                    type: "Tools"
                }
            ]
        }
    ],
    extraCurriculars: [
        {
            title: "Software Team Lead",
            company: "FIRST Robotics Team 9113",
            location: { city: 'Markham', country: 'ca' },
            duration: { start: new Date(2023, 1), end: new Date(2023, 5) },
            description: {
                lines: [
                    "FIRST Robotics is a robotics competition in which many high schools across North America participate in",
                    "Led my high school's robotics team as the software team lead at the 2023 competition",
                    "Utilized Java & WPLib to develop a fully functional robot capable of driving, picking up cones and cubes, and balancing on a moving platform using a gyroscope using embedded programming principles",
                    "Participated in competitions hosted at Newmarket Arena and Western University and secured the Rookie All-Star and Rookie Inspiration Award respectively"
                ]
            },
            skills: [
                {
                    name: "Java",
                    type: "Programming Languages"
                },
                {
                    name: "WPLib",
                    type: "Libraries"
                }
            ]
        }
    ],
    otherSkills: [...certifications.map(name => ({ name, type: "Udemy Certifications (in progress)" }))],
    otherAwards: [{ title: "Dean's Honour List", date: new Date(2024, 4) }],
    hobbies: hobbies
};