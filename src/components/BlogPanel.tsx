import React, { useState } from "react";
import { Search, BookOpen, Clock, Tag, ChevronRight, User, Heart } from "lucide-react";
import { BlogArticle, EXPERT_BLOGS } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface BlogPanelProps {
  onSearchQuery?: (query: string) => void;
}

export function BlogPanel({ onSearchQuery }: BlogPanelProps) {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "health" | "training" | "nutrition">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("pet_blog_bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = bookmarkedIds.includes(id)
      ? bookmarkedIds.filter((bId) => bId !== id)
      : [...bookmarkedIds, id];
    setBookmarkedIds(updated);
    localStorage.setItem("pet_blog_bookmarks", JSON.stringify(updated));
  };

  const filteredArticles = EXPERT_BLOGS.filter((article) => {
    const categoryMatches = selectedCategory === "all" || article.category === selectedCategory;
    const searchMatches =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatches && searchMatches;
  });

  return (
    <div className="space-y-8" id="blog-section">
      {/* Blog Hero & Search Filter Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 font-sans" id="blog-header-title">
            Expert Vet Health & Training Manuals
          </h2>
          <p className="text-sm text-neutral-500">
            Scientifically backed studies, nutrition guides, and certified canine & feline behavior methods.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <input
            id="blog-search-input"
            type="text"
            className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 font-sans text-neutral-800 transition"
            placeholder="Search health symptoms, training rules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2" id="blog-category-filter">
        {(["all", "health", "training", "nutrition"] as const).map((category) => (
          <button
            key={category}
            id={`blog-category-${category}`}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800"
            }`}
          >
            {category === "all" ? "All Manuals" : category}
          </button>
        ))}

        <div className="ml-auto text-xs text-neutral-400 font-mono">
          Showing {filteredArticles.length} Articles
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="blog-articles-grid">
        {filteredArticles.map((article) => {
          const isBookmarked = bookmarkedIds.includes(article.id);
          return (
            <div
              key={article.id}
              id={`blog-card-${article.id}`}
              onClick={() => setSelectedArticle(article)}
              className="group flex flex-col bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-md transition duration-300 cursor-pointer"
            >
              {/* Picture Frame */}
              <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"
                />
                {/* Category Pin */}
                <span className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-sm text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md">
                  {article.category}
                </span>

                {/* Bookmark Action */}
                <button
                  id={`blog-btn-bookmark-${article.id}`}
                  onClick={(e) => toggleBookmark(article.id, e)}
                  className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-sm transition ${
                    isBookmarked
                      ? "bg-red-50 text-red-500"
                      : "bg-white/90 text-neutral-500 hover:text-neutral-800 hover:scale-105"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isBookmarked ? "fill-red-500" : ""}`} />
                </button>
              </div>

              {/* Text Frame */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  {/* Credits block */}
                  <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-neutral-400" />
                      {article.author.split(" ")[1]} DVM
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-md font-bold text-neutral-800 group-hover:text-blue-600 transition leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-neutral-500 line-clamp-2 md:line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                  {/* Tags */}
                  <div className="flex gap-1 overflow-hidden max-w-[70%]">
                    {article.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-neutral-50 border border-neutral-200 text-neutral-500 text-[10px] px-2 py-0.5 rounded-md font-mono whitespace-nowrap"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-semibold text-blue-600 flex items-center gap-1 font-mono transition group-hover:translate-x-1">
                    READ MANUAL <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Reading Overlay Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-3xl border border-neutral-100 overflow-hidden shadow-2xl max-h-[90vh] flex flex-col text-neutral-800"
              onClick={(e) => e.stopPropagation()}
              id="blog-detail-overlay"
            >
              {/* Header Image Frame */}
              <div className="relative h-64 md:h-80 bg-neutral-100 overflow-hidden shrink-0">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8">
                  <div className="space-y-2">
                    <span className="bg-blue-600 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md">
                      {selectedArticle.category}
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
                      {selectedArticle.title}
                    </h2>
                  </div>
                </div>

                {/* Close Button Pin */}
                <button
                  id="blog-detail-close"
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-black/60 hover:bg-black text-white hover:scale-105 rounded-full transition"
                >
                  ✕
                </button>
              </div>

              {/* Author Banner */}
              <div className="px-6 md:px-8 py-3 bg-white border-b border-neutral-100 shrink-0 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-sm">
                    {selectedArticle.author.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-800 leading-tight">
                      {selectedArticle.author}
                    </h4>
                    <p className="text-xxs text-neutral-500 font-mono uppercase tracking-wider">{selectedArticle.authorTitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
                  <span>{selectedArticle.publishDate}</span>
                  <span>|</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    {selectedArticle.readTime}
                  </span>
                </div>
              </div>

              {/* Body Content (Scrollable) */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-4">
                {selectedArticle.content.map((paragraph, index) => {
                  const isItem = paragraph.startsWith("•");
                  const isHeading = paragraph.match(/^\d+\./) || paragraph.includes("Rules") || paragraph.includes("Understanding") || paragraph.includes("Protocol");
                  if (isItem) {
                    return (
                      <p key={index} className="text-sm text-neutral-700 leading-relaxed pl-4 border-l-2 border-blue-500 bg-blue-50/20 py-2 rounded-r-lg font-sans">
                        {paragraph}
                      </p>
                    );
                  }
                  if (isHeading) {
                    return (
                      <h4 key={index} className="text-md font-bold text-neutral-900 pt-4 pb-1 border-b border-neutral-200">
                        {paragraph}
                      </h4>
                    );
                  }
                  return (
                    <p key={index} className="text-sm md:text-md text-neutral-600 leading-relaxed font-sans first-letter:text-2xl first-letter:font-bold first-letter:text-blue-600 first-letter:mr-1">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Modal Footer */}
              <div className="px-6 md:px-8 py-4 bg-white border-t border-neutral-100 flex justify-between items-center shrink-0">
                <div className="flex flex-wrap gap-1">
                  {selectedArticle.tags.map((tag, i) => (
                    <span key={i} className="bg-neutral-50 border border-neutral-200 text-neutral-500 text-[10px] px-2 py-0.5 rounded-md font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  id="blog-detail-done"
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition"
                >
                  Finished Reading
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
