"use client"

import AuthButton1 from "../custom-utils/buttons/AuthButton1";
import TextInput1 from "../custom-utils/inputs/TextInput1";

export default function ForgotPasswordForm(){
    return (
        <form className="space-y-5 mt-8">
            <div>
                <label className="text-sm font-medium text-neutral-10 mb-2 block">Email Or Phone Number</label>
                <TextInput1 placeholder="Enter Email or Phone number" />
            </div>
            <AuthButton1 buttonText="Continue" className="mt-6" />
        </form>
    )
}