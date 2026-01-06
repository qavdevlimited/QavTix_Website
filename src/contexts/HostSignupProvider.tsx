'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { 
  IndividualGeneralData, 
  OrganizationGeneralData,
  IndividualBusinessData,
  OrganizationBusinessData,
  PasswordData
} from '@/schemas/host-signup.schema'

type HostSignupFormData = 
  | Partial<IndividualGeneralData>
  | Partial<IndividualBusinessData>
  | Partial<OrganizationGeneralData>
  | Partial<OrganizationBusinessData>
  | Partial<PasswordData>
  | Record<string, never>

type SignupContextType = {
  currentStep: number
  signUpSuccessful: boolean
  formData: HostSignupFormData
  setCurrentStep: (step: number) => void
  updateFormData: (data: Partial<HostSignupFormData>) => void
  nextStep: () => void
  prevStep: () => void
  resetForm: () => void
}

const SignupContext = createContext<SignupContextType | undefined>(undefined)

export function HostSignupProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<HostSignupFormData>({})

  const updateFormData = (data: Partial<HostSignupFormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const nextStep = () => setCurrentStep(prev => prev + 1)
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))
  
  const resetForm = () => {
    setCurrentStep(1)
    setFormData({})
  }

  return (
    <SignupContext.Provider
      value={{
        currentStep,
        formData,
        setCurrentStep,
        signUpSuccessful: false,
        updateFormData,
        nextStep,
        prevStep,
        resetForm
      }}
    >
      {children}
    </SignupContext.Provider>
  )
}

export function useSignup() {
  const context = useContext(SignupContext)
  if (!context) {
    throw new Error('useSignup must be used within HostSignupProvider')
  }
  return context
}