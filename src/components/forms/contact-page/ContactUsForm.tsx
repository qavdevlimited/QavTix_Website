"use client"

import { NAV_LINKS } from "@/components-data/navigation/navLinks";
import ActionButton1 from "@/components/custom-utils/buttons/ActionButton1";
import FormInput2 from "@/components/custom-utils/inputs/FormInput2";
import FormTextarea1 from "@/components/custom-utils/inputs/FormTextarea1";
import { space_grotesk } from "@/lib/redux/fonts";
import { contactUsSchema, ContactUsSchema } from "@/schemas/contact-us.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

export default function ContactUsForm(){

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, isSubmitting }
    } = useForm<ContactUsSchema>({
        resolver: zodResolver(contactUsSchema),
    })


    const handleContactFormSubmit : SubmitHandler<ContactUsSchema> = (data) => {

    }

    return (
        <section>
            <div className="rounded-3xl p-6 bg-accent-1">
                <h3 className={`text-secondary-9 text-2xl font-medium leading-8 ${space_grotesk.className}`}>Send us a message</h3>
                <p className="text-neutral-8 mt-5">
                    Before getting in touch see some <Link href={NAV_LINKS.HOW_IT_WORKS.href} className="text-accent-6 font-medium">frequently asked questions</Link> to clarify your objections and get answers to your questions.
                </p>
            </div>

            <form onSubmit={handleSubmit(handleContactFormSubmit)} className="space-y-5 mb-10 py-12">
                <div className="space-y-5 sm:grid grid-cols-2 gap-4 md:grid-cols-1">
                    <FormInput2
                        label="Full name"
                        placeholder="e.g. Jon Doe"
                        required
                        className="border-none! bg-neutral-3!"
                        {...register('fullName')}
                        error={errors.fullName?.message}
                    />

                    <FormInput2
                        label="Email address"
                        type="email"
                        placeholder="e.g. Jon.Doe@gmail.com"
                        required
                        className="border-none! bg-neutral-3!"
                        {...register('email')}
                        error={errors.email?.message}
                    />
                </div>

                <FormTextarea1
                    label="Message"
                    placeholder="Your message description"
                    className="h-[17em] lg:h-80 w-full border-none! bg-neutral-3!"
                    required
                    {...register('message')}
                    error={errors.message?.message}
                />

                <ActionButton1 
                    buttonText="Send Message" 
                    buttonType="submit"
                    className="w-full mt-6"  
                    icon="lucide:send-horizontal" 
                    iconPosition="right"
                />
            </form>
        </section>
    )
}