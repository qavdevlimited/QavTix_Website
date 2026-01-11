import { Icon } from "@iconify/react"

interface MobileFeatureComparisonProps {
  data: PricingData
}

export default function MobileFeatureComparison({ data }: MobileFeatureComparisonProps) {
    return (
        <div className="lg:hidden">
            <h2 className="text-xl font-bold text-neutral-9 mb-6">Feature comparison</h2>
            
            <div className="space-y-6">
                {data.plans.map((plan) => (
                    <div key={plan.id} className="border-2 border-neutral-3 rounded-xl p-4">
                        <div className="bg-neutral-7 text-white px-4 py-2 rounded-lg font-semibold mb-4 text-center">
                            {plan.name}
                        </div>
                        
                        <div className="space-y-2">
                            {data.features.map((feature, index) => {
                                const value = feature[plan.id as keyof PricingFeature]
                                const isBoolean = typeof value === 'boolean'
                                
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between py-2"
                                    >
                                        <span className="text-sm text-neutral-8">{feature.name}</span>
                                        <div>
                                            {isBoolean ? (
                                                value ? (
                                                <Icon icon="mdi:check" className="w-5 h-5 text-green-500" />
                                                ) : (
                                                <Icon icon="mdi:close" className="w-5 h-5 text-red-500" />
                                                )
                                            ) : (
                                                <span className="text-sm text-neutral-8 font-medium">{value}</span>
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