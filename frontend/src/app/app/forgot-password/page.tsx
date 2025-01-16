import { Button, Field, Fieldset, Input, Label } from "@headlessui/react";
import Link from "next/link";
import { PropsWithChildren } from "react";

function Container({ children }: PropsWithChildren<{}>) {
    return (
        <div className="flex-1 flex bg-base-300">
            <div className="my-10 mx-40 p-10 flex-1 bg-base-200 hero drop-shadow-md rounded-lg">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default function ForgotPasswordPage() {

    async function sendChangePasswordEmail() {
        'use server'
        
        // TODO: Implement sendChangePasswordEmail
    }

    return (
        <Container>
            <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Forgot password?<br /> Enter your email!</h1>
                <p className="py-6">
                    We will email a change password link to your email. Please check your email once submitted.
                </p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form className="card-body" action={sendChangePasswordEmail}>
                    <Fieldset>
                        <Field className="form-control">
                            <Label className="label">
                                <span className="label-text">Email</span>
                            </Label>
                            <Input type="email" placeholder="email" className="input input-bordered" required />
                            <Label className="label">
                                <span className="label-text-alt">Remember your password? &nbsp;
                                    <Link href="/login" className="link">Click me and login!</Link>
                                </span>
                            </Label>
                            <Label className="label">
                                <span className="label-text-alt">Don't have an account? &nbsp;
                                    <Link href="/register" className="link">Click me and register!</Link>
                                </span>
                            </Label>
                        </Field>
                        <Field className="form-control mt-2 space-y-2">
                            <Button className="btn btn-primary" type="submit">Submit</Button>
                        </Field>
                    </Fieldset>
                </form>
            </div>
        </Container>
    );
}