import { currencies } from "@/components-data/settings.data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserSettings } from "@/lib/custom-hooks/useUserSettings";
import { cn } from "@/lib/utils";

export default function CurrencySwitcher({ className }:{ className?: string }){

    const { currency, isPending, updateCurrency } = useUserSettings()


    const handleCurrenyChange = (v: string) => {
        const currencyObj = currencies.find(curr => curr.code === v)

        currencyObj && updateCurrency(currencyObj)
    }

    return (
        <Select value={currency.code} onValueChange={handleCurrenyChange}>
            <SelectTrigger
                disabled={isPending} 
                className={cn(
                    className,
                    "disabled:-65 text-neutral-8 font-medium disabled:cursor-not-allowed w-28 bg-white rounded-lg border-neutral-3 hover:border-neutral-4 focus:border-primary-6",
                )}>
                <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
                {currencies.map((region) => (
                    <SelectItem key={region.code} value={region.code}>
                        <span className="flex items-center gap-2">
                            <span>{region.symbol}</span>
                            <span>{region.label}</span>
                        </span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}