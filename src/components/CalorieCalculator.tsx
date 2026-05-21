import React, { useState } from "react";
import { Calculator, Flame, Info, Check } from "lucide-react";

export function CalorieCalculator() {
  const [petType, setPetType] = useState<"dog" | "cat">("dog");
  const [weight, setWeight] = useState(10);
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [status, setStatus] = useState<"neutered" | "intact" | "active" | "weightLoss">("neutered");

  // RER = 70 * (wt_in_kg)^0.75
  const calculateCalories = () => {
    const weightInKg = unit === "lbs" ? weight * 0.45359237 : weight;
    if (weightInKg <= 0) return { rer: 0, mer: 0 };

    const rer = Math.round(70 * Math.pow(weightInKg, 0.75));

    // Multipliers
    let multiplier = 1.6;
    if (petType === "dog") {
      switch (status) {
        case "neutered": multiplier = 1.6; break;
        case "intact": multiplier = 1.8; break;
        case "active": multiplier = 2.5; break;
        case "weightLoss": multiplier = 1.0; break;
      }
    } else {
      switch (status) {
        case "neutered": multiplier = 1.2; break;
        case "intact": multiplier = 1.4; break;
        case "active": multiplier = 1.6; break;
        case "weightLoss": multiplier = 0.8; break;
      }
    }

    const mer = Math.round(rer * multiplier);
    return { rer, mer };
  };

  const { rer, mer } = calculateCalories();

  return (
    <div className="bg-white rounded-3xl border border-neutral-100 p-6 md:p-8 shadow-sm space-y-6" id="calorie-calculator">
      <div>
        <h3 className="font-bold text-neutral-800 tracking-tight text-sm uppercase font-mono flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" /> Nutrition &amp; Calorie Estimator
        </h3>
        <p className="text-xxs text-neutral-500">
          Determine clinical feed servings (Dry Kibble vs Moist food) based on Metabolic Resting Rates.
        </p>
      </div>

      <div className="space-y-4">
        {/* Row 1: Pet type & lifestyle status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xxs uppercase tracking-wider font-semibold text-neutral-400 font-mono">Pet Classification</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPetType("dog")}
                className={`py-2 rounded-xl border text-center transition font-semibold flex items-center justify-center gap-1.5 ${
                  petType === "dog"
                    ? "bg-blue-50 border-blue-300 text-blue-800"
                    : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                🐶 Dog
              </button>
              <button
                type="button"
                onClick={() => setPetType("cat")}
                className={`py-2 rounded-xl border text-center transition font-semibold flex items-center justify-center gap-1.5 ${
                  petType === "cat"
                    ? "bg-blue-50 border-blue-300 text-blue-800"
                    : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                🐱 Cat
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xxs uppercase tracking-wider font-semibold text-neutral-400 font-mono">Lifestyle / State</label>
            <select
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 font-sans text-neutral-700"
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
            >
              <option value="neutered">Neutered / Spayed Adult</option>
              <option value="intact">Intact / Active Adult</option>
              <option value="active">High Performance / Working</option>
              <option value="weightLoss">Weight Control / Low Mobility</option>
            </select>
          </div>
        </div>

        {/* Row 2: Weight and unit */}
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2 space-y-1">
            <label className="text-xxs uppercase tracking-wider font-semibold text-neutral-400 font-mono">Current Weight</label>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(Math.max(0.1, Number(e.target.value)))}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xxs uppercase tracking-wider font-semibold text-neutral-400 font-mono">Metric</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as any)}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 font-sans"
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
        </div>

        {/* Dynamic calculation result */}
        <div className="mt-6 bg-blue-50/40 border border-blue-100 rounded-2xl p-4 md:p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-blue-600">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-bold font-mono">
                Daily Maintenance Energy (MER)
              </p>
              <p className="text-2xl font-bold font-mono text-neutral-800 leading-tight">
                {mer} <span className="text-sm font-semibold font-sans text-neutral-500">kcal / day</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-blue-100 text-neutral-600 leading-relaxed font-sans">
            <div>
              <span className="block text-[10px] uppercase font-bold text-neutral-400 font-mono">Resting metabolic (RER)</span>
              <span className="font-bold text-neutral-700 font-mono">{rer} kcal</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-neutral-400 font-mono">Approximate Servings</span>
              <span className="font-bold text-neutral-700 font-sans">
                ~{Math.round(mer / 350 * 10) / 10} cups of standard kibble
              </span>
            </div>
          </div>

          <p className="text-[10px] text-neutral-400 leading-relaxed flex items-start gap-1.5 pt-2 border-t border-blue-100/50">
            <Info className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
            Note: Calculated using standard WSAVA feeding equations. Exact dietary requirements will fluctuate based on room ambient temperatures, thyroid health status, and physical metabolism.
          </p>
        </div>
      </div>
    </div>
  );
}
