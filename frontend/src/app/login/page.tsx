"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Navbar } from "@/components/landing/Navbar";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
  remember: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-charcoal text-cream">Loading…</div>}>
      <LoginPageContent />
    </Suspense>
  );
}

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((s) => s.login);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const redirectTo = useMemo(() => {
    const nextPath = searchParams.get("next");
    if (nextPath && nextPath.startsWith("/") && !nextPath.startsWith("//")) {
      return nextPath;
    }
    return "/consultation";
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setFormError(null);
    try {
      await login(values.email, values.password);
      router.push(redirectTo);
    } catch (err) {
      setFormError((err as Error).message);
    }
  }

  return (
    <main className="min-h-screen bg-charcoal">
      <Navbar />
      <div className="flex min-h-screen items-center justify-center px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[420px] rounded-md border border-white/[0.08] bg-[#221A1D] p-10"
        >
          <div className="text-xs font-medium uppercase tracking-[0.28em] text-gold">Welcome back</div>
          <h1 className="mt-3 font-display text-3xl font-normal text-warmwhite">Sign in to CHARIS</h1>

          <button
            type="button"
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-sm border border-white/[0.12] py-3 text-sm text-cream transition-colors hover:border-gold-soft"
          >
            <GoogleMark />
            Continue with Google
          </button>

          <div className="my-7 flex items-center gap-4 text-[11px] uppercase tracking-widest text-muted">
            <span className="h-px flex-1 bg-white/[0.08]" />
            or
            <span className="h-px flex-1 bg-white/[0.08]" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
            <div>
              <label htmlFor="email" className="mb-2 block text-xs text-muted">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full rounded-sm border border-white/[0.1] bg-charcoal px-4 py-3 text-sm text-cream focus:border-gold-soft focus:outline-none"
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="mt-1.5 text-xs text-[#E8A9A9]">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-xs text-muted">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="w-full rounded-sm border border-white/[0.1] bg-charcoal px-4 py-3 pr-11 text-sm text-cream focus:border-gold-soft focus:outline-none"
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-cream"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-[#E8A9A9]">{errors.password.message}</p>}
            </div>

            <label className="flex items-center gap-2 text-xs text-muted">
              <input type="checkbox" {...register("remember")} className="accent-gold" />
              Remember me
            </label>

            {formError && <p className="text-xs text-[#E8A9A9]">{formError}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 rounded-sm bg-gold py-3 text-sm font-semibold tracking-wide text-charcoal transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
            >
              {isSubmitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-muted">
            New to CHARIS?{" "}
            <Link href="/register" className="text-gold-soft hover:underline">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}

function GoogleMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.2.8 3.9 1.5l2.6-2.5C16.9 3.4 14.7 2.5 12 2.5 6.9 2.5 2.7 6.7 2.7 11.9S6.9 21.3 12 21.3c6.9 0 9.1-4.8 9.1-7.3 0-.5-.05-.9-.13-1.3H12z"/>
    </svg>
  );
}
