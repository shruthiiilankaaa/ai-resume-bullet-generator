import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function BulletCard({ bullet, index, onCopy }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`• ${bullet}`);
      setCopied(true);
      onCopy?.('Bullet copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onCopy?.('Failed to copy. Please try again.', 'error');
    }
  };

  return (
    <div
      className="glass-card p-5 flex gap-4 items-start group hover:border-accent/30 transition-all duration-300 animate-fade-in-up opacity-0"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/20 text-accent-light flex items-center justify-center text-sm font-bold">
        {index + 1}
      </span>

      <p className="flex-1 text-gray-200 leading-relaxed text-sm sm:text-base">
        <span className="text-accent-light mr-1">•</span>
        {bullet}
      </p>

      <button
        type="button"
        onClick={handleCopy}
        className="btn-ghost flex-shrink-0 opacity-60 group-hover:opacity-100"
        aria-label={`Copy bullet ${index + 1}`}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
