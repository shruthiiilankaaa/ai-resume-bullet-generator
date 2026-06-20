import { Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <header className="text-center pt-12 pb-8 px-4 animate-fade-in">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-accent/10 border border-accent/20 text-accent-light text-sm font-medium">
        <Sparkles className="w-4 h-4" />
        <span>Portfolio Project</span>
      </div>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
          AI Resume Bullet Generator
        </span>
      </h1>

      <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
        Turn your project descriptions into professional, achievement-focused resume bullet points.
      </p>
    </header>
  );
}
