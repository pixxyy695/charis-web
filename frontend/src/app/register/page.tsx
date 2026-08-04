"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Navbar } from "@/components/landing/Navbar";

const schema = z
  .object({
    name: z.string().min(2, "Enter your full name"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "At least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registerUser = useAuthStore((s) => s.register);
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
      await registerUser(values.name, values.email, values.password);
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
          <div className="text-xs font-medium uppercase tracking-[0.28em] text-gold">Begin here</div>
          <h1 className="mt-3 font-display text-3xl font-normal text-warmwhite">Create your account</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5" noValidate>
            <div>
              <label htmlFor="name" className="mb-2 block text-xs text-muted">
                Full name
              </label>
              <input
                id="name"
                {...register("name")}
                className="w-full rounded-sm border border-white/[0.1] bg-charcoal px-4 py-3 text-sm text-cream focus:border-gold-soft focus:outline-none"
                placeholder="Eleanor Hart"
              />
              {errors.name && <p className="mt-1.5 text-xs text-[#E8A9A9]">{errors.name.message}</p>}
            </div>

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
                  placeholder="At least 8 characters"
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

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-xs text-muted">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className="w-full rounded-sm border border-white/[0.1] bg-charcoal px-4 py-3 text-sm text-cream focus:border-gold-soft focus:outline-none"
                placeholder="Repeat your password"
              />
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-[#E8A9A9]">{errors.confirmPassword.message}</p>
              )}
            </div>

            {formError && <p className="text-xs text-[#E8A9A9]">{formError}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 rounded-sm bg-gold py-3 text-sm font-semibold tracking-wide text-charcoal transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
            >
              {isSubmitting ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link href="/login" className="text-gold-soft hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
