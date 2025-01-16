import { Button, Field } from "@headlessui/react"

// Add button props
// Contains data, setData, sample, and title
interface IAddButtonProps<T> {
    data: T[],
    setData: (data: T[]) => void,
    sample: T,
    title: string
}

// Add button
export default function AddButton<T>({ data, setData, sample, title }: IAddButtonProps<T>) {
    // Return add button
    return (
        <Field className="flex">
            <Button
                className="btn bg-base-100 shadow-md flex-1"
                onClick={() => setData([...data, sample])}>
                Add {title}
            </Button>
        </Field>
    )
}