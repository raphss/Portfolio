/* eslint-disable no-plusplus */
function extractIconName(iconPath) {
  if (!iconPath) return '';

  const file = iconPath.split('?')[0].split('/').pop() || '';
  const base = file.replace(/\.[^.]+$/, '');

  const parts = base.split('_');
  return parts[parts.length - 1] || '';
}

function about(content, t) {
  const aboutSection = document.createElement('section');
  aboutSection.classList.add('section', 'about-section', 'hidden');

  const academicH2 = document.createElement('h2');
  academicH2.classList.add('section-title');
  academicH2.textContent = t.about.educationTitle;

  const academicP = document.createElement('p');
  academicP.classList.add('section-text');
  academicP.textContent = content?.educationText || '';

  const experienceH2 = document.createElement('h2');
  experienceH2.classList.add('section-title');
  experienceH2.textContent = t.about.experienceTitle;

  const experienceP = document.createElement('p');
  experienceP.classList.add('section-text');
  experienceP.textContent = content?.experienceText || '';

  const toolsH2 = document.createElement('h2');
  toolsH2.classList.add('section-title');
  toolsH2.textContent = t.about.skillsTitle;

  const toolsDiv = document.createElement('div');
  toolsDiv.classList.add('tools');

  const icons = (content?.icons || [])
    .slice()
    .sort((a, b) => (a?.sortOrder ?? 0) - (b?.sortOrder ?? 0));

  for (let i = 0; i < icons.length; i++) {
    const toolDiv = document.createElement('div');
    toolDiv.classList.add('tool');

    const img = document.createElement('img');
    img.src = icons[i].iconPath;
    img.loading = 'lazy';

    const iconName = extractIconName(icons[i].iconPath);
    img.title = iconName;
    img.alt = iconName || 'tool';

    toolDiv.appendChild(img);
    toolsDiv.appendChild(toolDiv);
  }

  aboutSection.append(
    academicH2,
    academicP,
    experienceH2,
    experienceP,
    toolsH2,
    toolsDiv,
  );

  return aboutSection;
}

export default about;
