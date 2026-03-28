import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";

import { prisma } from "@/lib/prisma";
import { env } from "./env";
import { resend } from "./resend";

const secret =
  env.BETTER_AUTH_SECRET ||
  (env.NODE_ENV === "development"
    ? "development-only-secret-change-me"
    : undefined);

if (!secret) {
  throw new Error("Missing BETTER_AUTH_SECRET");
}

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL || "http://localhost:3000",
  secret,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
    // transaction: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
      scope: ["read:user", "user:email"],
    },
  },
  plugins: [
    nextCookies(),
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: "Sri LMS <onboarding@resend.dev>",
          to: [email],
          subject: "Sri LMS - Verify your email address",
          html: `<p>OTP: <strong>${otp}</strong></p>`,
        });
      },
    }),
  ],
});
