import React, { useState } from "react";
import { User, Award, Flame, Heart, Edit3, Check, PawPrint, Weight } from "lucide-react";
import { PetProfile } from "../types";

interface PetProfileCardProps {
  profile: PetProfile;
  onUpdateProfile: (updated: PetProfile) => void;
}

export function PetProfileCard({ profile, onUpdateProfile }: PetProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(profile.name);
  const [editedType, setEditedType] = useState<"dog" | "cat" | "other">(profile.type);
  const [editedBreed, setEditedBreed] = useState(profile.breed);
  const [editedYears, setEditedYears] = useState(profile.ageYears);
  const [editedMonths, setEditedMonths] = useState(profile.ageMonths);
  const [editedWeight, setEditedWeight] = useState(profile.weight);
  const [editedWeightUnit, setEditedWeightUnit] = useState<"kg" | "lbs">(profile.weightUnit);

  const handleSave = () => {
    onUpdateProfile({
      name: editedName || "Sunny",
      type: editedType,
      breed: editedBreed || "Mixed Breed",
      ageYears: Math.max(0, Number(editedYears)),
      ageMonths: Math.max(0, Math.min(11, Number(editedMonths))),
      weight: Math.max(0.1, Number(editedWeight)),
      weightUnit: editedWeightUnit,
    });
    setIsEditing(false);
  };

  const calculateQuickStats = () => {
    // Return fun recommendations based on species and weight
    if (profile.type === "dog") {
      const dailyCalorieMin = Math.round(70 * Math.pow(profile.weight, 0.75) * 1.6);
      return {
        sleep: "12-14 hours",
        exercise: "45-90 min / day",
        calories: `${dailyCalorieMin} kcal/day`,
        idealActivity: profile.weight > 20 ? "Long outdoor hikes" : "Agility & chase plays",
      };
    } else {
      const dailyCalorieMin = Math.round(70 * Math.pow(profile.weight, 0.75) * 1.2);
      return {
        sleep: "15-16 hours",
        exercise: "20-30 min / day",
        calories: `${dailyCalorieMin} kcal/day`,
        idealActivity: "Laser tags & vertical climbing",
      };
    }
  };

  const stats = calculateQuickStats();

  return (
    <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden" id="pet-profile-card">
      {/* Decorative top accent */}
      <div className="h-2.5 bg-gradient-to-r from-blue-600 via-indigo-650 to-emerald-500" />

      {isEditing ? (
        <div className="p-6 md:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h3 className="font-semibold text-neutral-800 flex items-center gap-2 font-sans">
              <PawPrint className="w-5 h-5 text-blue-600 animate-pulse" />
              Edit Pet Companion Profile
            </h3>
            <button
              onClick={() => setIsEditing(false)}
              className="text-xs text-neutral-400 hover:text-neutral-600 underline font-mono"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pet Name */}
            <div className="space-y-1">
              <label className="text-xxs uppercase tracking-wider font-semibold text-neutral-400 font-mono">Companion Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-sans"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder="e.g. Sunny"
              />
            </div>

            {/* Pet Species */}
            <div className="space-y-1">
              <label className="text-xxs uppercase tracking-wider font-semibold text-neutral-400 font-mono">Species</label>
              <select
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-sans"
                value={editedType}
                onChange={(e) => setEditedType(e.target.value as any)}
              >
                <option value="dog">🐶 Canine Dog</option>
                <option value="cat">🐱 Feline Cat</option>
                <option value="other">🐾 Exotic / Other</option>
              </select>
            </div>

            {/* Pet Breed */}
            <div className="space-y-1">
              <label className="text-xxs uppercase tracking-wider font-semibold text-neutral-400 font-mono">Breed Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-sans"
                value={editedBreed}
                onChange={(e) => setEditedBreed(e.target.value)}
                placeholder="e.g. Golden Retriever"
              />
            </div>

            {/* Pet Weight */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-xxs uppercase tracking-wider font-semibold text-neutral-400 font-mono">Current Weight</label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-sans"
                  value={editedWeight}
                  onChange={(e) => setEditedWeight(Number(e.target.value))}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xxs uppercase tracking-wider font-semibold text-neutral-400 font-mono">Unit</label>
                <select
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-sans"
                  value={editedWeightUnit}
                  onChange={(e) => setEditedWeightUnit(e.target.value as any)}
                >
                  <option value="kg">kg (Metric)</option>
                  <option value="lbs">lbs (Imperial)</option>
                </select>
              </div>
            </div>

            {/* Pet Age */}
            <div className="grid grid-cols-2 gap-2 sm:col-span-2">
              <div className="space-y-1">
                <label className="text-xxs uppercase tracking-wider font-semibold text-neutral-400 font-mono">Age (Years)</label>
                <input
                  type="number"
                  min="0"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-sans"
                  value={editedYears}
                  onChange={(e) => setEditedYears(Number(e.target.value))}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xxs uppercase tracking-wider font-semibold text-neutral-400 font-mono">Age (Months)</label>
                <input
                  type="number"
                  min="0"
                  max="11"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-sans"
                  value={editedMonths}
                  onChange={(e) => setEditedMonths(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <button
            id="pet-profile-btn-save"
            onClick={handleSave}
            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 tracking-wide shadow-sm transition"
          >
            <Check className="w-4 h-4" /> Save Profile Details
          </button>
        </div>
      ) : (
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-3xl shadow-sm">
                {profile.type === "dog" ? "🐶" : profile.type === "cat" ? "🐱" : "🐾"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold tracking-tight text-neutral-900 font-sans">
                    {profile.name}
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider font-mono px-2 py-0.5 roundedbg-neutral-100 text-neutral-500 bg-neutral-100">
                    {profile.type}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 font-medium">
                  {profile.breed} • {profile.ageYears > 0 ? `${profile.ageYears} yrs ` : ""}{profile.ageMonths} mos old
                </p>
              </div>
            </div>

            <button
              id="pet-profile-btn-edit"
              onClick={() => setIsEditing(true)}
              className="p-2 text-neutral-400 hover:text-blue-600 bg-neutral-50 hover:bg-blue-50/50 rounded-xl border border-neutral-200 hover:border-blue-100 transition"
              title="Edit Profile"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Body Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100">
              <span className="block text-[9px] uppercase tracking-wider font-bold text-neutral-400 font-mono mb-1 flex items-center gap-1">
                <Weight className="w-3.5 h-3.5 text-neutral-400" /> Current Mass
              </span>
              <p className="text-md font-bold text-neutral-800 font-mono">
                {profile.weight} {profile.weightUnit}
              </p>
            </div>

            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100">
              <span className="block text-[9px] uppercase tracking-wider font-bold text-neutral-400 font-mono mb-1 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-orange-500" /> Calorie target
              </span>
              <p className="text-md font-bold text-neutral-800 font-mono">
                {stats.calories}
              </p>
            </div>
          </div>

          {/* Professional Guidance Recommendation Summary Box */}
          <div className="bg-blue-50/30 border border-blue-100/50 rounded-2xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-600 font-bold" /> Personalized Milestones
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <div>
                <span className="text-xxs text-neutral-400 block uppercase tracking-wide font-mono">Ideal Rest</span>
                <span className="font-semibold text-neutral-700">{stats.sleep}</span>
              </div>
              <div>
                <span className="text-xxs text-neutral-400 block uppercase tracking-wide font-mono">Active Target</span>
                <span className="font-semibold text-neutral-700">{stats.exercise}</span>
              </div>
              <div className="col-span-2 pt-1">
                <span className="text-xxs text-neutral-400 block uppercase tracking-wide font-mono">Suggested Active Stimulation</span>
                <span className="font-semibold text-neutral-700 text-xxs">{stats.idealActivity}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
