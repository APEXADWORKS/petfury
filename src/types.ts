export interface PetProfile {
  name: string;
  type: "dog" | "cat" | "other";
  breed: string;
  ageYears: number;
  ageMonths: number;
  weight: number;
  weightUnit: "kg" | "lbs";
}

export interface VaccinationRecord {
  id: string;
  name: string;
  dueDate: string;
  status: "Completed" | "Pending" | "Overdue";
  notes?: string;
}

export interface ActivityRecord {
  id: string;
  type: "Walk" | "Play" | "Training" | "Grooming" | "Other";
  duration: number; // in minutes
  date: string;
  notes?: string;
}

export interface WeightRecord {
  id: string;
  weight: number;
  date: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: "health" | "training" | "nutrition";
  author: string;
  authorTitle: string;
  publishDate: string;
  readTime: string;
  summary: string;
  tags: string[];
  image: string;
  content: string[];
}

export const EXPERT_BLOGS: BlogArticle[] = [
  {
    id: "dog-allergies-nutrition",
    title: "Understanding Dog Food Allergies & Elimination Diets",
    category: "nutrition",
    author: "Dr. Catherine Bennett",
    authorTitle: "DVM, Veterinary Nutritionist",
    publishDate: "May 18, 2026",
    readTime: "6 min read",
    summary: "Is your dog scratching constantly or experiencing regular digestive upset? Learn how to identify real food allergens versus seasonal ones using safe elimination diets.",
    tags: ["Health", "Nutrition", "Dogs", "Allergies"],
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=600",
    content: [
      "Many dog owners mistake itchy skin, red paws, or recurring ear infections for environmental seasonal allergies when they are actually classic signs of dietary sensitivity. True food allergies trigger an immune response, while food intolerances are digestive sensitivities. Surprisingly, the most common allergens aren't grains—they are beef, dairy, chicken, and wheat.",
      "Diagnosing a food allergy requires precision. Standard blood tests for food sensitivities are notoriously unreliable. The gold standard for diagnostics is a strict 8-to-12 week elimination diet trial. During this trial, your pet must consume only a novel protein source (e.g., venison, kangaroo, or alligator) and a novel starch source that they have never eaten before, or a specialized hydrolyzed protein diet where the protein is broken down so small the immune system cannot recognize it.",
      "Critical Rules of the Elimination Diet:",
      "• Zero cheating. Even a single scrap of table scraps, human treats, or flavored heartworm chews can restart the 8-week countdown timer instantly.",
      "• Keep water pristine. Ensure no other pets share active water bowls containing trace elements of normal food.",
      "• Introduce ingredients back gradually. If symptoms clear up entirely by week 10, introduce a single clean protein (like beef) back into their diet. If scratchiness or red spots return within 5-7 days, you've officially identified a primary allergen.",
      "Once you pinpoint the offending ingredient, transition your pet to a high-quality, single-source novel protein or hypersensitivity diet. Always look for formulas enriched with Omega-3 fatty acids (like EPA and DHA from marine source oils) which naturally reduce systemic skin inflammation and support a strong epidermal outer moisture barrier."
    ]
  },
  {
    id: "cat-warning-signs",
    title: "Top 5 Cat Warning Signs You Should Never Ignore",
    category: "health",
    author: "Dr. Marcus Vance",
    authorTitle: "Feline Behavior & Health Expert",
    publishDate: "May 10, 2026",
    readTime: "7 min read",
    summary: "Cats are masters of disguise when experiencing physical discomfort or illness. Spot these five subtle behavioral and physiological warnings before they turn into emergencies.",
    tags: ["Cats", "Health", "Veterinary Tips", "Symptom Check"],
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600",
    content: [
      "In the wild, showing vulnerability makes a cat prime target for predators. Consequently, domestic cats have evolved to mask pain and illness exceptionally well. Often, by the time a feline displays obvious signs of distress, their medical condition is advanced. Understanding their subtle behavioral modifications is the best way to safeguard their health.",
      "1. Sudden Litter Box Changes or Straining",
      "If your spotlessly trained cat begins urinating outside their litter box, especially on cold, flat surfaces like tile or bathroom sinks, do not assume they are behaving spitefully. Feline Lower Urinary Tract Disease (FLUTD), cystitis, or painful bladder stones are highly probable. Straining or frequent crying in the box constitutes a life-threatening veterinary emergency—particularly for males, where a complete urinary tract blockage can cause toxic kidney failure in under 24 hours.",
      "2. Unexplained Lethargy & Total Social Withdrawal",
      "A cat that routinely greets you but suddenly chooses to hide under the bed, deep inside closets, or in dark basement corners is signaling illness. Sick felines seek enclosed, dark, stable spaces to preserve heat and energy. If they refuse to emerge for high-value treats or active playtime for over 12 hours, a veterinary consultation is highly recommended.",
      "3. Changes in Grooming Habits (Over-grooming or Unkempt Fur)",
      "A healthy cat grooms meticulously. If their coat suddenly appears greasy, clumped, or starts exhibiting dandruff, it usually implies they are painful or too stiff to reach normal zones—commonly caused by feline osteoarthritis or heavy systemic lethargy. Conversely, a cat chewing their belly or inner thighs bald is usually experiencing localized neurogenic pain, severe allergy-induced dermatitis, or high-stress anxiety.",
      "4. The Head Pressing Trap",
      "Head pressing involves a cat pushing the top of their head firmly against hard walls, furniture columns, or corners and holding it still for long intervals. Unlike normal head-butting (bunting) which is affectionate, head pressing manifests as a tense, steady push. This is a crucial diagnostic indicator of primary neurological dysfunction, high intracranial pressure, toxic exposure, or advanced hepatic encephalopathy (liver disease status).",
      "5. Distinctly Labored or Audibly Faster Breathing",
      "While a cat purrs when happy, rapid shallow breaths (exceeding 30-40 breaths per minute while sleeping peacefully) or panting with an open mouth is a severe alarm for cardiovascular distress, congestive heart failure, or asthma. If open-mouth panting continues after active play is completed, verify their gums immediately; blue or pale white tones command immediate transport to an ICU veterinarian."
    ]
  },
  {
    id: "puppy-recall-training",
    title: "The 3-Second Recall: Training a Bulletproof Come Command",
    category: "training",
    author: "Elena Rostov",
    authorTitle: "Certified Professional Dog Trainer (CPDT-KA)",
    publishDate: "May 15, 2026",
    readTime: "5 min read",
    summary: "Teach your dog to return to you in any scenario—even when chasing squirrels or distracted by other dogs. Explore our progressive, high-value reward system.",
    tags: ["Dogs", "Puppy Training", "Obedience", "Recall"],
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600",
    content: [
      "A reliable recall is more than an impressive party trick; it is a vital safety command that can save your dog's life in dangerous scenarios, such as escaping into active traffic or approaching venomous wildlife. Regrettably, most recall commands fail when needed because owners inadvertently poison the cue or fail to compete with environmental distractions.",
      "What is 'Cue Poisoning'?",
      "Cue poisoning occurs when you pair the command word (like 'Come!') with a negative outcome from the dog's perspective. For example, if you call your puppy with 'Come!' only to immediately put them in their crate, clip a boring leash at the park, or bathe them, they learn that returning signals 'the fun has ended.' Always reward them and release them immediately back to their game 90% of the time to build positive conditioning.",
      "Step-by-Step Training Protocol:",
      "• Phase 1: High-Value Jackpot Loading. Inside your quiet hallway, say your dog's name clearly, followed by your recall word (e.g. 'Bella, Recall!'). The instant they approach you, throw a massive 'jackpot' celebration—feeding 4-5 tiny cubes of premium freeze-dried liver or hot dogs sequentially while praising them enthusiastically.",
      "• Phase 2: Add Back-Step Motion. When calling, actively take 4-5 rapid steps backwards away from your dog. This triggers the natural canine predatory chase drive, prompting them to accelerate towards your chest joyfully rather than halting early.",
      "• Phase 3: The Long-Line Progression. Move outdoors but stay within quiet zones using a 30-foot training leash. Allow your dog to smell the surroundings, then call. Practice building momentum without tension on the line. Use gentle tug-and-releases if they delay.",
      "• Phase 4: Distraction Counterconditioning. Gradually introduce challenges: have someone roll active tennis balls, squeak toys, or wave food distance away while you recall. Ensure your rewarding jackpots remain far more sensory-compelling than the distractions.",
      "Remember, never call your dog to you if there is a primary risk they will ignore you and you can't enforce the request. If they are off-leash chasing a deer, calling 'Come!' repeatedly when they have zero attention spans just teaches them they can safely ignore your commands without consequences. Run in the opposite direction or squeak a high-pitched toy instead to capture their visual curiosity."
    ]
  },
  {
    id: "feline-scratching-behavior",
    title: "Cat Claws: Decoding Feline Scratching & Scratch Post Placement",
    category: "training",
    author: "Elena Rostov",
    authorTitle: "Feline Behavior Consultant",
    publishDate: "May 08, 2026",
    readTime: "4 min read",
    summary: "Is your couch shredded to pieces? Scratching is a native cat emotional outlet. Learn how to redirect this behavior from furniture to optimal climbing surfaces.",
    tags: ["Cats", "Behavior", "Scratching", "Furniture Protection"],
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600",
    content: [
      "Many cat owners look at shredded leather chair corners with sheer frustration, frequently labeling their cat's actions as destructive or malicious. However, scratching is a structural necessity for a cat's physiological and psychological well-being. Punishing this native drive will only induce high cortisol strain and prompt secondary feline anxiety behaviors.",
      "Understanding Why Cats Scratch:",
      "• Physical Grooming: Scratching peels off the frayed, dead outer husks of their claws to expose the razor-sharp new sheath developing underneath.",
      "• Olfactory & Visual Marking: Feline paws possess specialized interdigital scent glands. When scratching a vertical surface, they apply unique pheromone markers and physical claw scars to declare territorial lines to other cats.",
      "• Full-Body Decompression: Scratching allows complete muscular extension of the spine, shoulders, and legs, serving as an active morning yoga and energy release.",
      "Step 1: Get the Right Medium and Sizing",
      "The reason cats prefer couch corners to many commercial posts is stability. A flimsy, lightweight post that wobbles as soon as a cat applies weight will be immediately abandoned. Cats require a post that is a minimum of 32-35 inches tall, allowing them to stretch their backs fully, and anchored by a heavy, solid wood base. Material is equally vital: seek rough natural sisal rope or robust vertical corrugated cardboard blocks.",
      "Step 2: Strategic Post Mapping",
      "Do not tuck scratching posts away in hidden household corners or dark storage closets. Cats mark surfaces where they spend the most social hours with you, or near primary sleeping zones where they wake up and stretch first. Place a stable post immediately adjacent to their favorite couch resting zones or near major room thresholds.",
      "Step 3: Redirection Techniques",
      "If you capture your cat scratching furniture, do not scream, throw water, or hit them. Instead, make a soft, high-pitched hiss or clapping sound to break their focus. Gently pick them up, transfer them to their stable post, and reward them with premium catnip treats when their claws touch the sisal. Additionally, apply double-sided furniture tape (like Sticky Paws) to the sofa edges; cats find the sticky texture highly unpleasant under their paws and will naturally choose the sisal instead."
    ]
  },
  {
    id: "feline-canine-vaccination-guide",
    title: "Active Vaccines: Guarding Against Domestic Pet Diseases",
    category: "health",
    author: "Dr. Catherine Bennett",
    authorTitle: "DVM, Family Practice",
    publishDate: "May 03, 2026",
    readTime: "6 min read",
    summary: "Plan your pet's complete immunological defense strategy. Demystifying the core schedules for canine parvovirus, feline leukemia, rabies, and optional kennel cough vaccines.",
    tags: ["Vaccines", "Health", "Dogs", "Cats", "Prevention"],
    image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=600",
    content: [
      "Vaccines are the single most impactful breakthrough in modern veterinary medicine, converting once-fatal endemic plagues (like Canine Distemper and Feline Panleukopenia) into completely preventable events. Yet, pet parents often get overwhelmed by the sheer variety of vaccine codes listed on veterinary invoices. Let's break down exactly what your pet needs.",
      "Core versus Non-Core Vaccinations",
      "Core vaccines are non-negotiable and recommended for every single cat or dog, regardless of indoor-only lifestyles, geographical regions, or breed structures. Chronic urban environments, boarding lobbies, or sudden storm escapes are always potential exposure vectors.",
      "Canine Core Package (DHPP & Rabies):",
      "• Distemper (D): A devastating viral infection targeting gastrointestinal systems, respiratory lungs, and neurological brain cell networks.",
      "• Hepatitis / Adenovirus-2 (H/A2): Key pathogens triggering severe acute liver necrosis, chronic damage, and upper respiratory strains.",
      "• Parvovirus (P): A highly contagious, environmentally rugged virus causing severe hemorrhagic gastroenteritis. It can persist in local soils for years.",
      "• Parainfluenza (P): A principal agent causing infectious canine tracheobronchitis (kennel cough).",
      "• Rabies: A 100% fatal zoonotic nervous system disease, legally mandated in almost all cities to safeguard human health.",
      "Feline Core Package (FVRCP & Rabies):",
      "• Feline Herpesvirus-1 (FVR) & Calicivirus (C): Key viral triggers of painful chronic mouth ulcers, conjunctivitis, runny nose, and severe respiratory congestion.",
      "• Panleukopenia / Feline Distemper (P): A high-fatality virus destroying bone marrow cell lines and intestinal systems in kittens.",
      "Common Non-Core (Lifestyle-Dependent Choice) Vaccines:",
      "For highly active dogs, Leptospirosis (bacteria from rodent urine in local water puddles) and Bordetella (protects against kennel cough in grooming salons) are highly recommended. For cats, Feline Leukemia (FeLV) is a high-priority core-equivalent for any outdoor-exploring cat or multi-cat household with mixed disease status.",
      "Adhere strictly to the juvenile series completed every 3 to 4 weeks until the pet hits 16 weeks of age, followed by a booster at 1 year, and three-year rotation protocols thereafter."
    ]
  }
];
