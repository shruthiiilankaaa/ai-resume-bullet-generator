/**
 * Trigger a browser download of bullet points as a plain-text file.
 */
export function downloadTxt(bullets, projectName = 'resume-bullets') {
  const sanitizedName = projectName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'resume-bullets';

  const content = bullets.map((b) => `• ${b}`).join('\n\n');
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${sanitizedName}-bullets.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
