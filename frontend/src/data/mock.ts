export type Img = {
  id: string;
  title: string;
  prompt: string;
  image: string;
  likes: number;
  downloads: number;
  tags: string[];
  user: { name: string; avatar: string };
};

const covers = [
  "https://images.unsplash.com/photo-1559613671-dfe2fb6a7680?w=900&q=70",
  "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=900&q=70",
  "https://images.unsplash.com/photo-1689797002931-82cb0a1e0a2b?w=900&q=70",
  "https://images.unsplash.com/photo-1683009427470-a36fee396389?w=900&q=70",
  "https://images.unsplash.com/vector-1745847439146-c0381f39e8c0?w=900&q=70",
  "https://plus.unsplash.com/premium_vector-1739363076908-c57cf1df2d23?w=900&q=70",
  "https://cdn.pixabay.com/photo/2024/04/17/14/53/ai-generated-8702249_1280.jpg?w=900&q=70",
  "https://cdn.pixabay.com/photo/2023/12/26/17/38/ai-generated-8470716_1280.png?w=900&q=70",
  "https://cdn.pixabay.com/photo/2024/04/12/15/46/beautiful-8692180_1280.png?w=900&q=70",
  "https://cdn.pixabay.com/photo/2026/02/08/01/59/01-59-58-650_1280.jpg?w=900&q=70",
  "https://cdn.pixabay.com/photo/2026/02/18/17/44/daniil_kondrashin-model-10131317_1280.jpg?w=900&q=70",
  "https://cdn.pixabay.com/photo/2024/04/28/14/10/woman-8725575_1280.jpg?w=900&q=70",
];

const prompts = [
  "cinematic cyberpunk city neon fog 8k",
  "ethereal forest glowing mushrooms",
  "hyper-realistic mechanical eye macro",
  "minimalist architectural void shadows",
  "art deco hotel lobby gold marble",
  "alien biosphere with translucent flora",
  "underwater ruins of a lost city",
  "lone astronaut on saturn moon",
  "kintsugi pottery glowing seams",
  "abstract liquid mercury sculpture",
  "isometric tiny coffee shop diorama",
  "macro snowflake crystal lattice",
];

export const mockImages: Img[] = covers.map((c, i) => ({
  id: `i_${i + 1}`,
  title: prompts[i].replace(/\b\w/g, (m) => m.toUpperCase()),
  prompt: prompts[i],
  image: c,
  likes: 120 + i * 47,
  downloads: 40 + i * 19,
  tags: ["spectral", "v4.2", i % 2 ? "cinematic" : "abstract"],
  user: {
    name: ["Mira K.", "Jordan A.", "Sasha L.", "Kai N.", "Rin O.", "Ev R.", "Theo M.", "Iris P.", "Noa S.", "Lev D.", "Yuki H.", "Zane W."][i],
    avatar: `https://api.dicebear.com/9.x/glass/svg?seed=${i}`,
  },
}));

export type Blog = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: { name: string; avatar: string; bio: string };
};

