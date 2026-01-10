"use client"

import { useSignup } from "@/contexts/HostSignupProvider"
import HostSignUpSuccessMessage from "../forms/host-signup-steps/reused/HostSignupSuccessMessage"
import { space_grotesk } from "@/lib/redux/fonts"
import { HostAccountTypeSelector } from "../custom-utils/HostAccountTypeSelector"
import { StepIndicator } from "../custom-utils/FormStepIndicator"
import IndividualHostSignupSection from "../forms/host-signup-steps/individual"
import OrganizationHostSignupSection from "../forms/host-signup-steps/organization"
import { HostAccountType } from "@/schemas/host-signup.schema"
import AuthPageFlexWrapper from "./AuthPageFlexWrapper"

export default function HostSignUpContent({ hostAccountType }:{ hostAccountType: HostAccountType }){

    const { signUpSuccessful } = useSignup()

    return (
        signUpSuccessful ?
        <HostSignUpSuccessMessage />
        :
        <AuthPageFlexWrapper contentSectionMaxWidth="md:max-w-2xl">
            <div className="pb-12">
                <div className="">
                    <div className="mb-8">
                        <h1 className={`${space_grotesk.className} text-secondary-9 text-2xl md:text-3xl lg:text-[2rem] font-bold mb-2`}>Create An Account</h1>
                        <p className="text-neutral-7 text-sm">
                            Get started with QavTix for free!
                        </p>
                    </div>

                    <HostAccountTypeSelector />
                    <StepIndicator />
                    
                    { 
                        hostAccountType === "individual" ?
                        <IndividualHostSignupSection />
                        :
                        <OrganizationHostSignupSection />
                    }
                </div>
            </div>
        </AuthPageFlexWrapper>
    )
}