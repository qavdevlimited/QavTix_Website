'use client'

import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogTitle } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react'
import { space_grotesk } from '@/lib/redux/fonts'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { getAvatarColor } from '@/helper-fns/getAvatarColor'
import { getInitialsFromName } from '@/helper-fns/getInitialFromName'
import { mockAttendees } from '@/components-data/demo-data'
import { CustomIcons } from '@/components/Svg-Icons'
import CloseBtn from '@/components/custom-utils/buttons/event-search/CloseBtn'

export default function AttendeesModal() {
    

    const router = useRouter()
    const [isRegistered, setIsRegistered] = useState(false)
    const [attendees, setAttendees] = useState<Attendee[]>(mockAttendees)

    const handleGetTicket = () => {
        router.push('/checkout')
    }

    return (
        <Dialog open={true} onOpenChange={() => router.back()}>
               <DialogOverlay className='bg-black/40 z-200' />
            <DialogContent showCloseButton={false} className="z-200 w-102.5 max-h-[80vh] rounded-[2.5em] overflow-hidden flex flex-col">
               { !isRegistered ? (
                    // Unauthenticated/Unregistered View
                    <div className="py-4">
                        <div className='flex justify-between'>
                            <div className="w-14 h-14 bg-primary-1 rounded-full flex items-center justify-center mb-4">
                                <CustomIcons.userMultipleLock className='size-8' />
                            </div>
                            <CloseBtn action={() => router.back()} />
                        </div>

                        <div className='max-w-xs'>
                            <DialogHeader className="mb-4">
                                <DialogTitle className={`${space_grotesk.className} text-2xl font-medium`}>
                                    Get a ticket to view attendee list
                                </DialogTitle>
                            </DialogHeader>
                            
                            <p className="text-neutral-7 mb-8">
                                Attendee list is only available to registered attendees only.
                            </p>
                        </div>
                        
                        <div className="flex gap-3 justify-center">
                            <Button
                                onClick={() => router.back()}
                                className="h-14 flex-1 text-secondary-8 bg-white hover:shadow flex items-center gap-2 justify-center px-6 py-3 rounded-[30px] border-2 border-secondary-3 font-medium text-sm hover:bg-neutral-2 hover:border-secondary-5 active:bg-neutral-3 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-neutral-4 focus:ring-offset-2 transition-all duration-150"
                            >
                                Close
                            </Button>
                            <Button
                                onClick={handleGetTicket}
                                className="h-14 flex-1 px-6 py-3 rounded-[30px] bg-primary hover:bg-primary-7 active:bg-primary-8 hover:shadow-md active:scale-[0.98] disabled:bg-neutral-5 disabled:cursor-not-allowed disabled:opacity-60 text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-150 flex items-center justify-center gap-2"
                            >
                                Get ticket
                            </Button>
                        </div>
                    </div>
                ) : (
                // Registered User - Show Attendees
                <>
                    <DialogHeader>
                        <div className='flex justify-between'>
                            <DialogTitle className={cn(space_grotesk.className, "text-2xl w-fit")}>
                                Attendees ({attendees.length})
                            </DialogTitle>
                            <button
                                onClick={() => router.back()}
                                className="p-2"
                                aria-label="Close"
                            >
                                <Icon
                                    icon="flowbite:close-outline"
                                    width="24"
                                    height="24"
                                    className="text-[#1E1E1E] hover:text-red-700"
                                />
                            </button>
                        </div>
                    </DialogHeader>

                    <div className="mt-4 flex-1 overflow-y-auto">
                    {/* Table View */}
                    <div className="border rounded-lg">
                        <table className="w-full">
                            <thead className="bg-neutral-2 border-b">
                                <tr>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-8">
                                        Attendee
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-8">
                                        Username
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendees.map((attendee, index) => (
                                <tr 
                                    key={attendee.id}
                                    className={cn(
                                    "border-b last:border-b-0 hover:bg-neutral-1 transition-colors",
                                    index % 2 === 0 ? 'bg-white' : 'bg-neutral-1/50'
                                    )}
                                >
                                    <td className="py-3 px-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="size-10">
                                            {attendee.profile_img && (
                                                <AvatarImage src={attendee.profile_img} />
                                            )}
                                            <AvatarFallback
                                                className={`${getAvatarColor(attendee.id.toString())} text-white font-medium`}
                                            >
                                                {getInitialsFromName(attendee.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium text-xs text-neutral-9">
                                            {attendee.name}
                                        </span>
                                    </div>
                                    </td>
                                    <td className="py-3 px-4 text-xs text-neutral-7">
                                        @{attendee.username}
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {attendees.length === 0 && (
                        <div className="text-center py-12 text-neutral-6">
                            <Icon icon="lucide:users" className="w-12 h-12 mx-auto mb-3 opacity-40" />
                            <p>No attendees yet</p>
                        </div>
                    )}
                    </div>
                </>
                )}
            </DialogContent>
        </Dialog>
    )
}