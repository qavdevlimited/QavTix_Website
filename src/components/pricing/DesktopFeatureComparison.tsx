import { Icon } from "@iconify/react"

export default function DesktopFeatureComparison({ data }:{ data: PricingData}) {
    return (
        <div className="hidden lg:block">
            <h2 className="text-2xl font-bold text-neutral-9 mb-8">Feature comparison</h2>
            
            <div className="space-y-8">
                {data.plans.map((plan) => (
                    <div key={plan.id}>
                        <div className="bg-neutral-7 text-white px-6 py-3 rounded-lg font-semibold mb-4">
                            {plan.name}
                        </div>
                        
                        <div className="space-y-3">
                            {data.features.map((feature, index) => {
                                const value = feature[plan.id as keyof PricingFeature]
                                const isBoolean = typeof value === 'boolean'
                                
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between py-3 border-b border-neutral-2"
                                    >
                                        <span className="text-neutral-8">{feature.name}</span>
                                        <div>
                                            {isBoolean ? (
                                                value ? (
                                                <Icon icon="mdi:check" className="w-6 h-6 text-green-500" />
                                                ) : (
                                                <Icon icon="mdi:close" className="w-6 h-6 text-red-500" />
                                                )
                                            ) : (
                                                <span className="text-neutral-8 font-medium">{value}</span>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}