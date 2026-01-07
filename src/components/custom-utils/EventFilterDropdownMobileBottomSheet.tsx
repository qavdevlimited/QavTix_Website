'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useEffect } from 'react'
import { Icon } from '@iconify/react'

interface MobileBottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  className?: string
}

export function MobileBottomSheet({
  isOpen,
  onClose,
  title,
  children,
  className = '',
}: MobileBottomSheetProps) {


    useEffect(() => {
        if (isOpen) {
        document.body.style.overflow = 'hidden'
        } else {
        document.body.style.overflow = 'unset'
        }

        return () => {
        document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return (
        <AnimatePresence>
        {isOpen && (
            <>
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-neutral-5 backdrop-blur-sm z-90"
                    onClick={onClose}
                />

                {/* Bottom Sheet */}
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{
                        type: 'spring',
                        damping: 30,
                        stiffness: 300,
                    }}
                    className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-2xl z-95 max-h-[90vh] overflow-y-auto"
                >
                    <div className={`p-6 space-y-6 ${className}`}>
                        {/* Header */}
                        {(title || true) && (
                            <div className="flex items-center justify-between">
                            {title && (
                                <h3 className="font-medium text-xl text-secondary-9">
                                {title}
                                </h3>
                            )}
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-neutral-2 rounded-full transition-colors"
                                aria-label="Close"
                            >
                                <Icon
                                icon="flowbite:close-outline"
                                width="24"
                                height="24"
                                className="text-[#1E1E1E]"
                                />
                            </button>
                            </div>
                        )}

                        {/* Content */}
                        {children}

                        {/* Safe area bottom padding */}
                        <div className="pb-safe" />
                    </div>
                </motion.div>
            </>
        )}
        </AnimatePresence>
    )
}