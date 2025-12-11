import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, User, Baby } from "lucide-react";
import MyHeader from "../ui/header";
import { Link } from "react-router-dom";

const adultContentData = [
    {
        step_id: 1,
        title: "Position & Grip",
        instruction: "Stand behind the person. Place one foot slightly ahead of the other for balance. Wrap your arms around their waist. Make a tight fist with one hand.",
        media_url: "https://res.cloudinary.com/dro83j0hy/image/upload/v1765465764/WhatsApp_GIF_2025-12-11_at_20.21.22_wlo5ri.gif"
    },
    {
        step_id: 2,
        title: "Abdominal Thrusts",
        instruction: "Grasp your fist with your other hand. Place it just above the navel but well below the ribs. Press hard into the abdomen with a quick, upward thrust.",
        media_url: "https://res.cloudinary.com/dro83j0hy/image/upload/v1765465760/WhatsApp_GIF_2025-12-11_at_20.21.21_qstgxr.gif"
    },
    {
        step_id: 3,
        title: "Repeat Cycle",
        instruction: "Perform 5 distinct abdominal thrusts. If the blockage is not dislodged, check the mouth quickly, then repeat the cycle of thrusts until the object is expelled or the person becomes unconscious.",
        media_url: "https://res.cloudinary.com/dro83j0hy/image/upload/v1765465760/WhatsApp_GIF_2025-12-11_at_20.21.21_qstgxr.gif"
    }
];

const infantContentData = [
    {
        step_id: 1,
        title: "5 Back Blows",
        instruction: "Sit down and lay the infant face down along your forearm, resting on your thigh. Support their head and jaw with your hand (keep the head lower than the bottom to let gravity help). Give 5 firm back blows between the shoulder blades with the heel of your hand.",
        media_url: "https://res.cloudinary.com/dro83j0hy/image/upload/v1765475175/WhatsApp_GIF_2025-12-11_at_21.37.42_k4pofh.gif"
    },
    {
        step_id: 2,
        title: "5 Chest Thrusts",
        instruction: "Turn the infant over to lie face up along your arm, supporting the back of their head. Place two fingers in the center of the chest (just below the nipple line). Push down sharply 5 times (about 1.5 inches deep). Do NOT use abdominal thrusts (Heimlich) on infants.",
        media_url: "https://res.cloudinary.com/dro83j0hy/image/upload/v1765475187/WhatsApp_GIF_2025-12-11_at_21.37.45_utomu2.gif"
    },
    {
        step_id: 3,
        title: "Call 112 and Repeat Cycle",
        instruction: "If the object does not come out after the first cycle (5 blows + 5 thrusts), call 112 immediately. Continue repeating the cycle of 5 back blows and 5 chest thrusts until help arrives or the infant starts crying/breathing. If they become unconscious, start CPR.",
        media_url: "https://res.cloudinary.com/dro83j0hy/image/upload/v1765475195/WhatsApp_GIF_2025-12-11_at_21.37.46_ajdquu.gif"
    }
];

const StepSection = ({ step, setActiveStep }: { step: typeof adultContentData[0], setActiveStep: (id: number) => void }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

    useEffect(() => {
        if (isInView) {
            setActiveStep(step.step_id);
        }
    }, [isInView, setActiveStep, step.step_id]);

    return (
        <motion.div
            ref={ref}
            id={`step-${step.step_id}`}
            className="flex flex-col gap-6 py-20 min-h-[80vh] justify-center scroll-mt-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
        >
            <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-amber-500 text-amber-500 font-bold text-xl bg-amber-500/10 backdrop-blur-sm">
                    {step.step_id}
                </span>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{step.title}</h2>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                {step.instruction}
            </p>

            <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl shadow-amber-900/10 dark:shadow-amber-900/20 border border-gray-200 dark:border-white/10"
                animate={{ scale: isInView ? 1.05 : 1, opacity: isInView ? 1 : 0.8 }}
                transition={{ duration: 0.5 }}
            >
                <img
                    src={step.media_url}
                    alt={step.title}
                    className="w-full h-auto object-cover max-h-[400px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 dark:from-black/50 to-transparent pointer-events-none" />
            </motion.div>
        </motion.div>
    );
};

