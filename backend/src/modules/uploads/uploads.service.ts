import crypto from "crypto";

import { cloudinary } from "../../config/cloudinary";
import { env } from "../../config/env";
import { AppError } from "../../shared/errors/app-error";

export async function createSignedUpload(
  userId: string,
  input: { folder: string; purpose: string },
) {
  if (!env.CLOUDINARY_API_SECRET || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_CLOUD_NAME) {
    throw new AppError("Cloudinary is not configured", 503, "CLOUDINARY_NOT_CONFIGURED");
  }

  const timestamp = Math.round(Date.now() / 1000);
  const folder = `${input.folder}/${userId}`;
  const signature = cloudinary.utils.api_sign_request(
    {
      folder,
      timestamp,
    },
    env.CLOUDINARY_API_SECRET,
  );

  return {
    cloudName: env.CLOUDINARY_CLOUD_NAME,
    apiKey: env.CLOUDINARY_API_KEY,
    timestamp,
    folder,
    signature,
    uploadPreset: undefined,
    nonce: crypto.randomUUID(),
    purpose: input.purpose,
  };
}

