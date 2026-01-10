import { HostAccountTypes } from "@/components-data/auth-pages/enums";
import HostSignUpContent from "@/components/auth-pages/HostSignUpContent";
import { HostSignupProvider } from "@/contexts/HostSignupProvider";
import { HostAccountType } from "@/schemas/host-signup.schema";
import { redirect } from "next/navigation";

export default async function HostSignupPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    
    const params = await searchParams;
    const hostAccountType = params.type as HostAccountType | undefined;

    if (!hostAccountType || (hostAccountType !== HostAccountTypes.INDIVIDUAL && hostAccountType !== HostAccountTypes.ORGANIZATION)) {
        redirect('/auth/signup')
    }
    
    return (
        <HostSignupProvider>
            <HostSignUpContent hostAccountType={hostAccountType} />
        </HostSignupProvider>
    )
}