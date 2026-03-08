import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://invook.ai'; // Primary domain

  const staticRoutes = [
    '',
    '/explore',
    '/changelog',
    '/download',
    '/pricing',
    '/contact-us',
    '/privacy-policy',
    '/sign-in',
    '/sign-up',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return staticRoutes;
}