export const mockBlogs: Blog[] = [
  {
    id: "b1",
    slug: "prompt-engineering-2026",
    title: "Prompt engineering in 2026: less is more",
    excerpt: "Why the next generation of models reward intent, not verbosity.",
    cover: covers[3],
    category: "Guides",
    readTime: "8 min",
    publishedAt: "May 18, 2026",
    author: { name: "Mira Kade", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mira", bio: "Research @ Luminal" },
  },
  {
    id: "b2",
    slug: "inside-spectral-v4",
    title: "Inside Spectral v4: architecture notes",
    excerpt: "A look at the diffusion stack powering our flagship model.",
    cover: covers[5],
    category: "Engineering",
    readTime: "12 min",
    publishedAt: "May 11, 2026",
    author: { name: "Theo Maris", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=theo", bio: "Lead engineer" },
  },
  {
    id: "b3",
    slug: "case-study-archviz-studio",
    title: "Case study: how Northlight cut concept time 80%",
    excerpt: "An archviz studio rebuilt their pipeline around generative drafts.",
    cover: covers[7],
    category: "Case studies",
    readTime: "6 min",
    publishedAt: "May 03, 2026",
    author: { name: "Jordan A.", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=jordan", bio: "Customer stories" },
  },
  {
    id: "b4",
    slug: "ai-art-challenge-may",
    title: "The May AI Art Challenge winners",
    excerpt: "Twelve standouts from over 4,000 community submissions.",
    cover: covers[9],
    category: "Community",
    readTime: "5 min",
    publishedAt: "Apr 28, 2026",
    author: { name: "Iris P.", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=iris", bio: "Community lead" },
  },
  {
    id: "b5",
    slug: "negative-prompts-deepdive",
    title: "Negative prompts: a quiet deep-dive",
    excerpt: "When subtraction beats addition in modern diffusion workflows.",
    cover: covers[1],
    category: "Guides",
    readTime: "9 min",
    publishedAt: "Apr 14, 2026",
    author: { name: "Sasha L.", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=sasha", bio: "Prompt researcher" },
  },
  {
    id: "b6",
    slug: "changelog-may-2026",
    title: "Changelog — May 2026",
    excerpt: "Faster turbo mode, image-to-image v2, new aspect controls.",
    cover: covers[2],
    category: "Changelog",
    readTime: "3 min",
    publishedAt: "May 30, 2026",
    author: { name: "Kai N.", avatar: "https://api.dicebear.com/9.x/glass/svg?seed=kai", bio: "Product" },
  },
];

export type Model = {
  id: string;
  name: string;
  tagline: string;
  category: "Photorealism" | "Illustration" | "Anime" | "Abstract" | "3D";
  gradient: string;
};

export const mockModels: Model[] = [
  { id: "m1", name: "Spectral v4.2", tagline: "High-fidelity photoreal XL", category: "Photorealism", gradient: "from-violet-500 to-fuchsia-500" },
  { id: "m2", name: "Prisma", tagline: "Editorial photography", category: "Photorealism", gradient: "from-sky-500 to-violet-600" },
  { id: "m3", name: "Abstracto", tagline: "Generative abstraction", category: "Abstract", gradient: "from-amber-400 to-rose-500" },
  { id: "m4", name: "Mangaverse", tagline: "Anime + manga", category: "Anime", gradient: "from-pink-400 to-violet-500" },
  { id: "m5", name: "Mythos", tagline: "Illustration & concept art", category: "Illustration", gradient: "from-emerald-400 to-sky-500" },
  { id: "m6", name: "Volumetra", tagline: "3D-style renders", category: "3D", gradient: "from-orange-400 to-rose-600" },
];

export const aspectRatios = ["2:3", "1:1", "9:16", "4:3", "16:9"] as const;

// ----- Plans -----
export type Plan = { id: string; name: string; price: string; cadence: string; tagline: string; features: string[]; cta: string; featured?: boolean };
export const mockPlans: Plan[] = [
  { id: "free", name: "Starter", price: "$0", cadence: "forever", tagline: "Explore what's possible.", cta: "Start free", features: ["100 credits / month", "Standard speed", "Community gallery", "Spectral base model"] },
  { id: "pro", name: "Pro", price: "$24", cadence: "per month", tagline: "For working creators.", cta: "Go Pro", featured: true, features: ["3,000 credits / month", "Turbo speed", "All models incl. Spectral v4.2", "Commercial license", "Priority queue"] },
  { id: "team", name: "Studio", price: "$79", cadence: "per editor / month", tagline: "Built for small studios.", cta: "Start trial", features: ["10,000 credits / editor", "Shared brand kit", "Team gallery & comments", "Roles & permissions", "API access"] },
  { id: "ent", name: "Enterprise", price: "Custom", cadence: "annual", tagline: "Scale safely.", cta: "Talk to sales", features: ["Custom credits & SLA", "SSO + audit logs", "Private fine-tunes", "Dedicated support", "On-prem options"] },
];

// ----- FAQ -----
export type FAQ = { q: string; a: string };
export const mockFAQ: FAQ[] = [
  { q: "What is a credit?", a: "One credit equals one standard-speed generation at 1024px. Turbo, large aspect ratios, and premium models consume slightly more." },
  { q: "Can I use generations commercially?", a: "Yes. Pro, Studio, and Enterprise plans include a commercial license for every output. Free plan is for personal use." },
  { q: "Do unused credits roll over?", a: "Pro plans roll over up to 1× the monthly allowance. Studio rolls over up to 2×. Enterprise terms are custom." },
  { q: "Which models are included?", a: "All plans include Spectral base. Pro and above unlock Spectral v4.2, Prisma, Mythos, Mangaverse, Volumetra, and community fine-tunes." },
  { q: "How does the API work?", a: "Studio and above get a REST + Node SDK with the same model lineup, batch endpoints, webhooks, and per-key rate limits." },
  { q: "Can I cancel anytime?", a: "Yes — plans are month-to-month. You keep access through the end of the billing period." },
];

// ----- Changelog -----
export type ChangelogEntry = { date: string; version: string; title: string; tags: string[]; body: string };
export const mockChangelog: ChangelogEntry[] = [
  { date: "May 28, 2026", version: "v4.2", title: "Spectral v4.2 — sharper humans, calmer backgrounds", tags: ["model", "release"], body: "Retrained the human portrait head with 2.4M new high-res samples. Backgrounds no longer over-render when the subject is centered." },
  { date: "May 14, 2026", version: "v4.1.3", title: "Turbo gets ~30% faster", tags: ["performance"], body: "Compiler upgrades and a new scheduler shaved 1.2s off median turbo generations." },
  { date: "May 02, 2026", version: "v4.1.2", title: "Image-to-image v2", tags: ["feature"], body: "Rebuilt img2img with structural conditioning. Style transfers stay closer to the source composition." },
  { date: "Apr 20, 2026", version: "v4.1.1", title: "Aspect ratio picker, redesigned", tags: ["ui"], body: "New chip layout, sticky recents, and custom dimensions via the 'more' button." },
  { date: "Apr 06, 2026", version: "v4.1", title: "Brand kits + shared palettes", tags: ["feature", "teams"], body: "Studio teams can now pin colors, fonts, and reference images that auto-attach to every prompt." },
];

// ----- Jobs -----
export type Job = { id: string; title: string; team: string; location: string; type: string };
export const mockJobs: Job[] = [
  { id: "j1", title: "Senior Research Engineer — Diffusion", team: "Research", location: "Remote (Americas)", type: "Full-time" },
  { id: "j2", title: "Product Designer — Generate Surface", team: "Design", location: "Berlin / Remote", type: "Full-time" },
  { id: "j3", title: "Infrastructure Engineer", team: "Platform", location: "Remote (EU)", type: "Full-time" },
  { id: "j4", title: "Developer Advocate", team: "Community", location: "Remote", type: "Full-time" },
  { id: "j5", title: "Trust & Safety Lead", team: "Operations", location: "London", type: "Full-time" },
  { id: "j6", title: "Customer Engineer — Enterprise", team: "Go-to-market", location: "NYC / Remote", type: "Full-time" },
];

// ----- Leaderboard -----
export type LeaderRow = { rank: number; name: string; avatar: string; score: number; streak: number };
export const mockLeaderboard: LeaderRow[] = Array.from({ length: 12 }, (_, i) => ({
  rank: i + 1,
  name: ["Mira K.", "Jordan A.", "Sasha L.", "Kai N.", "Rin O.", "Ev R.", "Theo M.", "Iris P.", "Noa S.", "Lev D.", "Yuki H.", "Zane W."][i],
  avatar: `https://api.dicebear.com/9.x/glass/svg?seed=${i + 30}`,
  score: 9800 - i * 217,
  streak: 42 - i * 2,
}));

// ----- Tools -----
export type Tool = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  accent: string; // tailwind gradient classes
  samples: number[]; // index into covers
  prompts: string[];
  useCases: string[];
};
export const mockTools: Tool[] = [
  { slug: "text-to-image", name: "Text to image", tagline: "From a sentence to a portfolio piece.", description: "The fastest path from idea to image. Type what you see, ship pixels.", accent: "from-violet-500 to-fuchsia-500", samples: [0, 3, 5, 7], prompts: ["misty fjord at dawn, cinematic", "art deco hotel, gold marble", "lone astronaut on saturn moon"], useCases: ["Concept art", "Editorial photo", "Marketing creative"] },
  { slug: "image-to-image", name: "Image to image", tagline: "Restyle anything, keep what matters.", description: "Restyle, repose, or recompose any image with structural conditioning.", accent: "from-sky-500 to-violet-600", samples: [1, 4, 6, 9], prompts: ["turn into oil painting", "match brand palette", "swap to night scene"], useCases: ["Brand restyle", "Photo retouch", "Style transfer"] },
  { slug: "upscaler", name: "Upscaler", tagline: "8K from anything.", description: "Bring detail back to small or compressed images, up to 8K.", accent: "from-emerald-400 to-sky-500", samples: [2, 5, 8, 11], prompts: ["upscale 4×", "restore old photo", "sharpen archival scan"], useCases: ["Print prep", "Restoration", "Asset rescue"] },
  { slug: "background-remover", name: "Background remover", tagline: "Clean cutouts in one click.", description: "Remove backgrounds with hair-perfect edges. Replace, blur, or export transparent.", accent: "from-amber-400 to-rose-500", samples: [0, 6, 4, 10], prompts: ["transparent PNG", "replace with white", "blur background"], useCases: ["E-commerce", "Headshots", "Product shots"] },
  { slug: "face-enhancer", name: "Face enhancer", tagline: "Subtle, never plastic.", description: "Restore detail in faces without losing identity. Especially good for archival photos.", accent: "from-pink-400 to-violet-500", samples: [3, 7, 9, 1], prompts: ["restore detail", "fix lighting", "remove compression"], useCases: ["Family archives", "Profile photos", "Press kits"] },
  { slug: "logo", name: "Logo generator", tagline: "Marks that read at every size.", description: "Marks that read at every size. Generate dozens, refine the ones you love.", accent: "from-violet-500 to-sky-500", samples: [4, 0, 8, 2], prompts: ["modern serif wordmark", "geometric monogram", "playful mascot"], useCases: ["Startup brands", "Pitch decks", "Side projects"] },
  { slug: "avatar", name: "Avatar maker", tagline: "Your face, every aesthetic.", description: "Stylized profile pictures and headshots across dozens of looks.", accent: "from-fuchsia-500 to-pink-500", samples: [5, 7, 9, 11], prompts: ["editorial b&w", "anime style", "studio lighting"], useCases: ["Social profiles", "Team pages", "Speaker decks"] },
  { slug: "anime", name: "Anime", tagline: "Mangaverse, on tap.", description: "Manga and anime aesthetics powered by Mangaverse, with sheet-style references.", accent: "from-pink-400 to-orange-400", samples: [3, 5, 8, 1], prompts: ["shonen action panel", "soft shoujo portrait", "mecha pilot"], useCases: ["Comics", "Fan art", "Character sheets"] },
  { slug: "fashion", name: "Fashion", tagline: "Lookbook in minutes.", description: "Lookbook-grade fashion editorials, on real or imagined models.", accent: "from-rose-500 to-fuchsia-500", samples: [4, 6, 0, 9], prompts: ["streetwear editorial", "haute couture", "outdoor catalog"], useCases: ["Brand lookbooks", "Mood boards", "Catalogs"] },
  { slug: "interior", name: "Interior design", tagline: "See the room before you build it.", description: "Photoreal interior renders from sketches, floorplans, or descriptions.", accent: "from-amber-400 to-emerald-500", samples: [2, 4, 6, 8], prompts: ["mid-century living room", "minimalist kitchen", "boutique hotel lobby"], useCases: ["Real estate", "Renovations", "Mood boards"] },
  { slug: "mockup", name: "Mockup generator", tagline: "Product shots, no studio.", description: "Drop your design onto realistic device, apparel, and print mockups.", accent: "from-sky-500 to-emerald-500", samples: [1, 3, 7, 9], prompts: ["iphone hero shot", "t-shirt flat lay", "business card mockup"], useCases: ["Marketing", "App store", "Etsy listings"] },
  { slug: "poster", name: "Poster", tagline: "Print-ready, frame-worthy.", description: "Editorial and event posters with type-aware composition.", accent: "from-violet-500 to-rose-500", samples: [0, 2, 4, 6], prompts: ["film festival poster", "indie band gig", "minimalist gallery"], useCases: ["Events", "Galleries", "Album art"] },
  { slug: "sticker", name: "Sticker", tagline: "Die-cut, die-perfect.", description: "Die-cut style stickers with clean transparent backgrounds.", accent: "from-emerald-400 to-amber-400", samples: [5, 7, 9, 11], prompts: ["chibi mascot", "retro logo badge", "kawaii food"], useCases: ["Merch", "Telegram packs", "Laptop swag"] },
  { slug: "thumbnail", name: "Thumbnail", tagline: "Built to be clicked.", description: "YouTube and social thumbnails with on-brand type and faces.", accent: "from-orange-400 to-rose-600", samples: [3, 6, 8, 10], prompts: ["youtube tech review", "podcast cover", "tiktok hook"], useCases: ["Creators", "Podcasters", "Marketers"] },
  { slug: "wallpaper", name: "Wallpaper", tagline: "Desktops and phones, perfectly tuned.", description: "Resolution-aware wallpapers tuned for desktop and mobile aspect ratios.", accent: "from-sky-500 to-fuchsia-500", samples: [4, 7, 1, 11], prompts: ["abstract gradient", "minimal landscape", "anime city"], useCases: ["Personal", "Brand assets", "Lock screens"] },
  { slug: "prompt-enhancer", name: "Prompt enhancer", tagline: "Rough intent in, model-ready prompt out.", description: "Turn one-liner ideas into structured, model-ready prompts.", accent: "from-violet-500 to-emerald-500", samples: [0, 5, 8, 3], prompts: ["a cool car", "a city", "a dog wearing a hat"], useCases: ["Beginners", "Speed", "A/B tests"] },
];

// ----- Admin records -----
export type AdminUser = { id: string; email: string; plan: string; credits: number; status: "active" | "suspended" | "trial" };
export const mockAdminUsers: AdminUser[] = Array.from({ length: 18 }, (_, i) => ({
  id: `u_${1000 + i}`,
  email: ["mira", "jordan", "sasha", "kai", "rin", "ev", "theo", "iris", "noa", "lev", "yuki", "zane", "ana", "ben", "cleo", "dax", "emi", "finn"][i] + "@example.com",
  plan: ["Pro", "Studio", "Free", "Pro", "Enterprise", "Pro", "Studio", "Free", "Pro", "Pro", "Free", "Studio", "Pro", "Free", "Pro", "Trial", "Pro", "Enterprise"][i],
  credits: 3000 - i * 137,
  status: (i % 7 === 0 ? "suspended" : i % 5 === 0 ? "trial" : "active") as AdminUser["status"],
}));

export type Transaction = { id: string; date: string; user: string; amount: number; status: "succeeded" | "refunded" | "pending" };
export const mockTransactions: Transaction[] = Array.from({ length: 12 }, (_, i) => ({
  id: `tx_${5000 + i}`,
  date: `May ${30 - i}, 2026`,
  user: ["mira", "jordan", "sasha", "kai", "rin", "ev", "theo", "iris", "noa", "lev", "yuki", "zane"][i] + "@example.com",
  amount: [24, 79, 24, 24, 499, 79, 24, 24, 79, 24, 0, 24][i],
  status: (i === 4 ? "pending" : i === 9 ? "refunded" : "succeeded") as Transaction["status"],
}));

export type ModerationItem = { id: string; image: string; reporter: string; reason: string; reportedAt: string };
export const mockModeration: ModerationItem[] = covers.slice(0, 8).map((c, i) => ({
  id: `mod_${i + 1}`,
  image: c,
  reporter: ["mira", "jordan", "sasha", "kai", "rin", "ev", "theo", "iris"][i] + "@example.com",
  reason: ["Spam", "Off-topic", "Copyright", "NSFW (review)", "Harassment", "Off-topic", "Copyright", "Spam"][i],
  reportedAt: `${i + 1}h ago`,
}));
