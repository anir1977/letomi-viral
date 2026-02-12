'use client';

import { useState } from "react";

export default function HomeNewsletterCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      return;
    }
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="relative z-10">
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
        Newsletter
      </span>
      <h2 className="mt-3 text-2xl md:text-4xl font-bold [text-shadow:0_3px_14px_rgba(0,0,0,0.4)]">
        Never Stop Learning
      </h2>
      <p className="mt-3 text-base md:text-xl text-white/90 [text-shadow:0_2px_10px_rgba(0,0,0,0.35)]">
        Get daily curiosities delivered to your inbox
      </p>

      {submitted ? (
        <div className="mt-6 rounded-2xl bg-white/15 px-6 py-4 text-sm md:text-base text-white/95 animate-fade-in-up">
          Thanks for subscribing. Welcome to CurioSpark.
        </div>
      ) : (
        <form
          className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-full bg-white/95 px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base text-slate-900 placeholder:text-slate-500 shadow-sm focus:outline-none focus:ring-4 focus:ring-white/40"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <button
            type="submit"
            className="rounded-full bg-slate-900/90 px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-900"
          >
            Subscribe
          </button>
        </form>
      )}

      <p className="mt-4 text-xs text-white/80">
        Questions? <a className="underline" href="mailto:info@curiospark.org">info@curiospark.org</a>
      </p>
    </div>
  );
}
