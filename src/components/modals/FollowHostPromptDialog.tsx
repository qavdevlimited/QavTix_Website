import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react'
import { space_grotesk } from '@/lib/redux/fonts'
import { CustomIcons } from '@/components/Svg-Icons'
import { Dispatch, SetStateAction } from 'react'
import { AUTH_ROUTES } from '@/components-data/navigation/navLinks'
import CloseBtn from '../custom-utils/buttons/event-search/CloseBtn'
import { AnimatedDialogForPrompt } from '../custom-utils/AnimatedDialogForPrompts'


export default function FollowHostPromptDialog({ open, setOpen }:{ open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {
    
    const router = useRouter()

    return (
        <AnimatedDialogForPrompt open={open} onOpenChange={(v) => setOpen(v)}>
            <div className="">
                <div className='flex justify-between'>
                    <div className="w-14 h-14 bg-primary-1 rounded-full flex items-center justify-center mb-4">
                        <CustomIcons.userMultipleLock className='size-8' />
                    </div>
                    <CloseBtn action={() => setOpen(false)} />
                </div>

                <div className='max-w-xs'>
                    <DialogHeader className="mb-4">
                        <DialogTitle className={`${space_grotesk.className} text-2xl font-medium`}>
                            Sign in to follow and get updates from this host
                        </DialogTitle>
                    </DialogHeader>
                    
                    <p className="text-neutral-7 mb-8">
                        Only an active user can get updates on future events and news from this organizer.
                    </p>
                </div>
                
                <div className="flex gap-3 justify-center">
                    <Button
                        onClick={() => router.push(AUTH_ROUTES.SIGN_IN.href)}
                        className="h-14 flex-1 text-secondary-8 bg-white hover:shadow flex items-center gap-2 justify-center px-6 py-3 rounded-[30px] border-2 border-secondary-3 font-medium text-sm hover:bg-neutral-2 hover:border-secondary-5 active:bg-neutral-3 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-neutral-4 focus:ring-offset-2 transition-all duration-150"
                    >
                        Sign In
                    </Button>
                    <Button
                        onClick={() => router.push(AUTH_ROUTES.SIGN_UP.href)}
                        className="h-14 flex-1 px-6 py-3 rounded-[30px] bg-primary hover:bg-primary-7 active:bg-primary-8 hover:shadow-md active:scale-[0.98] disabled:bg-neutral-5 disabled:cursor-not-allowed disabled:opacity-60 text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-150 flex items-center justify-center gap-2"
                    >
                        Get Started
                    </Button>
                </div>
            </div>
        </AnimatedDialogForPrompt>
    )
}