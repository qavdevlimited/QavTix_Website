import { motion, AnimatePresence } from "framer-motion"
import { Icon } from "@iconify/react"
import { useState } from "react"


function ActionFeedback({ message }: { message: string }) {
    return (
        <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.6, opacity: 0, y: 10 }}
            className="absolute top-8 right-0 bg-secondary-9 text-white text-xs px-3 py-1.5 rounded-md w-[9em] text-center shadow-lg"
        >
            {message}
        </motion.div>
    )
}

export function EventCardIconActionButton({
    icon,
    onClick,
    feedback,
}: {
    icon: string
    onClick: () => void
    feedback: string
}) {
    const [showFeedback, setShowFeedback] = useState(false)


    const handleClick = () => {
        setShowFeedback(true)
        onClick()
        setTimeout(() => setShowFeedback(false), 1200)
    }


    return (
        <div className="relative">
            <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={handleClick}
                className="flex text-white items-center justify-center shadow"
            >
            <Icon
                icon={icon}
                className="text-white"
                width="20"
            />
            </motion.button>


            <AnimatePresence>
                {showFeedback && <ActionFeedback message={feedback} />}
            </AnimatePresence>
        </div>
    )
}