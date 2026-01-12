"use client"

import HostPricingContent from "@/components/pricing/HostPricingContent";
import SectionHeading from "@/components/shared/SectionHeading";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function PricingPage(){

    const [activePricingTab,setActivePricingTab] = useState<AccountType>("host")

    return (
        <main>
            <SectionHeading title="Pricing" />

            <div className="global-px pb-20 mt-16">
                <Tabs value={activePricingTab} onValueChange={(v) => setActivePricingTab(v as AccountType)} className="w-full max-w-7xl mx-auto">
                    <TabsList className="grid max-w-full w-[14em] h-16 mx-auto border border-secondary-9 rounded-full grid-cols-2 mb-8 gap-2 bg-gray-50 p-1">
                        <TabsTrigger 
                            value="host" 
                            className="data-[state=active]:bg-primary-6 data-[state=active]:text-white text-secondary-9 shadow-none! drop-shadow-none font-medium rounded-full transition-all"
                        >
                            Host
                        </TabsTrigger>
                        <TabsTrigger 
                            value="attendee"
                            className="data-[state=active]:bg-primary-6 data-[state=active]:text-white text-secondary-9 shadow-none! drop-shadow-none font-medium rounded-full transition-all"
                        >
                            Attendee
                        </TabsTrigger>
                    </TabsList>


                    <HostPricingContent />
                </Tabs>
            </div>
        </main>
    )
}