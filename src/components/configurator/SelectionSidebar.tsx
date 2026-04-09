import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Layers, 
  Palette, 
  Settings2, 
  ShoppingCart,
  Shirt,
  Briefcase,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { luxuryFabrics } from "./fabrics";
import { useCustomization, Category } from "./Configurator";

const STEPS = ["Category", "Fabric", "Style", "Details"];

const SelectionSidebar = () => {
  const { state, setCategory, setFabric, setStyle } = useCustomization();
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const renderStepContent = () => {
    switch (STEPS[currentStep]) {
      case "Category":
        return (
          <div className="space-y-4">
            {(["Suit", "Shirt", "Wedding"] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`w-full p-6 rounded-2xl flex items-center justify-between transition-all duration-500 border group ${
                  state.category === cat 
                    ? "bg-white text-black border-white shadow-2xl scale-[1.02]" 
                    : "bg-white/5 text-white/40 border-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${state.category === cat ? "bg-black/5" : "bg-white/5"}`}>
                    {cat === "Suit" && <Briefcase className="w-5 h-5" />}
                    {cat === "Shirt" && <Shirt className="w-5 h-5" />}
                    {cat === "Wedding" && <Star className="w-5 h-5" />}
                  </div>
                  <div className="text-left">
                    <p className="font-bold tracking-tight text-lg">{cat}</p>
                    <p className="text-[10px] uppercase tracking-widest opacity-40">Configure {cat}</p>
                  </div>
                </div>
                {state.category === cat && <Check className="w-5 h-5" />}
              </button>
            ))}
          </div>
        );

      case "Fabric":
        return (
          <div className="grid grid-cols-2 gap-4">
            {luxuryFabrics.map((f) => (
              <button
                key={f.id}
                onClick={() => setFabric(f)}
                className={`flex flex-col gap-3 p-4 rounded-2xl border transition-all duration-500 group ${
                  state.fabric.id === f.id 
                    ? "bg-white text-black border-white shadow-xl scale-[1.05]" 
                    : "bg-white/5 text-white/40 border-white/5 hover:border-white/10"
                }`}
              >
                <div className="w-full aspect-square rounded-xl overflow-hidden relative">
                  <img src={f.textureUrl} alt={f.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold truncate leading-none mb-1">{f.name}</p>
                  <p className="text-[8px] uppercase tracking-widest opacity-40">{f.type}</p>
                </div>
              </button>
            ))}
          </div>
        );

      case "Style":
        const options = state.category === "Shirt" 
          ? [
              { label: "Collar", key: "collar", values: ["Spread", "Classic", "Button-Down", "Mao"] },
              { label: "Cuffs", key: "cuffs", values: ["Single", "Double/French", "Rounded"] },
              { label: "Fit", key: "fit", values: ["Slim", "Regular", "Relaxed"] }
            ]
          : [
              { label: "Lapel", key: "lapel", values: ["Notch", "Peak", "Shawl"] },
              { label: "Buttons", key: "buttons", values: [1, 2, 3] },
              { label: "Fit", key: "fit", values: ["Slim", "Regular", "Athletic"] }
            ];

        return (
          <div className="space-y-8">
            {options.map((opt) => (
              <div key={opt.key}>
                <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-4 font-bold">
                  {opt.label}
                </label>
                <div className="flex flex-wrap gap-2">
                  {opt.values.map((v) => (
                    <button
                      key={v.toString()}
                      onClick={() => setStyle({ [opt.key]: v })}
                      className={`px-4 py-3 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${
                        (state.style as any)[opt.key] === v
                          ? "bg-white text-black border-white shadow-lg"
                          : "bg-white/5 text-white/40 border-white/5 hover:border-white/10"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case "Details":
        return (
          <div className="space-y-6">
             <div className="p-8 rounded-3xl bg-white/5 border border-white/5 text-center">
                <Check className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-white text-xl font-display mb-2">Ready for Fitting?</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">
                  Your custom {state.fabric.name} {state.category} has been designed with precision.
                </p>
                <Button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-14 rounded-2xl">
                   <ShoppingCart className="w-4 h-4 mr-2" /> Complete Design
                </Button>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-screen bg-[#050505] border-l border-white/5 flex flex-col p-8 md:p-12 overflow-y-auto custom-scrollbar">
      {/* HEADER */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5">
                <Settings2 className="w-6 h-6 text-yellow-500" />
             </div>
             <div>
                <h1 className="text-2xl font-display font-bold text-white tracking-tight">Personalize</h1>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">Studio Experience</p>
             </div>
          </div>
        </div>

        {/* STEP PROGRESS */}
        <div className="flex items-center justify-between gap-2">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <button 
                onClick={() => setCurrentStep(i)}
                className={`text-[9px] uppercase tracking-widest font-bold transition-all ${
                  i === currentStep ? "text-yellow-500" : i < currentStep ? "text-white/60" : "text-white/20"
                }`}
              >
                {s}
              </button>
              {i < STEPS.length - 1 && <div className="h-px flex-1 bg-white/5" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex-1"
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>

      {/* NAVIGATION */}
      <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="h-14 px-8 rounded-2xl border border-white/5 text-white/40 hover:text-white disabled:opacity-20"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button
          onClick={nextStep}
          disabled={currentStep === STEPS.length - 1}
          className="h-14 flex-1 rounded-2xl bg-white text-black font-bold hover:bg-neutral-200"
        >
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default SelectionSidebar;
