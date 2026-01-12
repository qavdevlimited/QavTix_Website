import { space_grotesk } from "@/lib/redux/fonts";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import Image from "next/image";


const hostSocials = [
    "hugeicons:new-twitter",
    "hugeicons:instagram",
    "mynaui:youtube-solid",
    "ic:baseline-tiktok",
    "fa6-brands:facebook",
    "humbleicons:globe"
]

export default function HostProfilePageHeader(){
    return (
        <section>
            <div>
                <div className="h-72 md:h-96 relative mb-20 md:mb-16">
                    <div className="rounded-[50px] h-full overflow-hidden">
                        <Image 
                            src="/images/demo-images/unsplash_VdOiqaJsuNA.png" 
                            alt="Host Profile Cover Photo" 
                            width={1000}
                            height={1000}
                            className="w-full h-full"
                        />
                    </div>

                    <div className="bg-white p-3 rounded-full -bottom-16 absolute w-fit">
                        <Image
                            src="/images/demo-images/unsplash_vDmf4My-4k0.png"
                            alt="Host Profile"
                            width={400}
                            height={400}
                            className="object-cover rounded-full aspect-square w-[6.25em] md:w-36"
                        />
                    </div>
                </div>


                <div>
                    <div className="hidden md:flex justify-end -translate-y-10">
                        <button 
                            className={cn(
                                "p-3 rounded-3xl  bg-secondary-6 text-white font-medium text-sm w-36",
                                "hover:bg-secondary-7 hover:shadow-md hover:opacity-95"
                            )}
                        >
                            Subscribe
                        </button>
                    </div>
                    
                    <div className="md:flex justify- items-start gap-10">
                        <div className="">
                            <h1 className={`${space_grotesk.className} text-2xl font-medium text-secondary-9 mb-3`}>Pulse Events Collective</h1>
                            <p className="text-neutral-7">Curating dynamic, high-energy events that blend music, culture, and community, creating memorable experiences people love to share.</p>

                            <div className="flex gap-3 mt-5">
                                {
                                    hostSocials.map((v,i) => (
                                        <Icon icon={v} key={`${v}-${i}`} width="20" height="20" className="size-5.5" />
                                    ))
                                }
                            </div>
                        </div>

                        <div className="mt-10 md:mt-0 flex flex-wrap justify-between items-center gap-5">
                            <div className="flex gap-6 font-medium text-neutral-8 items-center">
                                <span className={`${space_grotesk.className} flex flex-col gap-1`}>
                                    <span className="text-neutral-7">340</span>
                                    <span>Followers</span>
                                </span>
                                <hr className="w-px h-8 border border-neutral-6" />
                                <span className="flex flex-col gap-1">
                                    <span className='text-neutral-7'>34</span>
                                    <span>Events</span>
                                </span>
                            </div>

                            <button 
                                className={cn(
                                    "py-3 px-6 md:hidden shrink-0 rounded-3xl bg-secondary-6 text-white font-medium text-sm w-fit",
                                    "hover:bg-secondary-7 hover:shadow-md hover:opacity-95"
                                )}
                            >
                                Follow
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}