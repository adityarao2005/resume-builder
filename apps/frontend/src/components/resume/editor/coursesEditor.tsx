import { Field, Button, Input } from "@headlessui/react";

// Courses editor
export interface IDescriptionEditorProps {
    courses: string[],
    setCourses: (description: string[]) => void
}

// Add courses button
export function AddCoursesButton({ courses, setCourses }: IDescriptionEditorProps) {
    return (
        <Field className="flex">
            <Button
                className="btn bg-base-100 shadow-md flex-1"
                onClick={() => setCourses([...courses, ''])}>
                Add Course
            </Button>
        </Field>
    )
}

// Courses view model
export function Courses({ courses, setCourses }: IDescriptionEditorProps) {
    // Return course view model list
    return courses.map((course, index) => (
        <Field key={index} className="flex flex-col">
            {
                // Course input
            }
            <div className="flex flex-row">
                <Input
                    className="input input-bordered rounded-r-none flex-1"
                    value={course}
                    onChange={(source) => {
                        const list = [...courses];
                        list[index] = source.target.value;
                        setCourses(list);
                    }}
                    placeholder="Enter a line" />
                <Button
                    className="btn input-bordered rounded-l-none bg-base-300"
                    onClick={() => {
                        const list = [...courses];
                        list.splice(index, 1);
                        setCourses(list);
                    }}>
                    X
                </Button>
            </div>
        </Field>
    ))
}

export default function CourseEditor({ courses, setCourses }: IDescriptionEditorProps) {
    // Return course editor
    return (
        <>
            <AddCoursesButton courses={courses} setCourses={setCourses} />
            <Courses courses={courses} setCourses={setCourses} />
        </>
    );
}