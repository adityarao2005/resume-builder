// Access the environment variables in the frontend
const NEXT_PUBLIC_FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const NEXT_PUBLIC_FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const NEXT_PUBLIC_FIREBASE_APP_ID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

// Export the values
export function getFirebaseApiKey(): string {
    return NEXT_PUBLIC_FIREBASE_API_KEY!;
}

export function getFirebaseAuthDomain(): string {
    return NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!;
}

export function getFirebaseProjectId(): string {
    return NEXT_PUBLIC_FIREBASE_PROJECT_ID!;
}

export function getFirebaseStorageBucket(): string {
    return NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!;
}

export function getFirebaseMessagingSenderId(): string {
    return NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!;
}

export function getFirebaseAppId(): string {
    return NEXT_PUBLIC_FIREBASE_APP_ID!;
}

export function getFirebaseMeasurementId(): string {
    return NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!;
}