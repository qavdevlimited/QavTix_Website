'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import FormInput2 from '@/components/custom-utils/inputs/FormInput2'
import { useTicketUser } from '@/contexts/TicketUserProvider'
import { AttendeeFormData } from '@/schemas/checkout-flow.schema'
import { useSplitPayment } from '@/contexts/SplitPaymentContextProvider'
import { mockUserGroups } from '@/components-data/demo-data'
import { space_grotesk } from '@/lib/redux/fonts'
import { cn } from '@/lib/utils'

interface AttendeeCardProps {
    attendee: AttendeeFormData
    index: number
    canRemove: boolean
    allAttendees: AttendeeFormData[]
}

export default function SplitPaymentAddAttendee({ attendee, index, canRemove, allAttendees }: AttendeeCardProps) {

    const { splitMode, updateAttendee, splitPaymentEnabled, removeAttendee, copyFromSource } = useSplitPayment()
    const { user } = useTicketUser()
    const [selectedGroup, setSelectedGroup] = useState<string>('')
    const [selectedMember, setSelectedMember] = useState<string>('')

    const handleCopyFrom = (source: string) => {
        if (source === 'myself') {
            copyFromSource(attendee.id, 'myself')
        } else if (source.startsWith('attendee-')) {
            copyFromSource(attendee.id, source)
        } else if (source.startsWith('group-')) {
            setSelectedGroup(source)
            setSelectedMember('')
        }
    }

    const handleMemberSelect = (memberId: string) => {
        const group = mockUserGroups.find(g => g.id === selectedGroup)
        if (group) {
            const memberIndex = parseInt(memberId)
            const member = group.members[memberIndex]
            if (member) {
                updateAttendee(attendee.id, {
                    name: member.name,
                    email: member.email,
                    phone: member.phone
                })
                setSelectedMember(memberId)
            }
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex w-full justify-between items-center gap-3">
                    <h3 className={`${space_grotesk.className} font-medium md:text-lg text-secondary-9`}>
                        Attendee {index + 1}
                    </h3>
                    
                    {/* Amount Input - Small select-like input */}
                    <div className={cn("items-center gap-2", splitPaymentEnabled ? "flex" : "hidden" )}>
                        <input
                            type="number"
                            value={attendee.amount || ''}
                            onChange={(e) => updateAttendee(attendee.id, { 
                                amount: parseFloat(e.target.value) || 0 
                            })}
                            disabled={splitMode === 'equal'}
                            className="w-24 px-2 py-1 text-sm border border-neutral-4 rounded-md focus:outline-[1.5px] focus:outline-neutral-6 focus:border-none disabled:bg-neutral-2 disabled:cursor-not-allowed"
                            placeholder="₦0.00"
                        />
                    </div>
                </div>

                {canRemove && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttendee(attendee.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                        <Icon icon="mdi:close" className="w-5 h-5" />
                    </Button>
                )}
            </div>

            {/* Copy Details From Dropdown */}
            <div className='mt-4 mb-6'>
                <Select onValueChange={handleCopyFrom}>
                    <SelectTrigger className="w-full bg-neutral-2 text-xs">
                        <SelectValue placeholder="Copy details from" />
                    </SelectTrigger>
                    <SelectContent className='text-neutral-8'>
                        {/* Myself */}
                        {user && (
                            <SelectItem value="myself" className='text-xs'>
                                <div className="flex items-center gap-2">
                                    <Icon icon="mdi:account-circle" className="w-4 h-4" />
                                    <span>Myself</span>
                                </div>
                            </SelectItem>
                        )}

                        {/* User Groups */}
                        {mockUserGroups.map(group => (
                            <SelectItem key={group.id} value={group.id} className='text-xs'>
                                <div className="flex items-center gap-2">
                                    <Icon icon="mdi:account-group" className="w-4 h-4" />
                                    <span>{group.name}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* If group selected, show member selector */}
                {selectedGroup && (
                    <Select value={selectedMember} onValueChange={handleMemberSelect}>
                        <SelectTrigger className="w-full bg-neutral-2 text-xs mt-2">
                            <SelectValue placeholder="Select member from group" />
                        </SelectTrigger>
                        <SelectContent>
                            {mockUserGroups
                                .find(g => g.id === selectedGroup)
                                ?.members.map((member, idx) => (
                                    <SelectItem key={idx} value={idx.toString()} className='text-xs'>
                                        {member.name}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                )}
            </div>

            {/* Manual Input Fields */}
            <div className="space-y-4 text-neutral-8">
                <FormInput2
                    label="Attendee name"
                    placeholder="e.g. Jon"
                    value={attendee.name}
                    onChange={(e) => updateAttendee(attendee.id, { name: e.target.value })}
                    required
                    className="bg-neutral-2 border-neutral-5! focus:border-accent-5!"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput2
                        label="Attendee email address"
                        placeholder="e.g. Jon.Doe@gmail.com"
                        value={attendee.email}
                        onChange={(e) => updateAttendee(attendee.id, { email: e.target.value })}
                        required
                        className="bg-neutral-2 border-neutral-5! focus:border-accent-5!"
                    />
                    <FormInput2
                        label="Attendee phone number"
                        placeholder="e.g. +234 806 123 4567"
                        value={attendee.phone}
                        onChange={(e) => updateAttendee(attendee.id, { phone: e.target.value })}
                        required
                        className="bg-neutral-2 border-neutral-5! focus:border-accent-5!"
                    />
                </div>
            </div>
        </div>
    )
}
