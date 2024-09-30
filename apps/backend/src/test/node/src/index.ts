import assert from 'assert';
import { addToContext, getFromContext, registerInitializer, registerTestCase, runTests } from './unit_test';
import { resumes } from './resumes';

const serverEndpoint = "http://localhost:3000";

// TODO: 1. Connect to firebase and grab credentials
async function loadFirebase(context: Map<string, any>) {

    // Get the identity by fetching the identity from the firebase server
    const identity = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?" + new URLSearchParams({
        key: "AIzaSyBR4j_w5BpP6UVYyqiT52C3gyyXbkN7amw"
    }).toString(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: "bb10bb@gmail.com",
            password: "bb10bb",
            returnSecureToken: true
        })
    }).then(response => response.json());

    // Get the identity token
    context.set("identity", identity.idToken);
}

registerInitializer(loadFirebase);

// then test sample controller to see if it works
// Sample Controller Test: Unauthorized
function SampleControllerTest() {

    registerTestCase({
        name: "Sample Controller Test: Unauthorized",
        run: async () => {
            // Fetch the sample controller without the identity
            const response = await fetch(`${serverEndpoint}/sample`);
            // Check if the response is correct
            assert(response.status === 401, "Response status is not 401");
        }
    })

    // Sample Controller Test: Authorized
    registerTestCase({
        name: "Sample Controller Test: Authorized",
        run: async () => {
            // Get the identity from the context
            const identity = getFromContext<string>("identity");
            assert(identity, "Identity is not defined");

            // Fetch the sample controller
            const response = await fetch(`${serverEndpoint}/sample`, {
                headers: {
                    Authorization: `Bearer ${identity}`
                }
            });

            // Check if the response is correct
            assert(response.status === 200, "Response status is not 200");
            assert((await response.json()).message === "Hello, World!", "Response message is not 'Hello World'");

        }
    })
}

SampleControllerTest();

// Then test the resume management controllers (create multiple resumes, get all the 
// resumes, delete a couple of the resumes) **NOTE: we are saving the get history for later**

function ResumeManagementControllerTest() {

    // Resume Creation Test: Unauthorized
    registerTestCase({
        name: "Resume Creation Test: Unauthorized",
        run: async () => {

            // Fetch the sample controller without the identity
            const response = await fetch(`${serverEndpoint}/resume`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(resumes[0])
            });
            // Check if the response is correct
            assert(response.status === 401, "Response status is not 401");

        }
    })

    // Resume Creation Test: Authorized
    registerTestCase({
        name: "Resume Creation Test: Authorized",
        run: async () => {
            // Get the identity from the context
            const identity = getFromContext<string>("identity");
            assert(identity, "Identity is not defined");

            for (const resume of resumes) {
                // Fetch the sample controller without the identity
                const response = await fetch(`${serverEndpoint}/resume`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${identity}`
                    },
                    body: JSON.stringify({ data: resume, job: { title: "", company: "", description: [] } })
                });
                // Check if the response is correct
                assert(response.status == 201, "Response status is not 201");

                const persistedResume = await response.json();
                const resumeData = persistedResume.data;

                console.log(persistedResume);

                assert(resumeData.id, "Resume ID is not defined");
                assert(resumeData.name === resume.name, "Resume name is not correct");
                assert(resumeData.education === resume.education, "Resume education is not correct");
                assert(resumeData.experiences === resume.experiences, "Resume experience is not correct");
                assert(resume.projects === resume.projects, "Resume projects is not correct");
                assert(resume.extraCurriculars === resume.extraCurriculars, "Resume extra curriculars is not correct");
            }
        }
    })

    // Resume Get All Test: Unauthorized
    registerTestCase({
        name: "Resume Get All Test: Unauthorized"
        , run: async () => {
            // Fetch the sample controller without the identity
            const response = await fetch(`${serverEndpoint}/resume`);
            // Check if the response is correct
            assert(response.status === 401, "Response status is not 401");
        }
    })

    // Resume Get All Test: Authorized
    registerTestCase({
        name: "Resume Get All Test: Authorized"
        , run: async () => {
            // Get the identity from the context
            const identity = getFromContext<string>("identity");
            assert(identity, "Identity is not defined");

            // Fetch the sample controller without the identity
            const response = await fetch(`${serverEndpoint}/resume`, {
                headers: {
                    "Authorization": `Bearer ${identity}`
                }
            });
            // Check if the response is correct
            assert(response.status === 200, "Response status is not 200");

            const resumes = await response.json();
            assert(resumes.length > 0, "Resumes are not defined");
            addToContext("resumes", resumes.map((resume: any) => resume.documentId));
            console.log(resumes);
        }
    })

    // Resume Delete Test: Unauthorized
    registerTestCase({
        name: "Resume Delete Test: Unauthorized",
        run: async () => {
            const resumes = getFromContext<string[]>("resumes");

            // Fetch the sample controller without the identity
            const response = await fetch(`${serverEndpoint}/resume/${resumes[2]}`, {
                method: "DELETE"
            });
            // Check if the response is correct
            assert(response.status === 401, "Response status is not 401");
        }
    })

    // Resume Delete Test: Authorized
    registerTestCase({
        name: "Resume Delete Test: Unauthorized",
        run: async () => {
            const resumes = getFromContext<string[]>("resumes");
            const identity = getFromContext<string>("identity");

            // Fetch the sample controller without the identity
            const response = await fetch(`${serverEndpoint}/resume/${resumes[2]}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${identity}`
                }
            });

            // Check if the response is correct
            assert(response.status === 204, "Response status is not 204");

            // Fetch the resumes then confirm if the resume is deleted
            const newList = await fetch(`${serverEndpoint}/resume`, {
                headers: {
                    "Authorization": `Bearer ${identity}`
                }
            }).then(response => response.json());

            // Check if the response is correct
            const newListIds: string[] = newList.map((resume: { documentId: string; }) => resume.documentId) as string[];
            // Check if the response includes all resumes except the deleted one
            for (const resumeId of resumes) {
                if (resumeId !== resumes[2]) {
                    assert(newListIds.includes(resumeId), `Resume with ID ${resumeId} is missing`);
                } else {
                    assert(!newListIds.includes(resumes[2]), "Resumes are not deleted");
                }
            }

            // Check if the response is correct
            assert(newList.length === resumes.length - 1, "Resumes are not deleted");
        }
    })
}

ResumeManagementControllerTest();


// TODO: 4. Then we test each and every single websocket instance, and make sure its working
registerTestCase({
    name: "Websocket Controller Test",
    run: async () => {

    }
})
// TODO: 5. then we initiate another websocket connection and then test those
registerTestCase({
    name: "Websocket Controller Test 2",
    run: async () => {

    }
})

// TODO: 6. Then we test the resume management controllers to see if that is working as well
registerTestCase({
    name: "Resume Management Controller Test 2",
    run: async () => {

    }
})

runTests();