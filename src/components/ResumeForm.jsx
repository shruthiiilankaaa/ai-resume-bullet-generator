import { useState } from 'react';
import { Loader2, Sparkles, Trash2 } from 'lucide-react';

const MAX_CHARS = 500;

const INITIAL_FORM = {
  projectName: '',
  technologies: '',
  build: '',
  impact: '',
};

function CharCounter({ value, max = MAX_CHARS }) {
  const count = value.length;
  const isNearLimit = count > max * 0.85;

  return (
    <span className={`text-xs ${isNearLimit ? 'text-amber-400' : 'text-gray-500'}`}>
      {count}/{max}
    </span>
  );
}

function FormField({ label, id, value, onChange, placeholder, required = false, rows = 1 }) {
  const InputTag = rows > 1 ? 'textarea' : 'input';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-gray-300">
          {label}
          {required && <span className="text-accent-light ml-1">*</span>}
        </label>
        <CharCounter value={value} />
      </div>
      <InputTag
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={MAX_CHARS}
        rows={rows > 1 ? rows : undefined}
        className={`glass-input ${rows > 1 ? 'resize-none min-h-[100px]' : ''}`}
      />
    </div>
  );
}

export default function ResumeForm({ onGenerate, onClear, isLoading }) {
  const [form, setForm] = useState(INITIAL_FORM);

  const isValid =
    form.projectName.trim() &&
    form.technologies.trim() &&
    form.build.trim();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid || isLoading) return;
    onGenerate(form);
  };

  const handleClear = () => {
    setForm(INITIAL_FORM);
    onClear();
  };

  return (
    <section className="glass-card p-6 sm:p-8 animate-fade-in-up">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-accent-light" />
        Project Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField
          label="Project Name"
          id="projectName"
          value={form.projectName}
          onChange={handleChange}
          placeholder="e.g., MedIntel AI"
          required
        />

        <FormField
          label="Technologies Used"
          id="technologies"
          value={form.technologies}
          onChange={handleChange}
          placeholder="e.g., FastAPI, LangChain, Supabase, PostgreSQL"
          required
        />

        <FormField
          label="What did you build?"
          id="build"
          value={form.build}
          onChange={handleChange}
          placeholder="Describe the system, feature, or product you created..."
          required
          rows={3}
        />

        <FormField
          label="Impact / Results"
          id="impact"
          value={form.impact}
          onChange={handleChange}
          placeholder="e.g., Reduced document search time and improved information accessibility"
          rows={2}
        />

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="btn-primary flex-1 sm:flex-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Bullets
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="btn-secondary flex-1 sm:flex-none"
          >
            <Trash2 className="w-5 h-5" />
            Clear Form
          </button>
        </div>
      </form>
    </section>
  );
}
