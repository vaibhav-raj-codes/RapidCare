import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import MyHeader from "../ui/header";

const contentData = [
    {
        step_id: 1,
        title: "Immobilize and Support",
        instruction: "Immediately stop any movement of the injured limb to prevent further damage to nerves or blood vessels. Support the limb above and below the injury using your hands, pillows, or a sling. DO NOT attempt to straighten a deformed limb or push a protruding bone back in.",
        media_url: "https://res.cloudinary.com/dro83j0hy/image/upload/v1765471761/WhatsApp_GIF_2025-12-11_at_20.12.31_ets1u6.gif"
    },
    {
        step_id: 2,
        title: "Call 112 and Monitor Vital Signs",
        instruction: "Call emergency services immediately if the bone has pierced the skin (open fracture), if the limb looks pale/blue (loss of circulation), or if the person is in severe shock. Keep the person warm and still while waiting for help.",
        media_url: "https://res.cloudinary.com/dro83j0hy/image/upload/v1765471768/WhatsApp_GIF_2025-12-11_at_20.12.32_r7bzkl.gif"
    },
    {
        step_id: 3,
        title: "Care for Open Fractures & NPO",
        instruction: "If there is an open wound, cover it lightly with a sterile dressing to prevent infection, but apply pressure only around the bone, not on it. Do not give the person food or water (keep them NPO) in case they require surgery upon arrival at the hospital.",
        media_url: "https://www.stepaheadclinic.com/wp-content/uploads/2024/09/Fracture-Treatment.jpeg"
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
                <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 font-bold text-xl bg-blue-500/10 backdrop-blur-sm">
                    {step.step_id}
                </span>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{step.title}</h2>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                {step.instruction}
            </p>

            <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 dark:shadow-blue-900/20 border border-gray-200 dark:border-white/10"
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

export default function Fracture() {
    const [activeStep, setActiveStep] = useState(1);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="bg-gray-50 dark:bg-[#000000] min-h-screen text-gray-900 dark:text-white font-sans selection:bg-blue-500/30 transition-colors duration-300">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform-origin-0 z-50"
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
                        <span className="material-symbols-outlined text-blue-500 font-bold">radiology</span>
                        <h1 className="font-bold text-sm tracking-tight text-gray-900 dark:text-white">Fracture Response</h1>
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
                                <div className={`absolute -left-[29px] top-1 w-3 h-3 rounded-full transition-colors duration-300 ${activeStep === s.step_id ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "bg-gray-300 dark:bg-gray-700"}`} />
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
                            <span className="text-blue-500 font-bold">{activeStep} / {contentData.length}</span>
                        </div>
                        <div className="h-1 bg-gray-200 dark:bg-gray-800 mt-2 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-blue-500"
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
                    <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-center shadow-lg shadow-blue-900/30">
                        <span className="material-symbols-outlined text-white text-5xl mb-4 block">emergency</span>
                        <h2 className="text-2xl font-bold text-white mb-2">Broken Bone?</h2>
                        <p className="text-white/80 mb-6">If the bone is visible or the limb is cold/pale, call for help.</p>
                        <a href="tel:112" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
                            <span className="material-symbols-outlined">call</span>
                            Call 112 Now
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}
