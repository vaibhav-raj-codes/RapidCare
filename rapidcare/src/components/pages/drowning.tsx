import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";


const contentData = [
    {
        step_id: 1,
        title: "Check Vital Signs",
        instruction: "Check if the person is breathing properly. Look for chest movement, listen for breath sounds, and feel for air on your cheek for no more than 10 seconds.",
        media_url: "https://res.cloudinary.com/dro83j0hy/image/upload/v1765459704/WhatsApp_GIF_2025-12-11_at_17.30.41_l9zb1u.gif"
    },
    {
        step_id: 2,
        title: "Rescue Breaths",
        instruction: "If not breathing, tilt the head back to open the airway, pinch the nose, and deliver 5 strong initial rescue breaths to oxygenate the blood.",
        media_url: "https://res.cloudinary.com/dro83j0hy/image/upload/v1765459712/WhatsApp_GIF_2025-12-11_at_17.30.47_gtgyae.gif"
    },
    {
        step_id: 3,
        title: "Chest Compressions",
        instruction: "Perform CPR. Place hands in the center of the chest and compress deeply (approx. 5-6cm) at a fast rhythm (100-120 beats per minute).",
        media_url: "https://res.cloudinary.com/dro83j0hy/image/upload/v1765459715/WhatsApp_GIF_2025-12-11_at_17.31.02_ujhzxf.gif"
    },
    {
        step_id: 4,
        title: "Recovery Position",
        instruction: "If the person starts breathing or vomits water, immediately turn them sideways into the recovery position to clear the airway and prevent choking.",
        media_url: "https://res.cloudinary.com/dro83j0hy/image/upload/v1765460120/WhatsApp_GIF_2025-12-11_at_17.31.02_1_ybvl9l.gif"
    },
    {
        step_id: 5,
        title: "Warmth & Emergency",
        instruction: "Remove wet clothes if possible and use a blanket or body heat to prevent hypothermia. Call emergency services (112) immediately and wait for help.",
        media_url: "https://res.cloudinary.com/dro83j0hy/image/upload/v1765459733/WhatsApp_GIF_2025-12-11_at_17.31.03_f1kktm.gif"
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
                <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-red-500 text-red-500 font-bold text-xl bg-red-500/10 backdrop-blur-sm">
                    {step.step_id}
                </span>
                <h2 className="text-3xl font-bold text-white">{step.title}</h2>
            </div>

            <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                {step.instruction}
            </p>

            <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl shadow-red-900/20 border border-white/10"
                animate={{ scale: isInView ? 1.05 : 1, opacity: isInView ? 1 : 0.8 }}
                transition={{ duration: 0.5 }}
            >
                <img
                    src={step.media_url}
                    alt={step.title}
                    className="w-full h-auto object-cover max-h-[400px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </motion.div>
        </motion.div>
    );
};

export default function Drowning() {
    const [activeStep, setActiveStep] = useState(1);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="bg-[#000000] min-h-screen text-white font-sans selection:bg-red-500/30">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-400 transform-origin-0 z-50"
                style={{ scaleX }}
            />

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/home" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <ChevronLeft size={20} />
                        <span className="font-medium">Back to Home</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-red-500 font-bold">monitor_heart</span>
                        <h1 className="font-bold text-xl tracking-tight">Drowning Response</h1>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 pt-24 pb-12 flex gap-12 relative">
                {/* Sticky Timeline / Breadcrumbs (Desktop) */}
                <aside className="hidden lg:block w-72 sticky top-32 h-fit">
                    <div className="relative pl-6 border-l-2 border-white/10">
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
                                <div className={`absolute -left-[29px] top-1 w-3 h-3 rounded-full transition-colors duration-300 ${activeStep === s.step_id ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "bg-gray-700"}`} />
                                <h3 className={`font-semibold mb-1 transition-colors duration-300 ${activeStep === s.step_id ? "text-white" : "text-gray-500"}`}>
                                    {s.title}
                                </h3>
                                <p className="text-xs text-gray-600 line-clamp-2">{s.instruction.substring(0, 50)}...</p>
                            </a>
                        ))}
                    </div>
                </aside>

                {/* Content Steps */}
                <div className="flex-1 max-w-3xl">
                    <div className="lg:hidden mb-8 sticky top-20 z-30 bg-black/90 p-4 rounded-xl border border-white/10 backdrop-blur-md">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Current Step</span>
                            <span className="text-red-500 font-bold">{activeStep} / {contentData.length}</span>
                        </div>
                        <div className="h-1 bg-gray-800 mt-2 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-red-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${(activeStep / contentData.length) * 100}%` }}
                            />
                        </div>
                        <p className="mt-2 text-white font-semibold text-center">{contentData[activeStep - 1].title}</p>
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
                        <h2 className="text-2xl font-bold text-white mb-2">Emergency Services Notified?</h2>
                        <p className="text-white/80 mb-6">Always ensure professional help is on the way while providing first aid.</p>
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