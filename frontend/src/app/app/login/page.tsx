
'use client'
import { Button, Field, Fieldset, Input, Label } from "@headlessui/react";
import Link from "next/link";
import { PropsWithChildren, useState } from "react";
import { useAuthContext } from "@/components/context/AuthContext";
import { signInCredentials, signInGooglePopup, signInGoogleRedirect } from "@/lib/firebase/signIn";
import { useRouter } from "next/navigation";

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

export default function LoginPage() {
    const { user } = useAuthContext();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string>()
    const router = useRouter()

    if (user) {
        router.push("/app");
        return;
    }

    const handleForm = async (event: React.FormEvent) => {
        event.preventDefault()

        if (!email || !password) {
            return setError("Please fill in all fields")
        }

        const { result, error } = await signInCredentials(email, password);

        if (error) {
            return setError("Invalid credentials")
        }

        // else successful
        return router.push("/app")
    }


    const onGoogleClick = async () => {
        const { result, error } = await signInGooglePopup();

        if (error) {
            return setError("Invalid credentials")
        }

        // else successful
        return router.push("/app")
    }

    return (
        <Container>
            <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Login now!</h1>
                <p className="py-6">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                    quasi. In deleniti eaque aut repudiandae et a id nisi.
                </p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form className="card-body" onSubmit={handleForm}>
                    <Fieldset>
                        {error &&
                            <Field className="form-control ">
                                <Label className="label">
                                    <span className="label-text text-error">Error: {error}</span>
                                </Label>
                            </Field>
                        }
                        <Field className="form-control">
                            <Label className="label">
                                <span className="label-text">Email</span>
                            </Label>
                            <Input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required />
                        </Field>
                        <Field className="form-control">
                            <Label className="label">
                                <span className="label-text">Password</span>
                            </Label>
                            <Input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required />
                            <Label className="label">
                                <Link href="/forgot-password" className="label-text-alt link">Forgot password?</Link>
                            </Label>
                            <Label className="label">
                                <span className="label-text-alt">Don't have an account? &nbsp;
                                    <Link href="/app/register" className="link">Click me and register!</Link> Or:
                                </span>
                            </Label>
                        </Field>
                        <Field className="form-control mt-2 space-y-2">
                            <Button className="btn btn-primary" onClick={onGoogleClick}>Sign-in with Google</Button>
                            <Button className="btn btn-primary" type="submit">Login</Button>
                        </Field>
                    </Fieldset>
                </form>
            </div>
        </Container>
    );
}