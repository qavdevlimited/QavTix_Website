'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignup } from '@/contexts/HostSignupProvider'
import { passwordSchema, type PasswordData } from '@/schemas/host-signup.schema'
import PasswordInput2 from '@/components/custom-utils/inputs/PasswordInput2'
import MultiStepFormButtonDuo from '@/components/custom-utils/buttons/MultiStepFormButtonDuo'
import PasswordStrengthIndicator from '@/components/custom-utils/PasswordStrengthIndicator'

export function PasswordStep() {


    const { formData, updateFormData } = useSignup()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<PasswordData>({
        resolver: zodResolver(passwordSchema),
        defaultValues: formData as Partial<PasswordData>,
    })

    const onSubmit = (data: PasswordData) => {
        updateFormData(data)
    }

    const password = watch("password")

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <PasswordInput2
                label="Password"
                placeholder="Enter your password"
                required
                {...register('password')}
                error={errors.password?.message}
            />

            <PasswordInput2
                label="Confirm Password"
                placeholder="Confirm your password"
                required
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
            />

            <PasswordStrengthIndicator password={password} />

            <MultiStepFormButtonDuo isSubmitting={isSubmitting} />
        </form>
    )
}