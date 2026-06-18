export type PlanKey = "free" | "pro" | "studio" | "enterprise";
export type GenerationStatus = "queued" | "processing" | "succeeded" | "failed" | "refunded";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type AspectRatio = "1:1" | "2:3" | "3:2" | "4:3" | "16:9" | "9:16";
export type AiProvider = "fal" | "replicate";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  plan: PlanKey;
  credits: number;
  role: "creator" | "admin";
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
};

export type AiModel = {
  id: string;
  slug: string;
  name: string;
  provider: AiProvider;
  provider_model: string;
  category: string;
  cost_credits: number;
  supported_aspect_ratios: AspectRatio[];
  enabled: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
};

export type Generation = {
  id: string;
  user_id: string;
  model_id: string | null;
  prompt: string;
  negative_prompt: string | null;
  aspect_ratio: AspectRatio;
  quantity: number;
  provider: AiProvider;
  provider_job_id: string | null;
  status: GenerationStatus;
  credits_charged: number;
  error: string | null;
  created_at: string;
  completed_at: string | null;
};

export type GeneratedAsset = {
  id: string;
  generation_id: string;
  user_id: string;
  storage_path: string | null;
  url: string;
  width: number | null;
  height: number | null;
  seed: number | null;
  is_public: boolean;
  created_at: string;
};

export type GenerationWithAssets = Generation & {
  ai_models?: Pick<AiModel, "name" | "slug" | "cost_credits"> | null;
  generated_assets: GeneratedAsset[];
};

export type CreditLedgerEntry = {
  id: string;
  user_id: string;
  amount: number;
  reason: string;
  generation_id: string | null;
  stripe_event_id: string | null;
  created_at: string;
};

export type Payment = {
  id: string;
  user_id: string | null;
  stripe_customer_id: string | null;
  stripe_session_id: string | null;
  stripe_subscription_id: string | null;
  amount_cents: number;
  credits: number;
  status: PaymentStatus;
  created_at: string;
};

export type Plan = {
  id: PlanKey;
  name: string;
  description: string | null;
  monthly_price_cents: number;
  monthly_credits: number;
  stripe_price_id: string | null;
  features: string[];
  active: boolean;
  created_at: string;
};
