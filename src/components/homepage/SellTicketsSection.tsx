"use client"

import { space_grotesk } from "@/lib/redux/fonts";
import { useRouter } from "next/navigation";

export default function SellTicketsSection(){

    const router = useRouter()

    return (
        <section className="global-px my-14 lg:my-24 flex flex-col justify-center items-center text-center">
            <h2
                className={`text-2xl md:text-[2rem] font-bold text-secondary-9 ${space_grotesk.className}`}
            >
                Do you have tickets to sell?
            </h2>

            <p className="text-sm text-neutral-8 mt-4 max-w-sm mx-auto">
                Selling ticket has never been easier. Your one sure place to sell your tickets with no hassle.
            </p>

            <div className="w-full flex items-center mt-8 justify-between sm:justify-center md:mt-14 gap-4">
                <button
                    onClick={() => router.push("/tickets/sell")}
                    className="w-[45%] max-w-[10em] h-14 p-4 rounded-[30px] bg-primary hover:bg-primary-7 active:bg-primary-8 hover:shadow-md active:scale-[0.98] disabled:bg-neutral-5 disabled:cursor-not-allowed disabled:opacity-60 text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-150 flex items-center justify-center gap-2"
                >
                    Sell Ticket
                </button>


                <button
                    type="button"
                    onClick={() => router.push("/user-guide")}
                    className="w-[45%] max-w-[10em] h-14 text-secondary-8 bg-white p-4 hover:shadow flex items-center gap-2 justify-center px-6 py-3 rounded-[30px] border-2 border-secondary-3 font-medium text-sm hover:bg-neutral-2 hover:border-secondary-5 active:bg-neutral-3 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-neutral-4 focus:ring-offset-2 transition-all duration-150"
                >
                    Learn More
                </button>
            </div>
        </section>
    )
}