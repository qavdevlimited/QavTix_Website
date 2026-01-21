"use client"

import ActionButton1 from "../../custom-utils/buttons/ActionButton1";
import TextInput1 from "../../custom-utils/inputs/TextInput1";

export default function ForgotPasswordForm(){
    return (
        <form className="space-y-5 mt-8">
            <div>
                <label className="text-sm font-medium text-neutral-10 mb-2 block">Email Or Phone Number</label>
                <TextInput1 placeholder="Enter Email or Phone number" />
            </div>
            <ActionButton1 buttonText="Continue" className="mt-6 w-full" />
        </form>
    )
}