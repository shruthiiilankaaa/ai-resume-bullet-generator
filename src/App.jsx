import { useCallback, useState } from 'react';
import Hero from './components/Hero';
import ResumeForm from './components/ResumeForm';
import OutputSection from './components/OutputSection';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { generateBullets } from './utils/bulletGenerator';

const LOADING_DELAY_MS = 1000;

export default function App() {
  const [bullets, setBullets] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  const handleGenerate = (formData) => {
    setIsLoading(true);
    setProjectName(formData.projectName);

    setTimeout(() => {
      const generated = generateBullets(formData);
      setBullets(generated);
      setIsLoading(false);
      showToast('Resume bullets generated successfully!');
    }, LOADING_DELAY_MS);
  };

  const handleClear = () => {
    setBullets([]);
    setProjectName('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6">
        <Hero />

        <div className="space-y-8 pb-4">
          <ResumeForm
            onGenerate={handleGenerate}
            onClear={handleClear}
            isLoading={isLoading}
          />

          <OutputSection
            bullets={bullets}
            projectName={projectName}
            onToast={showToast}
            isLoading={isLoading}
          />
        </div>
      </main>

      <Footer />

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}
