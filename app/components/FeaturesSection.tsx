import { Sparkles, Clock, Shield, TrendingUp, Zap, BookOpen } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Quick reads designed for busy minds. Get fascinating insights in under 5 minutes.",
    gradient: "from-yellow-400 to-orange-500",
    bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
  },
  {
    icon: Shield,
    title: "Fact-Checked",
    description: "Every fact is thoroughly verified by our editorial team with credible sources.",
    gradient: "from-blue-400 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
  },
  {
    icon: Sparkles,
    title: "Mind-Blowing Content",
    description: "Discover surprising facts that challenge your understanding of the world.",
    gradient: "from-purple-400 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
  },
  {
    icon: TrendingUp,
    title: "Always Fresh",
    description: "Daily updates with trending topics and the latest discoveries.",
    gradient: "from-green-400 to-emerald-500",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
  },
  {
    icon: BookOpen,
    title: "Diverse Topics",
    description: "From science to history, psychology to technology - we cover it all.",
    gradient: "from-indigo-400 to-purple-500",
    bgColor: "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20",
  },
  {
    icon: Clock,
    title: "Bite-Sized Learning",
    description: "Perfect for coffee breaks, commutes, or whenever curiosity strikes.",
    gradient: "from-rose-400 to-red-500",
    bgColor: "bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20",
  },
];

export default function FeaturesSection() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
          Why Choose{" "}
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            CurioSpark
          </span>
          ?
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Your trusted source for fascinating facts, backed by research and designed for the curious mind
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className={`bento-card p-6 md:p-8 ${feature.bgColor} group hover:scale-[1.02] cursor-pointer`}
            >
              <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Stats Bar */}
      <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        <div className="text-center p-4">
          <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            10K+
          </div>
          <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
            Fascinating Facts
          </div>
        </div>
        <div className="text-center p-4">
          <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            50K+
          </div>
          <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
            Daily Readers
          </div>
        </div>
        <div className="text-center p-4">
          <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            100%
          </div>
          <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
            Fact-Checked
          </div>
        </div>
        <div className="text-center p-4">
          <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
            24/7
          </div>
          <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
            New Content
          </div>
        </div>
      </div>
    </section>
  );
}
