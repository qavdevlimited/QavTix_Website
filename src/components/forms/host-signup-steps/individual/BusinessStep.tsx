'use client'

import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignup } from '@/contexts/HostSignupProvider'
import {
    individualBusinessSchema,
    type IndividualBusinessData,
} from '@/schemas/host-signup.schema'
import { useEffect, useState } from 'react'
import FormInput2 from '@/components/custom-utils/inputs/FormInput2'
import FormTextarea1 from '@/components/custom-utils/inputs/FormTextarea1'
import { Icon } from '@iconify/react'
import FormCheckbox1 from '@/components/custom-utils/inputs/FormCheckbox1'
import MultiStepFormButtonDuo from '@/components/custom-utils/buttons/MultiStepFormButtonDuo'

export function IndividualBusinessStep() {
    const { formData, updateFormData, nextStep, prevStep } = useSignup()

    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        (formData as Partial<IndividualBusinessData>)?.eventCategories || []
    )

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<IndividualBusinessData>({
        resolver: zodResolver(individualBusinessSchema),
        defaultValues: formData as Partial<IndividualBusinessData>,
    })

    const { fields, append, remove } = useFieldArray<
        IndividualBusinessData, 
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

    const toggleCategory = (category: string) => {
        const updated = watchedCategories.includes(category)
            ? watchedCategories.filter((c) => c !== category)
            : [...watchedCategories, category]

        setValue('eventCategories', updated, { shouldValidate: true })
        setSelectedCategories(updated)
    }

    const onSubmit = (data: IndividualBusinessData) => {
        updateFormData(data)
        nextStep()
    }

    
    useEffect(() => {
        setValue('eventCategories', [])
    },[])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormInput2
                label="Brand name"
                placeholder="Enter your brand name"
                required
                {...register('brandName')}
                error={errors.brandName?.message}
            />

            <FormTextarea1
                label="Description"
                placeholder="Let your audience meet you"
                required
                {...register('description')}
                error={errors.description?.message as string}
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
                                <Icon icon="jam:close" width="24" height="24" />
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
                        <Icon icon="stash:plus-duotone" width="24" height="24" />
                        Add more link
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
                            error={errors.eventCategories?.message}
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