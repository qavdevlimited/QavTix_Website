"use client"

import { Icon } from "@iconify/react";

export default function SocialAuthButtons(){
    return (
        <>
            <button className="rounded-lg basis-[47%] lg:basis-[30%] flex text-sm items-center justify-center gap-2 border-[1.5px] border-neutral-5 h-14 hover:bg-neutral-2 hover:border-neutral-6 focus:outline-none focus:ring-2 focus:ring-primary-6 focus:ring-offset-2 active:scale-[0.98] transition-all duration-200">
                <Icon icon="material-icon-theme:google" width="16" height="16" className="size-6" />
                <span className="font-bold">Google</span>
            </button>

            <button className="rounded-lg basis-[47%] lg:basis-[30%] flex text-sm items-center justify-center gap-2 border-[1.5px] border-neutral-5 h-14 hover:bg-neutral-2 hover:border-neutral-6 focus:outline-none focus:ring-2 focus:ring-primary-6 focus:ring-offset-2 active:scale-[0.98] transition-all duration-200">
                <Icon icon="devicon:facebook" width="32" height="32" className="size-6" />
                <span className="font-bold">Facebook</span>
            </button>

            <button className="flex-1 lg:flex-auto lg:basis-[30%] bg-neutral-10 flex text-sm items-center justify-center gap-2 h-14 rounded-lg text-white hover:bg-neutral-9 focus:outline-none focus:ring-2 focus:ring-neutral-8 focus:ring-offset-2 active:scale-[0.98] transition-all duration-200">
                <Icon icon="ic:baseline-apple" width="32" height="32" className="size-6" />
                <span className="font-bold">Apple</span>
            </button>
        </>
    )
}