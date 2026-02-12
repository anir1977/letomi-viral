'use client';

import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Science Enthusiast",
    content: "CurioSpark has become my daily go-to for learning. The bite-sized facts are perfect for my morning routine!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Michael Chen",
    role: "Teacher",
    content: "I use CurioSpark content in my classroom. My students are always excited to learn these fascinating facts!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=13",
  },
  {
    name: "Emily Rodriguez",
    role: "Content Creator",
    content: "The quality and accuracy of the facts here are outstanding. A must-read for anyone curious about the world.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=5",
  },
];

const trustBadges = [
  { label: "Fact-Checked Content", icon: "✓" },
  { label: "Daily Updates", icon: "🔄" },
  { label: "Expert Curated", icon: "👨‍🔬" },
  { label: "Ad-Free Reading", icon: "🚫" },
];

export default function TrustSection() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-purple-50/30 dark:from-gray-900 dark:to-purple-900/10 py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16 md:mb-20">
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 md:px-6 py-2.5 md:py-3 rounded-full shadow-soft border border-gray-100 dark:border-gray-700"
            >
              <span className="text-lg md:text-xl">{badge.icon}</span>
              <span className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300">
                {badge.label}
              </span>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
            Loved by{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Curious Minds
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Join thousands of readers who trust CurioSpark for their daily dose of knowledge
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-medium hover:shadow-strong transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:-translate-y-1"
            >
              <Quote className="w-8 h-8 md:w-10 md:h-10 text-purple-400 mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-sm md:text-base italic">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden ring-2 ring-purple-400 ring-offset-2">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                    {testimonial.name}
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rating Summary */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 px-6 md:px-8 py-3 md:py-4 rounded-full shadow-soft border border-gray-100 dark:border-gray-700">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 md:w-6 md:h-6 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 ml-2">
              4.9/5 from 2,500+ readers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
