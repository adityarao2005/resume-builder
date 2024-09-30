// unit test construct
type UnitTest = {
    name: string;
    run: () => Promise<void>;
};

// unit tests
const tests: UnitTest[] = [];

// unit test context
const context: Map<string, any> = new Map();

// Run the unit tests method
async function runTests() {
    // Iterate through all the unit tests and display their statuses
    for (const test of tests) {
        console.log(`Running test: ${test.name}`);
        await test.run().then(() => {
            console.log(`Test: ${test.name} passed`);
        }).catch((error) => {
            console.error(`Test: ${test.name} failed`);
            console.error(error);
        });
    }
}

// Adds unit test decorator
function registerTestCase({ name, run }: UnitTest) {
    tests.push({
        name,
        run
    });
}

// Add to context
function addToContext(key: string, value: any) {
    context.set(key, value);
}

// Get from context
function getFromContext<T>(key: string): T {
    return context.get(key) as T;
}

// Adds unit test decorator
function registerInitializer(initializer: (context: Map<string, any>) => void) {
    initializer(context);
}

export {
    UnitTest,
    registerInitializer,
    registerTestCase,
    runTests,
    addToContext,
    getFromContext
};