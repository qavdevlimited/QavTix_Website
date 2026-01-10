"use client"

import { useSignup } from "@/contexts/HostSignupProvider"
import { Icon } from "@iconify/react"
import { useRouter } from "next/navigation"

interface IMultiStepFormButtonDuo {
    isSubmitting?: boolean
}

export default function MultiStepFormButtonDuo({ isSubmitting }:IMultiStepFormButtonDuo){

    const router = useRouter()
    const { currentStep } = useSignup()

    return (
        <div className="flex gap-4 pt-4">
            <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 text-secondary-8 bg-white hover:shadow flex items-center gap-2 justify-center px-6 py-3 rounded-[30px] border-2 border-secondary-3 font-medium text-sm hover:bg-neutral-2 hover:border-secondary-5 active:bg-neutral-3 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-neutral-4 focus:ring-offset-2 transition-all duration-150"
            >
                {
                    currentStep > 1 &&
                    <Icon icon="lets-icons:arrow-left" width="24" height="24" />
                }
                <span>{currentStep > 1 ? "Back" : "Cancel"}</span>
                {
                    currentStep === 1 &&
                    <Icon icon="iconoir:cancel" width="24" height="24" />
                }
            </button>

            <button
                type="submit"
                disabled={!!isSubmitting}
                className="flex-1 px-6 py-3 rounded-[30px] bg-primary hover:bg-primary-7 active:bg-primary-8 hover:shadow-md active:scale-[0.98] disabled:bg-neutral-5 disabled:cursor-not-allowed disabled:opacity-60 text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-150 flex items-center justify-center gap-2"
            >
                {!!isSubmitting ? (
                    <>
                        <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                        <span>Loading...</span>
                    </>
                ) : (
                    <>
                        <span>{currentStep !== 3 ? "Next" : "Complete"}</span>
                        {
                            currentStep !== 3 &&
                            <Icon icon="lets-icons:arrow-right" width="24" height="24" />
                        }
                    </>
                )}
            </button>
        </div>
    )
}