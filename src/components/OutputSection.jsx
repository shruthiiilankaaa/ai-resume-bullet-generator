import { Copy, Download, FileText } from 'lucide-react';
import BulletCard from './BulletCard';
import { downloadTxt } from '../utils/downloadTxt';

export default function OutputSection({ bullets, projectName, onToast, isLoading }) {
  if (isLoading) {
    return (
      <section className="glass-card p-8 animate-fade-in">
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
          </div>
          <p className="text-gray-400 text-sm animate-pulse">
            Crafting professional bullet points...
          </p>
        </div>
      </section>
    );
  }

  if (!bullets || bullets.length === 0) {
    return (
      <section className="glass-card p-8 animate-fade-in">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="w-12 h-12 text-gray-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-400 mb-2">No bullets yet</h3>
          <p className="text-sm text-gray-500 max-w-sm">
            Fill in your project details and click Generate Bullets to create professional resume points.
          </p>
        </div>
      </section>
    );
  }

  const handleCopyAll = async () => {
    const text = bullets.map((b) => `• ${b}`).join('\n\n');
    try {
      await navigator.clipboard.writeText(text);
      onToast('All bullets copied to clipboard!');
    } catch {
      onToast('Failed to copy. Please try again.', 'error');
    }
  };

  const handleDownload = () => {
    downloadTxt(bullets, projectName);
    onToast('Downloaded as TXT file!');
  };

  return (
    <section className="glass-card p-6 sm:p-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-accent-light" />
          Generated Bullets
        </h2>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={handleCopyAll} className="btn-secondary text-sm py-2 px-4">
            <Copy className="w-4 h-4" />
            Copy All
          </button>
          <button type="button" onClick={handleDownload} className="btn-secondary text-sm py-2 px-4">
            <Download className="w-4 h-4" />
            Download TXT
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {bullets.map((bullet, index) => (
          <BulletCard key={`${index}-${bullet.slice(0, 20)}`} bullet={bullet} index={index} onCopy={onToast} />
        ))}
      </div>
    </section>
  );
}
