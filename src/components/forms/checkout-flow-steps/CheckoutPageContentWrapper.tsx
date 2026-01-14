import TicketReservationTimer from "@/components/custom-utils/TicketReservationTimer";
import { useCheckout } from "@/contexts/CheckoutFlowProvider";
import { space_grotesk } from "@/lib/redux/fonts";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function CheckoutPageContentWrapper({ children, showMobileSummary }:{ children: ReactNode, showMobileSummary: boolean }){
    
    const { currentStep } = useCheckout()
    
    return (
        <div className={cn(showMobileSummary ? "hidden" : "block", "pb-5")}>
            <h2 className={`${space_grotesk.className} mb-6 text-secondary-9 font-medium text-xl`}>{currentStep === 1 ? "Ticket" : currentStep === 2 ? "Ticket Information" : currentStep === 3 ? "Payment Method" : null}</h2>
            <div className={cn(currentStep === 1 && "sr-only")}>
                <TicketReservationTimer />
            </div>
            {children}
        </div>
    )
}