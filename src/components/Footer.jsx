import { ExternalLink, Mail, User } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 pb-10 px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto glass-card p-8 text-center">
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="flex items-center gap-2 text-white font-semibold text-lg">
            <User className="w-5 h-5 text-accent-light" />
            Shruthi Lanka
          </div>
          <a
            href="mailto:lshruthi120506@gmail.com"
            className="flex items-center gap-2 text-gray-400 hover:text-accent-light transition-colors duration-200"
          >
            <Mail className="w-4 h-4" />
            lshruthi120506@gmail.com
          </a>
        </div>

        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-glow-sm hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5"
        >
          Built for Digital Heroes
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </footer>
  );
}
