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

export default function RegisterPage() {
    return (
        <Container>
            <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Register now!</h1>
                <p className="py-6">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                    quasi. In deleniti eaque aut repudiandae et a id nisi.
                </p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form className="card-body">
                    <Fieldset>
                        <Field className="form-control">
                            <Label className="label">
                                <span className="label-text">Email</span>
                            </Label>
                            <Input type="email" placeholder="email" className="input input-bordered" required />
                        </Field>
                        <Field className="form-control">
                            <Label className="label">
                                <span className="label-text">Password</span>
                            </Label>
                            <Input type="password" placeholder="password" className="input input-bordered" required />
                            <Label className="label">
                                <Link href="#" className="label-text-alt link">Forgot password?</Link>
                            </Label>
                            <Label className="label">
                                <span className="label-text-alt">Have an account already? &nbsp;
                                    <Link href="/login" className="link">Click me and login!</Link> Or:
                                </span>
                            </Label>
                        </Field>
                        <Field className="form-control mt-2 space-y-2">
                            <Button className="btn btn-primary">Register</Button>
                        </Field>
                    </Fieldset>
                </form>
            </div>
        </Container>
    );
}