export default function Choking() {
    const [view, setView] = useState<"selection" | "guide">("selection");
    const [victimType, setVictimType] = useState<"adult" | "infant">("adult");
    const [activeStep, setActiveStep] = useState(1);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const activeContent = victimType === "adult" ? adultContentData : infantContentData;

    return (
        <div className="bg-gray-50 dark:bg-[#000000] min-h-screen text-gray-900 dark:text-white font-sans selection:bg-amber-500/30 transition-colors duration-300">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-40">
                <MyHeader />
                <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-black/50 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
                    <Link to="/home" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                        <ChevronLeft size={20} />
                        <span className="font-medium text-sm">Back</span>
                    </Link>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 pt-32 pb-12 min-h-screen">
                <AnimatePresence mode="wait">
                    {view === "selection" ? (
                        <motion.div
                            key="selection"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="flex flex-col items-center justify-center min-h-[60vh] gap-8"
                        >
                            <h2 className="text-3xl font-bold text-center">Who needs help?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                                <button
                                    onClick={() => { setVictimType("adult"); setView("guide"); setActiveStep(1); }}
                                    className="group relative w-full rounded-2xl bg-white dark:bg-zinc-900 p-8 shadow-xl shadow-amber-500/10 border border-gray-200 dark:border-white/10 hover:border-amber-500/50 transition-all duration-300 hover:scale-105"
                                >
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-24 h-24 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-500 mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                                            <User size={48} />
                                        </div>
                                        <h3 className="text-2xl font-bold">Adult</h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
                                            Conscious adult or child over 1 year
                                        </p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => { setVictimType("infant"); setView("guide"); setActiveStep(1); }}
                                    className="group relative w-full rounded-2xl bg-white dark:bg-zinc-900 p-8 shadow-xl shadow-amber-500/10 border border-gray-200 dark:border-white/10 hover:border-amber-500/50 transition-all duration-300 hover:scale-105"
                                >
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-24 h-24 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-500 mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                                            <Baby size={48} />
                                        </div>
                                        <h3 className="text-2xl font-bold">Infant</h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
                                            Baby under 1 year old
                                        </p>
                                    </div>
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="guide"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex gap-12 relative"
                        >
                            {/* Progress Bar (Only explicitly visible in guide view) */}
                            <motion.div
                                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 to-amber-400 transform-origin-0 z-50"
                                style={{ scaleX }}
                            />

                            {/* Sticky Timeline / Breadcrumbs (Desktop) */}
                            <aside className="hidden lg:block w-72 sticky top-40 h-fit">
                                <button
                                    onClick={() => setView("selection")}
                                    className="flex items-center gap-2 text-amber-500 font-bold mb-6 hover:text-amber-400 transition-colors"
                                >
                                    <ChevronLeft size={16} />
                                    Change Victim
                                </button>
                                <div className="relative pl-6 border-l-2 border-gray-200 dark:border-white/10">
                                    {activeContent.map((s) => (
                                        <a
                                            key={s.step_id}
                                            href={`#step-${s.step_id}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById(`step-${s.step_id}`)?.scrollIntoView({ behavior: "smooth" });
                                            }}
                                            className={`block mb-8 relative transition-all duration-300 ${activeStep === s.step_id ? "translate-x-2" : ""}`}
                                        >
                                            <div className={`absolute -left-[29px] top-1 w-3 h-3 rounded-full transition-colors duration-300 ${activeStep === s.step_id ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "bg-gray-300 dark:bg-gray-700"}`} />
                                            <h3 className={`font-semibold mb-1 transition-colors duration-300 ${activeStep === s.step_id ? "text-gray-900 dark:text-white" : "text-gray-500"}`}>
                                                {s.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-600 line-clamp-2">{s.instruction.substring(0, 50)}...</p>
                                        </a>
                                    ))}
                                </div>
                            </aside>

                            {/* Content Steps */}
                            <div className="flex-1 max-w-3xl">
                                <div className="lg:hidden mb-8 sticky top-20 z-30 bg-white/90 dark:bg-black/90 p-4 rounded-xl border border-gray-200 dark:border-white/10 backdrop-blur-md shadow-sm">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Current Step</span>
                                        <span className="text-amber-500 font-bold">{activeStep} / {activeContent.length}</span>
                                    </div>
                                    <div className="h-1 bg-gray-200 dark:bg-gray-800 mt-2 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-amber-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(activeStep / activeContent.length) * 100}%` }}
                                        />
                                    </div>
                                    <p className="mt-2 text-gray-900 dark:text-white font-semibold text-center">{activeContent[activeStep - 1].title}</p>
                                </div>

                                {activeContent.map((step) => (
                                    <StepSection
                                        key={step.step_id}
                                        step={step}
                                        setActiveStep={setActiveStep}
                                    />
                                ))}

                                {/* Emergency Call Action */}
                                <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 text-center shadow-lg shadow-amber-900/30">
                                    <span className="material-symbols-outlined text-white text-5xl mb-4 block">emergency</span>
                                    <h2 className="text-2xl font-bold text-white mb-2">Still Choking?</h2>
                                    <p className="text-white/80 mb-6">If the object is not dislodged, emergency help is critical.</p>
                                    <a href="tel:112" className="inline-flex items-center gap-2 bg-white text-amber-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
                                        <span className="material-symbols-outlined">call</span>
                                        Call 112 Now
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}