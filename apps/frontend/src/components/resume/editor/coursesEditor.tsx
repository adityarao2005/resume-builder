import { Common } from "@/models/types";
import { Field, Label, Button, Input } from "@headlessui/react";

export interface IDescriptionEditorProps {
    courses: string[],
    setCourses: (description: string[]) => void
}

// TODO: Document all the made pages and components

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

export function Courses({ courses, setCourses }: IDescriptionEditorProps) {
    return courses.map((course, index) => (
        <Field key={index} className="flex flex-col">
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
    return (
        <>
            <AddCoursesButton courses={courses} setCourses={setCourses} />
            <Courses courses={courses} setCourses={setCourses} />
        </>
    );
}