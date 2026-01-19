'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AnimatedDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger?: React.ReactNode
  title?: string
  children: React.ReactNode
  className?: string
  position?: 'center' | 'top'
}

export function AnimatedDialog({
  open,
  onOpenChange,
  trigger,
  title,
  children,
  className = '',
  position = 'center'
}: AnimatedDialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>}

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-100 bg-black/60",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-300 data-[state=open]:ease-out",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-200 data-[state=closed]:ease-in",
          )}
        />

        <DialogPrimitive.Content
          className={cn(
            "fixed z-100 w-full max-w-125 bg-white rounded-4xl shadow-2xl outline-none",
            // Position classes
            position === 'center' && "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            position === 'top' && "left-1/2 top-20 -translate-x-1/2",
            // Open animation
            "data-[state=open]:animate-in",
            "data-[state=open]:fade-in-0",
            "data-[state=open]:duration-900 data-[state=open]:ease-[cubic-bezier(0.16,1,0.3,1)]",
            "data-[state=open]:zoom-in-[0.75]",
            "data-[state=open]:slide-in-from-bottom-10",
            // Close animation
            "data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0",
            "data-[state=closed]:duration-400 data-[state=closed]:ease-in",
            "data-[state=closed]:zoom-out-[0.75]",
            "data-[state=closed]:slide-out-to-bottom-8",
            className
          )}
        >
          {title && (
            <DialogPrimitive.Title className="px-6 pt-6 text-xl font-semibold">
              {title}
            </DialogPrimitive.Title>
          )}

          <div className="px-6 py-6">{children}</div>

          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-2 hover:bg-neutral-2 transition-colors">
            <X className="h-5 w-5 text-neutral-7" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}