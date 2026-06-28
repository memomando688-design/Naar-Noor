/** Configuration object passed to SeoService.set() */
export interface SeoConfig {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
}
