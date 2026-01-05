"use client"

import AuthPageFlexWrapper from "@/components/auth-pages/AuthPageFlexWrapper";
import Link from "next/link";
import { Icon } from "@iconify/react";
import SignInForm from "@/components/forms/SignInForm";
import { space_grotesk } from "@/lib/redux/fonts";
import { useRouter } from "next/navigation";

export default function SignInPage(){

    const router = useRouter()

    return (
        <AuthPageFlexWrapper>
            <main>
                <h1 className="sr-only">Sign In</h1>
                <h2 className={`${space_grotesk.className} text-secondary-9 text-2xl font-bold mt-4 mb-2`}>Welcome back!</h2>
                <p className="text-neutral-7 text-sm">Don’t have an account? <Link href="/auth/signup" className="font-medium text-primary-6">Sign Up</Link></p>

                <div className="mt-14 flex gap-4 flex-wrap justify-between">
                    <button className="rounded-lg basis-[47%] flex text-sm items-center justify-center gap-2 border-[1.5px] border-neutral-5 h-14">
                        <Icon icon="material-icon-theme:google" width="16" height="16" className="size-6" />
                        <span className="font-bold">Google</span>
                    </button>
                    <button className="rounded-lg basis-[47%] flex text-sm items-center justify-center gap-2 border-[1.5px] border-neutral-5 h-14">
                        <Icon icon="devicon:facebook" width="32" height="32" className="size-6" />
                        <span className="font-bold">Facebook</span>
                    </button>
                    <button className="flex-1 bg-neutral-10 flex text-sm items-center justify-center gap-2 h-14 rounded-lg text-white">
                        <Icon icon="ic:baseline-apple" width="32" height="32" className="size-6" />
                        <span className="font-bold">Apple</span>
                    </button>
                </div>

                <div className="flex gap-2 items-center my-8">
                    <hr className="h-1 border-neutral-5 flex-1" />
                    <span className="text-neutral-7 text-sm uppercase">Or</span>
                    <hr className="h-1 border-neutral-5 flex-1" />
                </div>

                <SignInForm />

                <p className="text-sm text-neutral-8 mt-4 text-center">Forgot Password? <button onClick={() => router.push("/auth/forgot-password")} className="font-medium text-accent-6">Recover</button></p>
            </main>
        </AuthPageFlexWrapper>
    )
}