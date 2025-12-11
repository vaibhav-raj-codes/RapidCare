import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MyHeader() {
    // Initialize state based on document class or local storage if implementing persistence
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Init: check if html has dark class
        if (document.documentElement.classList.contains('dark')) {
            setIsDark(true);
        } else {
            setIsDark(false);
        }
    }, []);

    const toggleTheme = () => {
        const newMode = !isDark;
        setIsDark(newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        // Header
        <header className="sticky top-0 z-30 flex items-center justify-between bg-rapid-background-light/90 dark:bg-rapid-background-dark/90 backdrop-blur-md p-4 pb-2 border-b border-gray-200 dark:border-white/10">
            <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rapid-alert text-white">
                    <span className="material-symbols-outlined text-2xl">medical_services</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">RapidCare</h1>
            </div>

            {/* Desktop View */}
            <div className="hidden md:flex items-center gap-3">
                <button
                    onClick={toggleTheme}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white transition-colors hover:bg-gray-300 dark:hover:bg-white/20"
                    aria-label="Toggle Dark Mode"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        {isDark ? 'light_mode' : 'dark_mode'}
                    </span>
                </button>

                <a
                    className="flex items-center gap-1.5 rounded-full bg-rapid-alert/10 px-4 py-2 text-sm font-bold text-rapid-alert hover:bg-rapid-alert/20 transition-colors border border-rapid-alert/20"
                    href="tel:112"
                >
                    <span className="material-symbols-outlined text-[18px] fill-1">call</span>
                    <span>Call 112</span>
                </a>
            </div>

            {/* Mobile View (Dropdown) */}
            <div className="flex md:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors outline-none">
                            <span className="material-symbols-outlined text-gray-900 dark:text-white">menu</span>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-black border-gray-200 dark:border-white/10">
                        <DropdownMenuItem onClick={toggleTheme} className="cursor-pointer">
                            <span className="material-symbols-outlined mr-2 text-[20px] text-gray-700 dark:text-white">
                                {isDark ? 'light_mode' : 'dark_mode'}
                            </span>
                            <span className="text-gray-700 dark:text-white font-medium">
                                {isDark ? 'Switch to Light' : 'Switch to Dark'}
                            </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="cursor-pointer">
                            <a href="#" className="flex items-center w-full text-gray-700 dark:text-white">
                                <span className="material-symbols-outlined mr-2 text-[20px] fill-1">home</span>
                                <span className="font-medium">Home</span>
                            </a>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild className="cursor-pointer">
                            <a href="https://www.google.com/maps/search/?api=1&query=hospitals+near+me" target="_blank" rel="noopener noreferrer" className="flex items-center w-full text-gray-700 dark:text-white">
                                <span className="material-symbols-outlined mr-2 text-[20px] fill-1">map</span>
                                <span className="font-medium">Find Hospitals</span>
                            </a>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild className="cursor-pointer">
                            <a href="https://www.google.com/search?q=hospitals+near+me&oq=hospi&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIGCAEQRRg5MgcIAhAAGIAEMg0IAxAAGJIDGIAEGIoFMg0IBBAAGJIDGIAEGIoFMgoIBRAAGLEDGIAEMgYIBhBFGDwyBggHEEUYPNIBCDIxNjRqMGo0qAIAsAIA&sourceid=chrome&ie=UTF-8&safe=strict" target="_blank" rel="noopener noreferrer" className="flex items-center w-full text-gray-700 dark:text-white">
                                <span className="material-symbols-outlined mr-2 text-[20px] fill-1">search</span>
                                <span className="font-medium">Search Hospitals</span>
                            </a>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild className="cursor-pointer">
                            <a href="tel:112" className="flex items-center w-full text-rapid-alert">
                                <span className="material-symbols-outlined mr-2 text-[20px] fill-1">call</span>
                                <span className="font-bold">Call 112</span>
                            </a>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}