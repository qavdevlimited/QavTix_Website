interface IActionButton1Props {
    className?: string;
    buttonText: string;
    isLoading?: boolean;
    isDisabled?: boolean;
    action?: () => void;
    buttonType?: "button" | "submit";
}

export default function ActionButton1({ className, buttonText, isLoading, isDisabled, action, buttonType = "button" }: IActionButton1Props) {
    return (
        <button
            disabled={isLoading || isDisabled}
            type={buttonType}
            onClick={action ? () => action() : undefined}
            className={`w-full text-sm bg-primary hover:bg-primary-7 active:bg-primary-8 disabled:bg-neutral-5 disabled:cursor-not-allowed text-white py-3.5 rounded-[3em] h-14.5 font-medium transition-colors ${className}`}
        >
            {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                    Loading...
                </span>
            ) : (
                buttonText
            )}
        </button>
    )
}