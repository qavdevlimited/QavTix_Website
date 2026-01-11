import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

export default function PricingCard({ plan }:{ plan: PricingPlan }) {
    return (
        <div
            className={cn(
                'relative rounded-2xl border-2 p-8 bg-white transition-all',
                plan.highlighted
                ? 'border-primary-6 shadow-xl scale-105'
                : 'border-neutral-3 hover:border-neutral-4'
            )}
            >
            {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-6 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-xl font-bold text-neutral-9 mb-4">{plan.name}</h3>
                
                <div className="mb-4">
                    {plan.price === 0 && plan.currency === 'Custom' ? (
                        <div className="text-3xl font-bold text-neutral-9">Custom</div>
                    ) : (
                        <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-neutral-9">
                            {plan.currency}{plan.price === 0 ? '0' : plan.price.toLocaleString()}
                        </span>
                        <span className="text-neutral-6">/month</span>
                        </div>
                    )}
                
                    {plan.perTicketFee > 0 && (
                        <p className="text-sm text-neutral-6 mt-1">
                        + {plan.perTicketFee}% per ticket
                        </p>
                    )}
                </div>

                <p className="text-sm text-neutral-7">{plan.description}</p>
                
                {plan.trial && (
                <p className="text-sm font-semibold text-primary-6 mt-2">{plan.trial}</p>
                )}
            </div>

            <button
                className={cn(
                'w-full py-3 rounded-lg font-semibold transition-colors mb-6',
                plan.buttonVariant === 'primary'
                    ? 'bg-primary-6 hover:bg-primary-7 text-white'
                    : 'bg-neutral-7 hover:bg-neutral-8 text-white'
                )}
            >
                {plan.buttonText}
            </button>

            <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <Icon
                            icon="mdi:check-circle"
                            className="w-5 h-5 text-green-500 shrink-0 mt-0.5"
                        />
                        <span className="text-sm text-neutral-8">{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}