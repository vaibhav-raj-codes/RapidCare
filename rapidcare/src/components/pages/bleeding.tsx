import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import MyHeader from "../ui/header";

const contentData = [
    {
        step_id: 1,
        title: "Apply Direct Pressure & Elevate",
        instruction: "Immediately apply firm, direct pressure to the wound using a clean cloth or sterile pad (use gloves if possible). If the injury is on a limb, raise it above the level of the heart to let gravity help slow the blood flow. Maintain pressure continuously.",
        media_url: "https://res.cloudinary.com/dro83j0hy/image/upload/v1765474391/WhatsApp_GIF_2025-12-11_at_22.42.33_qkfzrf.gif"
    },
    {
        step_id: 2,
        title: "Secure Dressing & Add Layers",
        instruction: "Firmly wrap a bandage to secure the pad in place. It should be tight enough to maintain pressure but not so tight that it cuts off circulation (check if fingers/toes turn blue). If blood soaks through the first bandage, DO NOT remove it; simply add a second layer on top.",
        media_url: "https://res.cloudinary.com/dro83j0hy/image/upload/v1765474400/WhatsApp_GIF_2025-12-11_at_22.42.35_sbmlnn.gif"
    },
    {
        step_id: 3,
        title: "Handle Embedded Objects",
        instruction: "If an object (like glass, a knife, or debris) is stuck deep in the wound, DO NOT pull it out. Removing it may unblock a severed artery and cause massive bleeding. Instead, apply pressure around the object and bandage carefully to stabilize it in place.",
        media_url: "https://res.cloudinary.com/dro83j0hy/image/upload/v1765477095/WhatsApp_GIF_2025-12-11_at_22.42.45-2_xxcg3u.gif"
    },
    {
        step_id: 4,
        title: "Treat for Shock and Call 112",
        instruction: "While waiting for help, keep the person lying down and warm (cover with a coat/blanket) to prevent shock. Monitor their breathing. Call 112 immediately if the bleeding is arterial (spurting), won't stop after 10 minutes, or the person becomes pale and faint.",
        media_url: "https://res.cloudinary.com/dro83j0hy/image/upload/v1765474410/WhatsApp_GIF_2025-12-11_at_22.42.45_1_pdnohm.gif"
    }
];

const StepSection = ({ step, setActiveStep }: { step: typeof contentData[0], setActiveStep: (id: number) => void }) => {
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
                <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-red-600 text-red-600 font-bold text-xl bg-red-600/10 backdrop-blur-sm">
                    {step.step_id}
                </span>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{step.title}</h2>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                {step.instruction}
            </p>

            <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl shadow-red-900/10 dark:shadow-red-900/20 border border-gray-200 dark:border-white/10"
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

export default function Bleeding() {
    const [activeStep, setActiveStep] = useState(1);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="bg-gray-50 dark:bg-[#000000] min-h-screen text-gray-900 dark:text-white font-sans selection:bg-red-600/30 transition-colors duration-300">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700 to-red-500 transform-origin-0 z-50"
                style={{ scaleX }}
            />

            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-40">
                <MyHeader />
                <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-black/50 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
                    <Link to="/home" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                        <ChevronLeft size={20} />
                        <span className="font-medium text-sm">Back</span>
                    </Link>
                    <div className="flex items-center gap-2 ml-2">
                        <span className="material-symbols-outlined text-red-600 font-bold">bloodtype</span>
                        <h1 className="font-bold text-sm tracking-tight text-gray-900 dark:text-white">Bleeding Response</h1>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 pt-32 pb-12 flex gap-12 relative">
                {/* Sticky Timeline / Breadcrumbs (Desktop) */}
                <aside className="hidden lg:block w-72 sticky top-40 h-fit">
                    <div className="relative pl-6 border-l-2 border-gray-200 dark:border-white/10">
                        {contentData.map((s) => (
                            <a
                                key={s.step_id}
                                href={`#step-${s.step_id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(`step-${s.step_id}`)?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className={`block mb-8 relative transition-all duration-300 ${activeStep === s.step_id ? "translate-x-2" : ""}`}
                            >
                                <div className={`absolute -left-[29px] top-1 w-3 h-3 rounded-full transition-colors duration-300 ${activeStep === s.step_id ? "bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]" : "bg-gray-300 dark:bg-gray-700"}`} />
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
                            <span className="text-red-600 font-bold">{activeStep} / {contentData.length}</span>
                        </div>
                        <div className="h-1 bg-gray-200 dark:bg-gray-800 mt-2 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-red-600"
                                initial={{ width: 0 }}
                                animate={{ width: `${(activeStep / contentData.length) * 100}%` }}
                            />
                        </div>
                        <p className="mt-2 text-gray-900 dark:text-white font-semibold text-center">{contentData[activeStep - 1].title}</p>
                    </div>

                    {contentData.map((step) => (
                        <StepSection
                            key={step.step_id}
                            step={step}
                            setActiveStep={setActiveStep}
                        />
                    ))}

                    {/* Emergency Call Action */}
                    <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 text-center shadow-lg shadow-red-900/30">
                        <span className="material-symbols-outlined text-white text-5xl mb-4 block">emergency</span>
                        <h2 className="text-2xl font-bold text-white mb-2">Severe Bleeding?</h2>
                        <p className="text-white/80 mb-6">If bleeding won't stop or is arterial (spurting), call for help immediately.</p>
                        <a href="tel:112" className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
                            <span className="material-symbols-outlined">call</span>
                            Call 112 Now
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}