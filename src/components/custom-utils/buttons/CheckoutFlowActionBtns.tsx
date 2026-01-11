"use client"

import { useCheckout } from "@/contexts/CheckoutFlowProvider"
import { useRouter } from "next/navigation"

interface IMultiStepFormButtonDuo {
    isSubmitting?: boolean
}

export default function CheckoutFlowActionBtns({ isSubmitting }:IMultiStepFormButtonDuo){

    const router = useRouter()
    const { currentStep } = useCheckout()

    return (
        <div className="flex gap-4 md:gap-6">
            <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 text-secondary-8 bg-white hover:shadow flex items-center gap-2 justify-center px-6 py-3 rounded-[30px] border-2 border-secondary-4 font-medium text-sm hover:bg-neutral-2 hover:border-secondary-5 active:bg-neutral-3 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-neutral-4 focus:ring-offset-2 transition-all duration-150"
            >
                <span>{currentStep > 1 ? "Back" : "Clear"}</span>
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
                        <span>{currentStep === 1 ? "Continue" : currentStep === 2 ? "Checkout" : currentStep === 3 ? "Make Payment" : null}</span>
                    </>
                )}
            </button>
        </div>
    )
}