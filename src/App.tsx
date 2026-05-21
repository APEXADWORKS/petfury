/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { PetProfile, VaccinationRecord, ActivityRecord, WeightRecord } from "./types";
import { PetProfileCard } from "./components/PetProfileCard";
import { TrackersPanel } from "./components/TrackersPanel";
import { BlogPanel } from "./components/BlogPanel";
import { AiCoachWidget } from "./components/AiCoachWidget";
import { CalorieCalculator } from "./components/CalorieCalculator";
import { PawPrint, Heart, BookOpen, Sparkles, HelpCircle } from "lucide-react";

export default function App() {
  // Initialize States with mock seed data or localStorage
  const [profile, setProfile] = useState<PetProfile>(() => {
    const saved = localStorage.getItem("pet_profile");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Sunny",
          type: "dog",
          breed: "Golden Retriever",
          ageYears: 1,
          ageMonths: 4,
          weight: 22.5,
          weightUnit: "kg",
        };
  });

  const [vaccinations, setVaccinations] = useState<VaccinationRecord[]>(() => {
    const saved = localStorage.getItem("pet_vaccinations");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "v1",
            name: "Rabies Core Vaccination",
            dueDate: "2026-07-15",
            status: "Pending",
            notes: "Required for municipal registration",
          },
          {
            id: "v2",
            name: "Canine Parvovirus Booster",
            dueDate: "2026-05-18",
            status: "Completed",
            notes: "No post-immunization symptoms noted.",
          },
          {
            id: "v3",
            name: "Bordetella / Kennel Cough",
            dueDate: "2026-04-10",
            status: "Completed",
            notes: "Recommended before groomer reservation",
          },
        ];
  });

  const [activities, setActivities] = useState<ActivityRecord[]>(() => {
    const saved = localStorage.getItem("pet_activities");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "a1",
            type: "Training",
            duration: 20,
            date: "2026-05-20",
            notes: "Practiced 3-second recall. Sunny responded with 90% accuracy.",
          },
          {
            id: "a2",
            type: "Walk",
            duration: 40,
            date: "2026-05-19",
            notes: "Evening walk around the lake. Good stamina.",
          },
        ];
  });

  const [weightHistory, setWeightHistory] = useState<WeightRecord[]>(() => {
    const saved = localStorage.getItem("pet_weights");
    return saved
      ? JSON.parse(saved)
      : [
          { id: "w1", weight: 22.5, date: "2026-05-21" },
          { id: "w2", weight: 21.8, date: "2026-04-15" },
          { id: "w3", weight: 20.1, date: "2026-03-10" },
        ];
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("pet_profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("pet_vaccinations", JSON.stringify(vaccinations));
  }, [vaccinations]);

  useEffect(() => {
    localStorage.setItem("pet_activities", JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem("pet_weights", JSON.stringify(weightHistory));
  }, [weightHistory]);

  // Handle Updates
  const handleUpdateProfile = (updated: PetProfile) => {
    setProfile(updated);
  };

  const handleAddVaccine = (v: Omit<VaccinationRecord, "id">) => {
    const newV: VaccinationRecord = {
      ...v,
      id: "v_" + Date.now(),
    };
    setVaccinations((prev) => [newV, ...prev]);
  };

  const handleRemoveVaccine = (id: string) => {
    setVaccinations((prev) => prev.filter((v) => v.id !== id));
  };

  const handleToggleVaccine = (id: string) => {
    setVaccinations((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              status: v.status === "Completed" ? "Pending" : "Completed",
            }
          : v
      )
    );
  };

  const handleAddActivity = (a: Omit<ActivityRecord, "id">) => {
    const newA: ActivityRecord = {
      ...a,
      id: "a_" + Date.now(),
    };
    setActivities((prev) => [newA, ...prev]);
  };

  const handleRemoveActivity = (id: string) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAddWeight = (w: Omit<WeightRecord, "id">) => {
    const newW: WeightRecord = {
      ...w,
      id: "w_" + Date.now(),
    };
    setWeightHistory((prev) => [newW, ...prev]);
    // Also update current profile weight
    setProfile((prev) => ({ ...prev, weight: w.weight }));
  };

  const handleRemoveWeight = (id: string) => {
    setWeightHistory((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Dynamic Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm" id="main-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <PawPrint className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-md sm:text-lg font-bold tracking-tight text-slate-800 font-sans leading-none flex items-center gap-1.5 matches-brand">
                PawsomeCare <span className="text-slate-400 font-normal">Hub</span>
              </h1>
              <p className="text-[9px] text-slate-400 font-mono tracking-wider uppercase mt-0.5">
                Healthy Companions • Expert Guidance
              </p>
            </div>
          </div>

          <nav className="hidden sm:flex items-center gap-6 text-xs uppercase font-bold tracking-wider font-mono text-slate-500">
            <a href="#trackers-panel" className="hover:text-blue-600 transition">Companion Tracker</a>
            <a href="#blog-section" className="hover:text-blue-600 transition">Health Articles</a>
            <a href="#ai-coach-widget" className="hover:text-blue-600 transition">AI Veterinarian Coach</a>
          </nav>

          <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-100 bg-slate-900 hover:bg-slate-800 transition-colors px-3 py-1.5 rounded-full cursor-pointer shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Active: {profile.name}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Welcome Section / Beautiful Banner Asset */}
        <section className="relative rounded-3xl overflow-hidden border border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-xl flex flex-col lg:flex-row items-center gap-8 p-8 md:p-10" id="hero-banner">
          {/* Dynamic BG elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
          
          <div className="flex-1 space-y-4 max-w-xl text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-blue-100">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" /> Vet-Validated Information &amp; Interactive Tools
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight font-sans">
              Scientific Pet Grooming, Health &amp; Deep Obedience
            </h2>
            <p className="text-sm text-blue-100 leading-relaxed">
              Track vaccinations, record positive reinforcement training drills, plan nutrition targets, and consult with our secure, server-side Gemini AI Pet Consultant—tailored exactly to your cat or dog.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-blue-200">
              <span className="flex items-center gap-1"><Heart className="w-4 h-4 text-rose-400 shrink-0" /> 100% Secure Logs</span>
              <span>•</span>
              <span className="flex items-center gap-1"><BookOpen className="w-4 h-4 text-blue-300 shrink-0" /> Professional Manuals</span>
            </div>
          </div>

          {/* BESPOKE GENERATED IMAGE CONTAINER */}
          <div className="w-full lg:w-[420px] aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-2xl bg-neutral-800 border border-neutral-700/50 overflow-hidden shadow-xl z-20 shrink-0">
            <img
              src="/src/assets/images/pet_care_hero_1779357532816.png"
              alt="Golden Retriever dog and tux cat sitting together in a vet clinic"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover select-none"
              onError={(e) => {
                // Return Picsum safe fallback if needed
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/petcare/800/600";
              }}
            />
          </div>
        </section>

        {/* Dashboard Panels Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Trackers, configuration & Profile (col-span-5) */}
          <section className="lg:col-span-5 space-y-8 flex flex-col">
            {/* Pet Profile Overview Card */}
            <PetProfileCard profile={profile} onUpdateProfile={handleUpdateProfile} />

            {/* General Log / Tracker Panel */}
            <TrackersPanel
              vaccinations={vaccinations}
              activities={activities}
              weightHistory={weightHistory}
              onAddVaccine={handleAddVaccine}
              onRemoveVaccine={handleRemoveVaccine}
              onToggleVaccine={handleToggleVaccine}
              onAddActivity={handleAddActivity}
              onRemoveActivity={handleRemoveActivity}
              onAddWeight={handleAddWeight}
              onRemoveWeight={handleRemoveWeight}
              weightUnit={profile.weightUnit}
            />

            {/* Calorie Calculator */}
            <CalorieCalculator />
          </section>

          {/* RIGHT COLUMN: AI Copilot & Expert Articles (col-span-7) */}
          <section className="lg:col-span-7 space-y-8 flex flex-col">
            {/* Gemini AI Specialist Assistant Component */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
                <h3 className="text-xs uppercase tracking-widest font-extrabold text-neutral-400 font-mono">
                  Live Companion Consulting
                </h3>
              </div>
              <AiCoachWidget />
            </div>

            {/* Curated Blog Manuals Explorer */}
            <BlogPanel />
          </section>

        </div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="mt-20 border-t border-slate-200 bg-white" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <PawPrint className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">PawsomeCare Hub</p>
              <p className="text-[10px] text-slate-400 font-mono">© 2026 Companion manual. All rights reserved.</p>
            </div>
          </div>

          <div className="max-w-md text-center sm:text-right">
            <p className="text-[10px] leading-relaxed text-neutral-400">
              Disclaimer: All recommendations, calculations, and AI responses generated are designed for pet wellness educational purposes. Seek custom medical diagnoses from certified veterinarians in case of immediate health crises.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
