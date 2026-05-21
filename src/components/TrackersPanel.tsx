import React, { useState } from "react";
import { Plus, Trash2, Calendar, ShieldCheck, Activity, Award, Weight, Check, X, AlertTriangle } from "lucide-react";
import { VaccinationRecord, ActivityRecord, WeightRecord } from "../types";

interface TrackersPanelProps {
  vaccinations: VaccinationRecord[];
  activities: ActivityRecord[];
  weightHistory: WeightRecord[];
  onAddVaccine: (v: Omit<VaccinationRecord, "id">) => void;
  onRemoveVaccine: (id: string) => void;
  onToggleVaccine: (id: string) => void;
  onAddActivity: (a: Omit<ActivityRecord, "id">) => void;
  onRemoveActivity: (id: string) => void;
  onAddWeight: (w: Omit<WeightRecord, "id">) => void;
  onRemoveWeight: (id: string) => void;
  weightUnit?: string;
}

export function TrackersPanel({
  vaccinations,
  activities,
  weightHistory,
  onAddVaccine,
  onRemoveVaccine,
  onToggleVaccine,
  onAddActivity,
  onRemoveActivity,
  onAddWeight,
  onRemoveWeight,
  weightUnit = "kg",
}: TrackersPanelProps) {
  const [activeTab, setActiveTab] = useState<"vaccines" | "activities" | "weight">("vaccines");

  // Form states
  const [showVaccineForm, setShowVaccineForm] = useState(false);
  const [vName, setVName] = useState("");
  const [vDate, setVDate] = useState("");
  const [vNotes, setVNotes] = useState("");

  const [showActivityForm, setShowActivityForm] = useState(false);
  const [aType, setAType] = useState<ActivityRecord["type"]>("Walk");
  const [aDuration, setADuration] = useState(30);
  const [aDate, setADate] = useState(new Date().toISOString().split("T")[0]);
  const [aNotes, setANotes] = useState("");

  const [showWeightForm, setShowWeightForm] = useState(false);
  const [wValue, setWValue] = useState(10);
  const [wDate, setWDate] = useState(new Date().toISOString().split("T")[0]);

  const handleAddVaccineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vName || !vDate) return;
    onAddVaccine({
      name: vName,
      dueDate: vDate,
      status: "Pending",
      notes: vNotes,
    });
    setVName("");
    setVDate("");
    setVNotes("");
    setShowVaccineForm(false);
  };

  const handleAddActivitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aDuration) return;
    onAddActivity({
      type: aType,
      duration: Number(aDuration),
      date: aDate || new Date().toISOString().split("T")[0],
      notes: aNotes,
    });
    setADuration(30);
    setANotes("");
    setShowActivityForm(false);
  };

  const handleAddWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wValue || !wDate) return;
    onAddWeight({
      weight: Number(wValue),
      date: wDate,
    });
    setWValue(10);
    setShowWeightForm(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden" id="trackers-panel">
      {/* Tab Selectors Row */}
      <div className="flex border-b border-neutral-100 bg-neutral-50/50">
        <button
          id="tracker-tab-vaccines"
          onClick={() => setActiveTab("vaccines")}
          className={`flex-1 py-4 text-xs font-semibold uppercase tracking-wider font-mono flex items-center justify-center gap-2 border-b-2 transition ${
            activeTab === "vaccines"
              ? "border-blue-600 text-blue-700 bg-white"
              : "border-transparent text-neutral-400 hover:text-neutral-600"
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> Immunization
        </button>
        <button
          id="tracker-tab-activities"
          onClick={() => setActiveTab("activities")}
          className={`flex-1 py-4 text-xs font-semibold uppercase tracking-wider font-mono flex items-center justify-center gap-2 border-b-2 transition ${
            activeTab === "activities"
              ? "border-blue-600 text-blue-700 bg-white"
              : "border-transparent text-neutral-400 hover:text-neutral-600"
          }`}
        >
          <Activity className="w-4 h-4" /> Activity &amp; Drill
        </button>
        <button
          id="tracker-tab-weight"
          onClick={() => setActiveTab("weight")}
          className={`flex-1 py-4 text-xs font-semibold uppercase tracking-wider font-mono flex items-center justify-center gap-2 border-b-2 transition ${
            activeTab === "weight"
              ? "border-blue-600 text-blue-700 bg-white"
              : "border-transparent text-neutral-400 hover:text-neutral-600"
          }`}
        >
          <Weight className="w-4 h-4" /> Scale log
        </button>
      </div>

      <div className="p-6 md:p-8">
        {/* TAB 1: IMMUNIZATIONS */}
        {activeTab === "vaccines" && (
          <div className="space-y-6" id="vaccines-content">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-neutral-800 tracking-tight text-sm uppercase font-mono">
                  Immunization Schedule
                </h3>
                <p className="text-xxs text-neutral-500">
                  Log core clinical immunizations and prevent infectious disease outbreaks.
                </p>
              </div>

              <button
                id="tracker-btn-add-vaccine"
                onClick={() => setShowVaccineForm(!showVaccineForm)}
                className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-semibold text-xs flex items-center gap-1 hover:bg-blue-700 shadow-sm transition"
              >
                {showVaccineForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                {showVaccineForm ? "Close Form" : "Add vaccine"}
              </button>
            </div>

            {/* Vaccine Form Toggle */}
            {showVaccineForm && (
              <form
                onSubmit={handleAddVaccineSubmit}
                className="bg-[#FAF8F5] border border-neutral-200/60 p-4 rounded-2xl space-y-3"
                id="vaccine-entry-form"
              >
                <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wide font-mono">
                  New Vaccination Entry
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold font-mono">
                      Vaccine Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 font-sans"
                      placeholder="e.g. DHPP Parvovirus Booster"
                      value={vName}
                      onChange={(e) => setVName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold font-mono">
                      Due Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 font-sans"
                      value={vDate}
                      onChange={(e) => setVDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold font-mono">
                      Doctor / Clinic Notes (Optional)
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 font-sans"
                      placeholder="e.g. Avoid exercise for 24h"
                      value={vNotes}
                      onChange={(e) => setVNotes(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-neutral-900 text-white font-semibold text-xs hover:bg-neutral-800 transition"
                >
                  Confirm Vaccination
                </button>
              </form>
            )}

            {/* Vaccines Table / List */}
            <div className="space-y-3">
              {vaccinations.length === 0 ? (
                <div className="text-center py-6 text-neutral-400 text-xs font-mono">
                  No immunization records registered.
                </div>
              ) : (
                vaccinations.map((record) => (
                  <div
                    key={record.id}
                    id={`vaccine-record-${record.id}`}
                    className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition ${
                      record.status === "Completed"
                        ? "bg-emerald-50/20 border-emerald-100"
                        : record.status === "Overdue"
                        ? "bg-red-50/20 border-red-100 animate-pulse"
                        : "bg-neutral-50/40 border-neutral-200/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onToggleVaccine(record.id)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center border transition ${
                          record.status === "Completed"
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : "bg-white border-neutral-300 hover:border-blue-500 hover:bg-blue-50/30"
                        }`}
                        title="Mark Status Completed"
                      >
                        {record.status === "Completed" ? <Check className="w-3.5 h-3.5" /> : null}
                      </button>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-neutral-800">{record.name}</p>
                          <span
                            className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full font-mono ${
                              record.status === "Completed"
                                ? "bg-emerald-100 text-emerald-800 text-xs"
                                : record.status === "Overdue"
                                ? "bg-red-100 text-red-800"
                                : "bg-neutral-100 text-neutral-600"
                            }`}
                          >
                            {record.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 font-sans flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> Due Date: {record.dueDate}
                          {record.notes && <span className="text-xs text-neutral-400 block">• Note: "{record.notes}"</span>}
                        </p>
                      </div>
                    </div>

                    <button
                      id={`vaccine-btn-remove-${record.id}`}
                      onClick={() => onRemoveVaccine(record.id)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50/40 transition"
                      title="Clear Entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 2: ACTIVITIES */}
        {activeTab === "activities" && (
          <div className="space-y-6" id="activities-content">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-neutral-800 tracking-tight text-sm uppercase font-mono">
                  Activity &amp; Drill Journal
                </h3>
                <p className="text-xxs text-neutral-500">
                  Track puppy training exercises, daily walks, and behavior modifications.
                </p>
              </div>

              <button
                id="tracker-btn-add-activity"
                onClick={() => setShowActivityForm(!showActivityForm)}
                className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-semibold text-xs flex items-center gap-1 hover:bg-blue-700 shadow-sm transition"
              >
                {showActivityForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                {showActivityForm ? "Close Form" : "Log Activity"}
              </button>
            </div>

            {/* Activity Form Toggle */}
            {showActivityForm && (
              <form
                onSubmit={handleAddActivitySubmit}
                className="bg-[#FAF8F5] border border-neutral-200/60 p-4 rounded-2xl space-y-3"
                id="activity-entry-form"
              >
                <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wide font-mono">
                  New Journal Entry
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold font-mono">
                      Category
                    </label>
                    <select
                      className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 font-sans"
                      value={aType}
                      onChange={(e) => setAType(e.target.value as any)}
                    >
                      <option value="Walk">🦮 Outing Walk</option>
                      <option value="Play">🥎 Play Session</option>
                      <option value="Training">🎓 Training Reps</option>
                      <option value="Grooming">🧼 Grooming care</option>
                      <option value="Other">🐾 Other Task</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold font-mono">
                      Duration (Minutes)
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 font-sans"
                      value={aDuration}
                      onChange={(e) => setADuration(Number(e.target.value))}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold font-mono">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-1.5 bg-white border border-neutral-100 rounded-xl text-xs focus:outline-none focus:border-blue-500 font-sans"
                      value={aDate}
                      onChange={(e) => setADate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-3">
                    <label className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold font-mono">
                      Notes (Words spoken/Commands practiced/Behavior status)
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-1.5 bg-white border border-neutral-100 rounded-xl text-xs focus:outline-none focus:border-blue-500 font-sans"
                      placeholder="e.g. Practiced 3-second recall in park. Bella was 8/10 responsive."
                      value={aNotes}
                      onChange={(e) => setANotes(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-neutral-900 text-white font-semibold text-xs hover:bg-neutral-800 transition"
                >
                  Log to Journal
                </button>
              </form>
            )}

            {/* Activities list */}
            <div className="space-y-3">
              {activities.length === 0 ? (
                <div className="text-center py-6 text-neutral-400 text-xs font-mono">
                  No activities registered. Record your pet's workouts!
                </div>
              ) : (
                [...activities].reverse().map((record) => (
                  <div
                    key={record.id}
                    id={`activity-record-${record.id}`}
                    className="p-4 rounded-2xl border border-neutral-100 bg-neutral-50/30 hover:bg-neutral-50 flex items-center justify-between gap-4 transition"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-sm mt-0.5 shrink-0">
                        {record.type === "Walk" ? "🦮" : record.type === "Play" ? "🥎" : record.type === "Training" ? "🎓" : "🧼"}
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <p className="text-xs font-bold text-neutral-800">
                            {record.type} Event
                          </p>
                          <span className="text-[10px] text-neutral-500 font-mono">
                            | {record.duration} mins
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 flex items-center gap-1 font-mono">
                          <Calendar className="w-3.5 h-3.5" /> {record.date}
                        </p>
                        {record.notes && (
                          <p className="text-xs text-neutral-600 bg-white border border-neutral-100 rounded-lg px-2.5 py-1 mt-1 leading-relaxed">
                            {record.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      id={`activity-btn-remove-${record.id}`}
                      onClick={() => onRemoveActivity(record.id)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50/40 transition shrink-0"
                      title="Clear Entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: WEIGHT HISTORY */}
        {activeTab === "weight" && (
          <div className="space-y-6" id="weight-content">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-neutral-800 tracking-tight text-sm uppercase font-mono">
                  Scale Milestone Log
                </h3>
                <p className="text-xxs text-neutral-500">
                  Track body mass fluctuations to preempt systemic weight issues.
                </p>
              </div>

              <button
                id="tracker-btn-add-weight"
                onClick={() => setShowWeightForm(!showWeightForm)}
                className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-semibold text-xs flex items-center gap-1 hover:bg-blue-700 shadow-sm transition"
              >
                {showWeightForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                {showWeightForm ? "Close Form" : "Log Weight"}
              </button>
            </div>

            {/* Weight Form Toggle */}
            {showWeightForm && (
              <form
                onSubmit={handleAddWeightSubmit}
                className="bg-[#FAF8F5] border border-neutral-200/60 p-4 rounded-2xl space-y-3"
                id="weight-entry-form"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold font-mono">
                      Weight Value ({weightUnit})
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 font-mono"
                      value={wValue}
                      onChange={(e) => setWValue(Number(e.target.value))}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold font-mono">
                      Weighing Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 font-sans"
                      value={wDate}
                      onChange={(e) => setWDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-neutral-900 text-white font-semibold text-xs hover:bg-neutral-800 transition"
                >
                  Log Milestone weight
                </button>
              </form>
            )}

            {/* Timeline */}
            <div className="space-y-3">
              {weightHistory.length === 0 ? (
                <div className="text-center py-6 text-neutral-400 text-xs font-mono">
                  No records stored yet. Keep a structured growth log!
                </div>
              ) : (
                [...weightHistory].sort((a,b) => b.date.localeCompare(a.date)).map((record) => (
                  <div
                    key={record.id}
                    id={`weight-record-${record.id}`}
                    className="p-3.5 rounded-xl border border-neutral-100 bg-neutral-50/40 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 text-xs font-bold">
                        ⚖️
                      </div>
                      <div>
                        <p className="text-xs font-bold text-neutral-800">
                          {record.weight} {weightUnit}
                        </p>
                        <p className="text-[10px] text-neutral-400 font-mono">
                          Recorded: {record.date}
                        </p>
                      </div>
                    </div>

                    <button
                      id={`weight-btn-remove-${record.id}`}
                      onClick={() => onRemoveWeight(record.id)}
                      className="p-1 rounded-md text-neutral-400 hover:text-red-500 hover:bg-red-50/20 transition"
                      title="Clear Entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
