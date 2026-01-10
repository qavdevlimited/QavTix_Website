interface IActionButton1Props {
    className?: string;
    buttonText: string;
    isLoading?: boolean;
    isDisabled?: boolean;
    action?: () => void;
    buttonType?: "button" | "submit";
}

export default function ActionButton2({ className, buttonText, isLoading, isDisabled, action, buttonType = "button" }: IActionButton1Props) {
    
    // Prevents Hydration Errors by ensuring consistent rendering on server and client
    const handleActionClick = () => {
        if (action){
            action()
        }
    }
    
    return (
        <button
            disabled={isLoading || isDisabled}
            type={buttonType}
            onClick={handleActionClick}
            className={`w-full text-sm bg-transparent border border-secondary-6 text-secondary-8 py-3.5 rounded-[3em] h-14.5 font-medium transition-all duration-200
                hover:bg-secondary-1 hover:border-secondary-7
                active:bg-secondary-2 active:scale-[0.98]
                disabled:bg-neutral-3 disabled:border-neutral-4 disabled:text-neutral-6 disabled:cursor-not-allowed
                shadow-sm hover:shadow-md active:shadow-inner
                ${className}`}
        >
            {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-secondary-8 border-t-transparent"></span>
                    Loading...
                </span>
            ) : (
                buttonText
            )}
        </button>
    )
}