import { space_grotesk } from "@/lib/fonts";
import Image from "next/image"

interface ICheckoutStatusPageContainerStatus {
    status: "failed" | "almostThere" | "success"
}

export default function CheckoutStatusPageContainer({ status }: ICheckoutStatusPageContainerStatus){

    const imageSrc = status === "failed" ? "/images/vectors/transaction-failed.svg" :
    status === "almostThere" ? "/images/vectors/transaction-halfway.svg" :
    status === "success" ? "images/vectors/transaction-success.svg" :
    "";

    const statusHeading = status === "failed" ? "Transaction Failed" :
    status === "almostThere" ? "You’re Almost Set!" : 
        status === "success" ? "You’re All Set!" :
    "";

    const statusText = status === "failed" ? "Payment could not be completed. No charges were made." :
    status === "almostThere" ? "Your spot will be secured after all members complete payment within 24 hours. We look forward to seeing you." : 
        status === "success" ? "Your spot is secured. We look forward to seeing you." :
    "";


    return (
        <div className="flex h-full justify-center items-center flex-col">
            <Image src={imageSrc} alt="checkout status icon" width={200} height={200} className="mx-auto my-8" />
            <div className="max-w-xs mx-auto">
                <h2 className={`text-center text-2xl font-bold text-secondary-9 mb-2 ${space_grotesk.className}`}>{statusHeading}</h2>
                <p className="text-center text-[#616166] text-sm">
                    {statusText}
                </p>
            </div>

            {
                status === "failed" &&
                <div className="my-4">
                    <button
                        type="button"
                        className="flex-1 px-6 py-3 rounded-[30px] bg-primary hover:bg-primary-7 active:bg-primary-8 hover:shadow-md active:scale-[0.98] disabled:bg-neutral-5 disabled:cursor-not-allowed disabled:opacity-60 text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-150 flex items-center justify-center gap-2"
                    >
                        Try Again
                    </button>
                    <button className="font-medium text-sm text-accent-6">Change payment method</button>
                </div>
            }
        </div>
    )
}