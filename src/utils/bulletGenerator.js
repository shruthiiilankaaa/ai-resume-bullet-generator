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

const IMPACT_PHRASES = [
  'resulting in {impact}',
  'leading to {impact}',
  'contributing to {impact}',
  'thereby achieving {impact}',
];

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
    .map((item) => item.trim())
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

function lowercaseFirst(text) {
  if (!text) return '';
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function normalizeText(text) {
  return text.trim().replace(/\.+$/, '');
}

function ensurePeriod(text) {
  const trimmed = text.trim();

  if (!trimmed) return '';

  return trimmed.endsWith('.') ? trimmed : `${trimmed}.`;
}

function buildImpact(impact) {
  if (!impact?.trim()) return '';

  const phrase = pick(IMPACT_PHRASES);
  return phrase.replace('{impact}', lowercaseFirst(normalizeText(impact)));
}

function buildTemplates({
  projectName,
  techString,
  buildLead,
  buildMid,
  impact,
}) {
  const impactText = buildImpact(impact);

  const templates = [
    // Template 1
    () => {
      const verb = pick(ACTION_VERBS);

      let bullet = `${verb} ${projectName}, ${buildMid}`;

      if (techString) {
        bullet += ` using ${techString}`;
      }

      if (impactText) {
        bullet += `, ${impactText}`;
      }

      return ensurePeriod(bullet);
    },

    // Template 2
    () => {
      const verb = pick([
        'Engineered',
        'Architected',
        'Implemented',
        'Designed',
      ]);

      let bullet = `${verb} an end-to-end solution`;

      if (techString) {
        bullet += ` using ${techString}`;
      }

      bullet += ` to build ${projectName}, ${buildMid}`;

      if (impactText) {
        bullet += `, ${impactText}`;
      }

      return ensurePeriod(bullet);
    },

    // Template 3
    () => {
      let bullet = '';

      if (techString) {
        bullet = `Leveraged ${techString} to create ${projectName}, enabling ${buildMid}`;
      } else {
        bullet = `Created ${projectName}, enabling ${buildMid}`;
      }

      if (impactText) {
        bullet += `, ${impactText}`;
      }

      return ensurePeriod(bullet);
    },

    // Template 4
    () => {
      const verb = pick([
        'Built',
        'Developed',
        'Implemented',
        'Integrated',
      ]);

      let bullet = `${verb} ${buildLead}`;

      if (techString) {
        bullet += ` with ${techString}`;
      }

      bullet += ` as part of ${projectName}`;

      if (impactText) {
        bullet += `, ${impactText}`;
      }

      return ensurePeriod(bullet);
    },

    // Template 5
    () => {
      const verb = pick([
        'Designed',
        'Architected',
        'Developed',
        'Created',
      ]);

      let bullet = `${verb} ${projectName} as ${buildMid}`;

      if (techString) {
        bullet += ` by leveraging ${techString}`;
      }

      if (impactText) {
        bullet += `, ${impactText}`;
      }

      return ensurePeriod(bullet);
    },

    // Template 6
    () => {
      const verb = pick([
        'Engineered',
        'Built',
        'Developed',
        'Optimized',
      ]);

      let bullet = `${verb} a scalable solution for ${buildMid}`;

      if (techString) {
        bullet += ` using ${techString}`;
      }

      if (projectName) {
        bullet += ` under the project ${projectName}`;
      }

      if (impactText) {
        bullet += `, ${impactText}`;
      }

      return ensurePeriod(bullet);
    },
  ];

  return shuffle(templates).slice(0, 3);
}

export function generateBullets({
  projectName,
  technologies,
  build,
  impact,
}) {
  const name = projectName.trim();
  const techString = formatTechnologies(technologies);

  const buildNormalized = normalizeText(build);
  const buildLead = capitalizeFirst(buildNormalized);
  const buildMid = lowercaseFirst(buildNormalized);

  const templates = buildTemplates({
    projectName: name,
    techString,
    buildLead,
    buildMid,
    impact: impact?.trim() || '',
  });

  return templates.map((template) => template());
}