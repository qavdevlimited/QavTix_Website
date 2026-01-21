"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { motion } from "framer-motion"
import { space_grotesk } from "@/lib/fonts";
import Link from "next/link";
import { NAV_LINKS } from "@/components-data/navigation/navLinks";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { 
        opacity: 0, 
        y: 20
    },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 15
        }
    }
}


function PricingFAQs({ data }:{ data: FaqData[] }){
    return (
        <section className="mt-20 md:mt-28 md:flex justify-between gap-16">
            <div className="max-w-lg md:mt-2">
                <h3 className={`${space_grotesk.className} text-2xl md:text-[2.2rem] font-bold text-secondary-9 mb-6`}>Frequently asked question about pricing</h3>
                <p className="text-sm text-neutral-7 mt-4">
                    Get clear answers on pricing. If you need further assistance, feel free to <Link href={NAV_LINKS.CONTACT_US.href} className="font-medium text-accent-6">reach out</Link> — we’re here to help.
                </p>
            </div>

            <motion.div variants={containerVariants} className="md:w-[45%] mt-10 md:mt-0">
                <Accordion type="single" collapsible className="w-full space-y-5">
                    {data.map((faq, index) => (
                        <motion.div
                            key={`${faq.id}-${index}`}
                            variants={itemVariants}
                        >
                            <AccordionItem 
                                value={faq.id} 
                                className="bg-secondary-1 w-full border-none rounded-lg px-6 py-2"
                            >
                                <AccordionTrigger className="text-secondary-9 font-medium hover:no-underline text-left">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-neutral-7 pt-2 pb-4">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        </motion.div>
                    ))}
                </Accordion>
            </motion.div>
        </section>
    )
}

export default PricingFAQs;