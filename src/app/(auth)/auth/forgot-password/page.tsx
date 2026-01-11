import AuthPageFlexWrapper from "@/components/auth-pages/AuthPageFlexWrapper";
import ForgotPasswordForm from "@/components/forms/auth-pages/ForgotPasswordForm";
import { space_grotesk } from "@/lib/redux/fonts";

export default function ForgotPasswordPage(){
    return (
        <AuthPageFlexWrapper>
            <main>
                <h1 className={`${space_grotesk.className} text-secondary-9 text-2xl md:text-3xl font-bold mt-4 mb-2`}>Forgot Password?</h1>
                <p className="text-neutral-7 text-sm">Enter the email address or phone number you used signing up, we’ll send you reset instructions.</p>

                <ForgotPasswordForm />
            </main>
        </AuthPageFlexWrapper>
    )
}