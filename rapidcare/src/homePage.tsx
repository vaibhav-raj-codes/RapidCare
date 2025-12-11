import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EmergencyCard } from "./components/ui/components";
import MyHeader from "./components/ui/header";
import SearchBar from "./components/ui/searchBar";
import BottomNavigation from "./components/ui/bottomNavigation";
import { useSearch } from "./logic/searchLogic";
import { emergencies } from "./extras/emergencies";

export default function HomePage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredEmergencies = useSearch(emergencies, searchQuery, (item, query) => {
        return item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.subtitle.toLowerCase().includes(query.toLowerCase());
    });

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-24 bg-rapid-background-light dark:bg-rapid-background-dark text-gray-900 dark:text-white font-display antialiased selection:bg-white/20">

            <MyHeader />

            <main className="flex-1 flex flex-col px-4 pt-6">
                {/* Hero Text */}
                <div className="mb-6">
                    <h2 className="text-[32px] font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
                        What's the <br /> <span className="text-rapid-alert">emergency?</span>
                    </h2>
                </div>

                <SearchBar value={searchQuery} onChange={setSearchQuery} />

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-6">
                    {filteredEmergencies.map((emergency, index) => (
                        <EmergencyCard
                            key={index}
                            {...emergency}
                            onClick={() => {
                                if (emergency.title === "Drowning") {
                                    navigate("/home/drowning");
                                } else if (emergency.title === "Choking") {
                                    navigate("/home/choking");
                                } else if (emergency.title === "Seizures (Epilepsy)") {
                                    navigate("/home/seizure");
                                } else if (emergency.title === "Heart Attack") {
                                    navigate("/home/heart-attack");
                                } else if (emergency.title === "Burns") {
                                    navigate("/home/burn");
                                } else if (emergency.title === "Snake Bites") {
                                    navigate("/home/snake-bite");
                                } else if (emergency.title === "Allergic Reaction") {
                                    navigate("/home/allergy");
                                } else if (emergency.title === "Fracture") {
                                    navigate("/home/fracture");
                                } else if (emergency.title === "Stroke") {
                                    navigate("/home/stroke");
                                } else if (emergency.title.includes("Bleeding")) {
                                    navigate("/home/bleeding");
                                }
                            }}
                        />
                    ))}
                </div>
            </main>


            <BottomNavigation />
        </div>
    );
}