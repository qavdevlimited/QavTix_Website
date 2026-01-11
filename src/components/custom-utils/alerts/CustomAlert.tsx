'use client'

import { useEffect } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { hideAlert } from '@/lib/redux/slices/alertSlice'

const variantStyles = {
  default: 'bg-background border-border text-foreground',
  destructive: 'bg-destructive/10 border-destructive/50 text-destructive',
  success: 'bg-green-50 border-green-500/50 text-green-800',
  warning: 'bg-yellow-50 border-yellow-500/50 text-yellow-800',
  info: 'bg-blue-50 border-blue-500/50 text-blue-800',
}

const variantIcons = {
  default: <Info className="h-5 w-5" />,
  destructive: <AlertCircle className="h-5 w-5" />,
  success: <CheckCircle2 className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />,
}

export default function GlobalAlert() {

    const dispatch = useAppDispatch()
    const { isOpen, title, description, variant, duration, icon } = useAppSelector(store => store.alert)

    useEffect(() => {
        if (!isOpen || !duration) return

        const timer = setTimeout(() => {
            dispatch(hideAlert())
        }, duration)

        return () => clearTimeout(timer)
    }, [isOpen, duration, dispatch])

    if (!isOpen) return null

    const IconComponent = icon || variantIcons[variant as keyof typeof variantIcons]

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-1000 w-full max-w-xl px-4">
            <Alert
                variant={variant === 'default' ? 'default' : 'destructive'}
                className={cn(
                'border shadow-lg animate-in fade-in-0 zoom-in-95 slide-in-from-top-5 duration-300',
                    variantStyles[variant as keyof typeof variantIcons]
                )}
            >
                {IconComponent}
                <div className="flex-1">
                <AlertTitle className="font-semibold">{title}</AlertTitle>
                {description && (
                    <AlertDescription className="mt-1 text-sm">
                        {description}
                    </AlertDescription>
                )}
                </div>
            </Alert>
        </div>
    )
}