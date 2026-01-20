const API_BASE_URL =
  'https://api-portfolio-b0grhhf9d9egeubq.canadacentral-01.azurewebsites.net/api/';

async function apiGet(path) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API error ${res.status}: ${text || res.statusText}`);
  }

  return res.json();
}

export async function getContent(locale) {
  const safeLocale = locale === 'pt' ? 'pt' : 'en';
  return apiGet(`/content?locale=${safeLocale}`);
}

export async function getProjects(locale) {
  const safeLocale = locale === 'pt' ? 'pt' : 'en';
  return apiGet(`/projects?locale=${safeLocale}`);
}

//

export function normalizeContent(raw) {
  const content = raw || {};

  const icons = Array.isArray(content.icons) ? content.icons.slice() : [];
  icons.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  return {
    profilePicFullPath: content.profilePicFullPath || '',
    profilePicSmallPath: content.profilePicSmallPath || '',
    resumePath: content.resumePath || '',
    headline: content.headline || '',
    educationText: content.educationText || '',
    experienceText: content.experienceText || '',
    icons,
    updatedAt: content.updatedAt || null,
  };
}

export function normalizeProjects(payload) {
  const raw = Array.isArray(payload?.projects) ? payload.projects : [];

  const projects = raw
    .filter((p) => p && p.isActive !== false)
    .map((p) => {
      const images = (Array.isArray(p.images) ? p.images : [])
        .slice()
        .sort((a, b) => (a?.sortOrder ?? 0) - (b?.sortOrder ?? 0))
        .map((img) => ({
          id: img?.id || '',
          imagePath: img?.imagePath || '',
          sortOrder: img?.sortOrder ?? 0,
        }));

      const links = (Array.isArray(p.links) ? p.links : [])
        .slice()
        .sort((a, b) => (a?.sortOrder ?? 0) - (b?.sortOrder ?? 0))
        .map((l) => ({
          id: l?.id || '',
          label: l?.label || '',
          url: l?.url || '',
          kind: l?.kind || '',
          sortOrder: l?.sortOrder ?? 0,
        }));

      return {
        id: p?.id || '',
        sortOrder: p?.sortOrder ?? 0,
        title: p?.title || '',
        description: p?.description || '',
        images,
        links,
        isActive: p?.isActive !== false,
      };
    })
    .sort((a, b) => (a?.sortOrder ?? 0) - (b?.sortOrder ?? 0));

  return { projects };
}
