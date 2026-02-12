'use client';

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200/70 dark:border-emerald-700/60 p-6 text-emerald-800 dark:text-emerald-100">
        Thanks for reaching out. Your message has been received and we'll respond shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2" htmlFor="contact-name">
            Full name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-purple-200/60 dark:focus:ring-purple-500/30"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2" htmlFor="contact-email">
            Email address
          </label>
          <input
            id="contact-email"
            type="email"
            required
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-purple-200/60 dark:focus:ring-purple-500/30"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2" htmlFor="contact-subject">
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          required
          className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-purple-200/60 dark:focus:ring-purple-500/30"
          placeholder="How can we help?"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={6}
          className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-purple-200/60 dark:focus:ring-purple-500/30"
          placeholder="Write your message..."
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-white font-semibold shadow-lg transition hover:-translate-y-0.5 hover:shadow-purple-500/40"
      >
        Send message
      </button>
    </form>
  );
}
