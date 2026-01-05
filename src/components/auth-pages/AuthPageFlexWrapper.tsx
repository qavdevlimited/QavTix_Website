// Wrapper for auth pages with flex centering

import Logo from "../layout/Logo";
import AuthPageImageCarousel from "./AuthPageImageCarousel";

export default function AuthPageFlexWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white global-px pb-10">
            <div className="flex justify-center items-center h-24">
                <Logo />
            </div>
            <div className="lg:flex justify-between">
                <div>
                    {children}
                </div>
                <AuthPageImageCarousel />
            </div>
        </div>
    )
}