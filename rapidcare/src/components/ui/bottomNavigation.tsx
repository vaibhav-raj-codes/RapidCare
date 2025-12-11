import { Button } from "@/components/ui/button";
import SearchMaps from "../../logic/searchMaps";
import SearchGoogle from "../../logic/searchGoogle";

export default function BottomNavigation() {

    return (
        <>
            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 z-50 w-full md:w-auto md:left-1/2 md:-translate-x-1/2 md:bottom-6 transition-all duration-300 hidden md:block">
                <div className="flex bg-rapid-background-light/80 dark:bg-rapid-background-dark/80 backdrop-blur-xl border-t md:border border-gray-200 dark:border-white/10 pb-safe md:pb-2 md:rounded-full md:shadow-2xl px-2 md:px-6 h-16 md:h-20 items-center justify-around gap-1 md:gap-4 min-w-[320px]">

                    <Button variant="ghost" className="h-full flex-col gap-1 text-gray-400 hover:text-green-400 hover:bg-transparent" asChild>
                        <a href="#">
                            <span className="material-symbols-outlined text-2xl fill-1">home</span>
                            <span className="text-[10px] font-medium">Home</span>
                        </a>
                    </Button>

                    <Button variant="ghost" className="h-full flex-col gap-1 text-gray-400 hover:text-green-400 hover:bg-transparent" asChild>
                        <SearchMaps />
                    </Button>

                    <Button variant="ghost" className="h-full flex-col gap-1 text-gray-400 hover:text-green-400 hover:bg-transparent" asChild>
                        <SearchGoogle />
                    </Button>



                    <Button variant="ghost" className="h-full flex-col gap-1 text-gray-400 hover:text-green-400 hover:bg-transparent" asChild>
                        <a href="tel:112">
                            <span className="material-symbols-outlined text-2xl fill-1">call</span>
                            <span className="text-[10px] font-medium">Call 112</span>
                        </a>
                    </Button>

                </div>
            </nav>
        </>
    )
}