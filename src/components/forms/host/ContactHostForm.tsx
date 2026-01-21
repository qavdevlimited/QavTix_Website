"use client"

import { contactHostSchema, ContactHostSchema } from "@/schemas/contact-host.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { SOCIAL_LINKS } from "@/components-data/navigation/contact-and-socials"
import { Icon } from "@iconify/react"
import { space_grotesk } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import FormInput2 from "@/components/custom-utils/inputs/FormInput2"
import FormTextarea1 from "@/components/custom-utils/inputs/FormTextarea1"
import ActionButton1 from "@/components/custom-utils/buttons/ActionButton1"


export default function ContactHostForm(){

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, isSubmitting }
    } = useForm<ContactHostSchema>({
        resolver: zodResolver(contactHostSchema),
    })

    return (
        <div>
            <h3 className={cn(
                space_grotesk.className,
                "text-secondary-9 font-medium mt-10 mb-4"
            )}>
                Contact the host
            </h3>
            <div className="flex gap-4 mt-6 mb-10">
                {Object.values(SOCIAL_LINKS).map((social) => (
                    <Link
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center hover:scale-110 transition-transform"
                        aria-label={social.label}
                    >
                        <Icon icon={social.icon} width="24" height="24" className='text-secondary-9 size-9' />
                    </Link>
                ))}
            </div>
            <form className="space-y-5 mb-10 md:max-w-sm">
                <div className="space-y-5 sm:grid grid-cols-2 gap-4 md:grid-cols-1">
                    <FormInput2
                        label="Full name"
                        placeholder="Enter your first and last name"
                        required
                        {...register('fullName')}
                        error={errors.fullName?.message}
                    />

                    <FormInput2
                        label="Email address"
                        type="email"
                        placeholder="Enter your email address"
                        required
                        {...register('email')}
                        error={errors.email?.message}
                    />
                </div>

                <FormTextarea1
                    label="Message"
                    placeholder=""
                    className="h-[15em] w-full"
                    required
                    {...register('message')}
                    error={errors.message?.message}
                />

                <ActionButton1 
                    buttonText="Send Message" 
                    className="w-full mt-6"  
                    icon="lucide:send-horizontal" 
                    iconPosition="right"
                />
            </form>
        </div>
    )
}