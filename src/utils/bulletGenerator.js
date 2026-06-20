const ACTION_VERBS = [
  'Developed',
  'Designed',
  'Implemented',
  'Engineered',
  'Built',
  'Optimized',
  'Created',
  'Architected',
  'Integrated',
  'Automated',
];

const TECH_CONNECTORS = ['using', 'leveraging', 'with', 'powered by', 'built with'];

const IMPACT_PHRASES = [
  'resulting in {impact}',
  'delivering {impact}',
  'achieving {impact}',
  'which {impact}',
  'to {impact}',
];

/**
 * Shuffle array using Fisher-Yates (creates a copy).
 */
function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pick(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function formatTechnologies(technologies) {
  const items = technologies
    .split(/[,;]+/)
    .map((t) => t.trim())
    .filter(Boolean);

  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

function capitalizeFirst(text) {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function ensurePeriod(text) {
  const trimmed = text.trim();
  if (!trimmed) return '';
  return trimmed.endsWith('.') ? trimmed : `${trimmed}.`;
}

function lowercaseFirst(text) {
  if (!text) return '';
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function normalizeText(text) {
  return text.trim().replace(/\.+$/, '');
}

/**
 * Build three distinct bullet point templates.
 */
function buildTemplates({ projectName, techString, buildMid, buildLead, impact }) {
  const hasImpact = Boolean(impact?.trim());
  const impactLower = lowercaseFirst(normalizeText(impact));

  const templates = [
    // Template 1: Project overview with full tech stack
    () => {
      const verb = pick(ACTION_VERBS);
      const connector = pick(TECH_CONNECTORS);
      let bullet = `${verb} ${projectName}, ${buildMid}`;
      if (techString) {
        bullet += ` ${connector} ${techString}`;
      }
      bullet = ensurePeriod(bullet);
      if (hasImpact) {
        const phrase = pick(IMPACT_PHRASES).replace('{impact}', impactLower);
        bullet = bullet.replace(/\.$/, `, ${phrase}.`);
      }
      return bullet;
    },

    // Template 2: Technical focus / pipeline emphasis
    () => {
      const verb = pick(['Engineered', 'Architected', 'Implemented', 'Built', 'Designed']);
      let bullet;
      if (techString) {
        bullet = `${verb} ${projectName} leveraging ${techString} — ${buildLead}`;
      } else {
        bullet = `${verb} ${projectName} — ${buildLead}`;
      }
      bullet = ensurePeriod(bullet);
      if (hasImpact) {
        bullet = bullet.replace(/\.$/, ` and ${impactLower}.`);
      }
      return bullet;
    },

    // Template 3: Impact / outcome oriented
    () => {
      const verb = pick(['Created', 'Delivered', 'Optimized', 'Spearheaded', 'Automated']);
      let bullet = `${verb} ${projectName} — ${buildLead}`;
      if (techString) {
        bullet += `, utilizing ${techString} for end-to-end implementation`;
      }
      bullet = ensurePeriod(bullet);
      if (hasImpact) {
        const adverb = pick(['ultimately', 'directly', 'successfully']);
        bullet = bullet.replace(/\.$/, `, ${adverb} ${impactLower}.`);
      }
      return bullet;
    },

    // Template 4: Integration / system design angle
    () => {
      const verb = pick(['Integrated', 'Architected', 'Developed', 'Built']);
      const techPart = techString
        ? ` by integrating ${techString} into a cohesive application stack`
        : ' through a well-structured full-stack implementation';
      let bullet = `${verb} ${projectName}${techPart}, enabling ${buildMid}`;
      bullet = ensurePeriod(bullet);
      if (hasImpact) {
        bullet = bullet.replace(/\.$/, ` to ${impactLower}.`);
      }
      return bullet;
    },

    // Template 5: Achievement-focused with quantifiable framing
    () => {
      const verb = pick(['Built', 'Developed', 'Engineered', 'Designed']);
      let bullet = `${verb} and deployed ${projectName}`;
      if (techString) {
        bullet += ` with ${techString}`;
      }
      bullet += `, ${buildMid}`;
      bullet = ensurePeriod(bullet);
      if (hasImpact) {
        const impactPhrase = pick(IMPACT_PHRASES).replace('{impact}', impactLower);
        bullet = bullet.replace(/\.$/, ` — ${impactPhrase}.`);
      }
      return bullet;
    },

    // Template 6: Problem-solution framing
    () => {
      const verb = pick(['Designed', 'Implemented', 'Created', 'Optimized']);
      let bullet = `${verb} ${projectName}: ${buildLead}`;
      if (techString) {
        bullet += `, powered by ${techString}`;
      }
      bullet = ensurePeriod(bullet);
      if (hasImpact) {
        bullet = bullet.replace(/\.$/, `, ${impactLower}.`);
      }
      return bullet;
    },
  ];

  return shuffle(templates).slice(0, 3);
}

/**
 * Generate three professional resume bullet points from form data.
 */
export function generateBullets({ projectName, technologies, build, impact }) {
  const name = projectName.trim();
  const techString = formatTechnologies(technologies);
  const buildNormalized = normalizeText(build);
  const buildMid = lowercaseFirst(buildNormalized);
  const buildLead = capitalizeFirst(buildNormalized);
  const impactText = impact?.trim() || '';

  const templateFns = buildTemplates({
    projectName: name,
    techString,
    buildMid,
    buildLead,
    impact: impactText,
  });

  return templateFns.map((fn) => fn());
}
