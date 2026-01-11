import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { space_grotesk } from '@/lib/redux/fonts'
import { CustomIcons } from '@/components/Svg-Icons'
import { Dispatch, SetStateAction } from 'react'
import { EVENT_ROUTES } from '@/components-data/navigation/navLinks'


export default function ReservationTimeExpiredPrompt({ open, setOpen }:{ open: boolean, setOpen?: Dispatch<SetStateAction<boolean>> }) {
    
    const router = useRouter()

    return (
        <Dialog open={open}>
            <DialogOverlay className='bg-black/40 z-200' />
            <DialogContent showCloseButton={false} className="z-200 w-102.5 max-h-[80vh] rounded-[2.5em] overflow-hidden flex flex-col">
                <div className="py-4">
                    <div className="w-14 h-14 bg-primary-1 rounded-full flex items-center justify-center mb-4">
                        <CustomIcons.timer02 className='size-8' />
                    </div>

                    <div className='max-w-xs text-left'>
                        <DialogHeader className="mb-4">
                            <DialogTitle className={`${space_grotesk.className} text-left text-2xl font-medium`}>
                                Reservation time expired
                            </DialogTitle>
                        </DialogHeader>
                        
                        <p className="text-neutral-7 mb-8">
                            The time limit has ended and your reservation has been released. Please start your purchase again.
                        </p>
                    </div>
                    
                    <div className="flex gap-3 justify-center">
                        <Button
                            onClick={() => router.push(EVENT_ROUTES.EVENTS.href)}
                            className="h-14 flex-1 text-secondary-8 bg-white hover:shadow flex items-center gap-2 justify-center px-6 py-3 rounded-[30px] border-2 border-secondary-3 font-medium text-sm hover:bg-neutral-2 hover:border-secondary-5 active:bg-neutral-3 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-neutral-4 focus:ring-offset-2 transition-all duration-150"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {}}
                            className="h-14 flex-1 px-6 py-3 rounded-[30px] bg-primary hover:bg-primary-7 active:bg-primary-8 hover:shadow-md active:scale-[0.98] disabled:bg-neutral-5 disabled:cursor-not-allowed disabled:opacity-60 text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-150 flex items-center justify-center gap-2"
                        >
                            Restart Purchase
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}