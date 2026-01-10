'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { HostAccountTypes } from '@/components-data/auth-pages/enums'
import { HostAccountType } from '@/schemas/host-signup.schema'

export function HostAccountTypeSelector() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const hostAccountType = searchParams.get("type")

  const handleSelect = (type: 'individual' | 'organization') => {
    if (type === 'individual') {
      router.push('/auth/signup/host?type=individual')
    } else {
      router.push('/auth/signup/host?type=organization')
    }
  }

  return (
    <div className="">
      <h2 className="text-sm text-neutral-8 mb-5">
        How would you like to sign up as a host?
      </h2>

      <RadioGroup defaultValue={hostAccountType!} onValueChange={v => handleSelect(v as HostAccountType)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label
          htmlFor={HostAccountTypes.INDIVIDUAL}
          className={`px-6 py-3 min-h-20 h-[5.4em] rounded-xl flex cursor-pointer items-center gap-6 border-[1.6px] hover:border-primary hover:bg-primary-1 transition-all text-left group ${hostAccountType === HostAccountTypes.INDIVIDUAL ? "border-primary-6 bg-primary-1" : "bg-white border-neutral-4"}`}
        >
          <RadioGroupItem 
            value={HostAccountTypes.INDIVIDUAL} 
            id={HostAccountTypes.INDIVIDUAL}
            className="data-[state=checked]:border-[1.5px] data-[state=checked]:border-primary-6 size-6"
            circleIconClass="size-3"
          />
          <div>
            <h3 className="text-sm font-medium text-secondary-9 mb-1">
              As an Individual
            </h3>
            <p className="text-neutral-7 text-xs">
              Personal account for users
            </p>
          </div>
        </label>

        <label
          htmlFor={HostAccountTypes.ORGANIZATION}
          className={`px-6 py-3 min-h-20 h-[5.4em] rounded-xl flex cursor-pointer items-center gap-6 border-[1.6px] hover:border-primary hover:bg-primary-1 transition-all text-left group ${hostAccountType === HostAccountTypes.ORGANIZATION ? "border-primary-6 bg-primary-1" : "bg-white border-neutral-4"}`}
        >
          <RadioGroupItem 
            value={HostAccountTypes.ORGANIZATION} 
            id={HostAccountTypes.ORGANIZATION}
            className="data-[state=checked]:border-[1.5px] data-[state=checked]:border-primary-6 size-6"
            circleIconClass="size-3"
          />
          <div>
            <h3 className="text-sm font-medium text-secondary-9 mb-1">
              As an Organization
            </h3>
            <p className="text-neutral-7 text-xs">
              Designed for Brands/Companies
            </p>
          </div>
        </label>
      </RadioGroup>
    </div>
  )
}