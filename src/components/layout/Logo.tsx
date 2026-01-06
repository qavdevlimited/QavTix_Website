import Image from "next/image";
import logoSrc from "@/public-assets/logo/qavtix-logo.svg"
import Link from "next/link";

export default function Logo({ width = 80, height = 35 }: { width?: number; height?: number }) {
    return (
        <Link href="/" className="inline-block">
            <Image src={logoSrc} alt="Qavtix Logo" width={width} height={height} />
        </Link>
    )
}