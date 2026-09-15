const isLocalDevelopment = ['localhost', '127.0.0.1'].includes(
  window.location.hostname,
);

const API_BASE_URL = isLocalDevelopment
  ? 'http://localhost:3000/api'
  : 'https://portfolio-api-production-5f26.up.railway.app/api';

async function apiGet(path) {
  const res = await fetch(`${API_BASE_URL}${path}`);

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

function withCacheVersion(url, version) {
  if (!url || !version) return url || '';

  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${encodeURIComponent(version)}`;
}

export function normalizeContent(raw) {
  const content = raw || {};

  const icons = Array.isArray(content.icons) ? content.icons.slice() : [];
  icons.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  return {
    profilePicFullPath: withCacheVersion(
      content.profilePicFullPath,
      content.updatedAt,
    ),
    profilePicSmallPath: withCacheVersion(
      content.profilePicSmallPath,
      content.updatedAt,
    ),
    resumePath: withCacheVersion(content.resumePath, content.updatedAt),
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
