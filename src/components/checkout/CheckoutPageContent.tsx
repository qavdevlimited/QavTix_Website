import { useCheckout } from "@/contexts/CheckoutFlowProvider";
import { CheckoutFormStepIndicator } from "../custom-utils/CheckoutFormStepIndicator";
import TicketPreviewStep from "../forms/checkout-flow-steps/TicketPreviewStep";
import CheckoutSummary from "../forms/checkout-flow-steps/CheckoutSummary";
import { useState } from "react";

export default function CheckoutPageContent(){

    const { currentStep } = useCheckout()
    const [showMobileSummary, setShowMobileSummary] = useState(false)

    return (
        <section className="md:flex w-full justify-between gap-16">
            <div className="md:flex-1">
                {
                    !showMobileSummary &&
                    <div className="my-10 md:-mt-10">
                        <CheckoutFormStepIndicator />
                    </div>
                }
                {
                    currentStep === 1 ?
                    <TicketPreviewStep showMobileSummary={showMobileSummary} />
                    :
                    null
                }
            </div>
            <div className="md:w-[40%]">
                <CheckoutSummary showMobileSummary={showMobileSummary} setShowMobileSummary={setShowMobileSummary} />
            </div>
        </section>
    )
}