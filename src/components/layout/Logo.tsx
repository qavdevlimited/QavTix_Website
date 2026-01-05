import Image from "next/image";
import logoSrc from "@/public-assets/logo/qavtix-logo.svg"
import Link from "next/link";

export default function Logo(){
    return (
        <Link href="/" className="inline-block">
            <Image src={logoSrc} alt="Qavtix Logo" width={90} height={40} />
        </Link>
    )
}