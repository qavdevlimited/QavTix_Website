'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignup } from '@/contexts/HostSignupProvider'
import {
    organizationBusinessSchema,
    type OrganizationBusinessData,
} from '@/schemas/host-signup.schema'
import { ArrowLeft, ArrowRight, Plus, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import FormInput2 from '@/components/custom-utils/inputs/FormInput2'
import FormTextarea1 from '@/components/custom-utils/inputs/FormTextarea1'
import FormSelect1 from '@/components/custom-utils/inputs/FormSelect1'
import FormCheckbox1 from '@/components/custom-utils/inputs/FormCheckbox1'
import MultiStepFormButtonDuo from '@/components/custom-utils/buttons/MultiStepFormButtonDuo'

export function OrganizationBusinessStep() {
    const { formData, updateFormData, nextStep, prevStep } = useSignup()

    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        (formData as Partial<OrganizationBusinessData>)?.eventCategories || []
    )

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<OrganizationBusinessData>({
        resolver: zodResolver(organizationBusinessSchema),
        defaultValues: formData as Partial<OrganizationBusinessData>,
    })

    const { fields, append, remove } = useFieldArray<
        OrganizationBusinessData,
        "relevantLinks",
        "id"
    >({
        control,
        name: "relevantLinks",
    })

    const watchedCategories = watch('eventCategories') ?? []

    const categories = [
        'Concerts & Music',
        'Sports & Fitness',
        'Food & Dining',
        'Festivals',
        'Arts & Theater',
        'Nightlife & Parties',
        'Business & Networking',
        'Travel & Tours',
    ]

    const businessTypes = [
        { value: 'llc', label: 'LLC' },
        { value: 'corporation', label: 'Corporation' },
        { value: 'partnership', label: 'Partnership' },
    ]

    const toggleCategory = (category: string) => {
        const updated = watchedCategories.includes(category)
            ? watchedCategories.filter((c) => c !== category)
            : [...watchedCategories, category]

        setValue('eventCategories', updated, { shouldValidate: true })
        setSelectedCategories(updated)
    }

    const onSubmit = (data: OrganizationBusinessData) => {
        updateFormData(data)
        nextStep()
    }

    useEffect(() => {
        setValue('eventCategories', [])
    },[])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormInput2
                label="Business/Organization name"
                placeholder="Enter your Business/Organization name"
                required
                {...register('businessName')}
                error={errors.businessName?.message}
            />

            <FormSelect1
                label="Business type"
                required
                options={businessTypes}
                {...register('businessType')}
                error={errors.businessType?.message}
            />

            <div className="grid grid-cols-2 gap-4">
                <FormInput2
                    label="Business registration number"
                    placeholder="Enter registration number"
                    required
                    {...register('registrationNumber')}
                    error={errors.registrationNumber?.message}
                />

                <FormInput2
                    label="Tax ID/TIN"
                    placeholder="Enter Tax ID/TIN"
                    required
                    {...register('taxId')}
                    error={errors.taxId?.message}
                />
            </div>

            <FormInput2
                label="Postal code"
                placeholder="Enter your postal code"
                required
                {...register('postalCode')}
                error={errors.postalCode?.message}
            />

            <FormTextarea1
                label="Description"
                placeholder="Let your audience meet you"
                required
                {...register('description')}
                error={errors.description?.message}
            />

            {/* Relevant Links */}
            <div>
                <label className="block text-sm font-medium text-neutral-9 mb-2">
                    Relevant links <span className="text-neutral-6">(Optional)</span>
                </label>
                <div className="space-y-3">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-start">
                            <div className="flex-1">
                                <input
                                    value={field.link}
                                    onChange={(e) => setValue(`relevantLinks.${index}`, { link: e.target.value})}
                                    placeholder="https://website.com or social media link"
                                    className={`
                                        w-full px-4 py-3 text-sm rounded-[6px] h-14 transition-all
                                        ${errors.relevantLinks?.[index] 
                                            ? 'border border-red-400 focus:border-red-500' 
                                            : 'border-[1.5px] border-neutral-5 focus:border-[1.5px] focus:border-primary hover:border-neutral-6'
                                        }
                                        outline-none bg-white text-neutral-9 placeholder:text-neutral-6
                                    `}
                                />
                                {errors.relevantLinks?.[index] && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {errors.relevantLinks[index]?.message}
                                    </p>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => append({
                            link: ""
                        })}
                        className="flex items-center gap-2 text-primary hover:text-primary-7 font-medium text-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Add another link
                    </button>
                </div>
            </div>

            {/* Event Categories */}
            <div className='my-12'>
                <label className="block text-sm font-medium text-neutral-9 mb-5">
                    Select event categories you host <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-5">
                    {categories.map((category,index) => (
                        <FormCheckbox1
                            name={`eventCategories-${index}`}
                            key={`${category}-${index}`}
                            id={`eventCategories-${index}`}
                            checked={selectedCategories.length && selectedCategories.includes(category) ? true : false}
                            onCheckedChange={() => toggleCategory(category)}
                            className=''
                            label={category}
                        />
                    ))}
                </div>
                {errors.eventCategories && (
                    <p className="text-xs text-red-500 mt-1.5 ml-1">
                        {errors.eventCategories.message}
                    </p>
                )}
            </div>

            <MultiStepFormButtonDuo />
        </form>
    )
}