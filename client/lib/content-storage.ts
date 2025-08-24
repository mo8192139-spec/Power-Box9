import { SiteContent, defaultSiteContent } from '@shared/admin-content-types';

const STORAGE_KEY = 'fusion-site-content';

export class ContentStorage {
  /**
   * Get all site content from localStorage
   */
  static getSiteContent(): SiteContent {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with defaults to ensure all properties exist
        return this.mergeWithDefaults(parsed);
      }
    } catch (error) {
      console.error('Error loading content from localStorage:', error);
    }
    return defaultSiteContent;
  }

  /**
   * Save all site content to localStorage
   */
  static saveSiteContent(content: SiteContent): boolean {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      return true;
    } catch (error) {
      console.error('Error saving content to localStorage:', error);
      return false;
    }
  }

  /**
   * Get specific section content
   */
  static getSectionContent<K extends keyof SiteContent>(section: K): SiteContent[K] {
    const content = this.getSiteContent();
    return content[section];
  }

  /**
   * Update specific section content
   */
  static updateSectionContent<K extends keyof SiteContent>(
    section: K,
    sectionContent: SiteContent[K]
  ): boolean {
    try {
      const content = this.getSiteContent();
      content[section] = sectionContent;
      return this.saveSiteContent(content);
    } catch (error) {
      console.error('Error updating section content:', error);
      return false;
    }
  }

  /**
   * Reset all content to defaults
   */
  static resetContent(): boolean {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error resetting content:', error);
      return false;
    }
  }

  /**
   * Export content as JSON
   */
  static exportContent(): string {
    const content = this.getSiteContent();
    return JSON.stringify(content, null, 2);
  }

  /**
   * Import content from JSON
   */
  static importContent(jsonContent: string): boolean {
    try {
      const content = JSON.parse(jsonContent);
      const mergedContent = this.mergeWithDefaults(content);
      return this.saveSiteContent(mergedContent);
    } catch (error) {
      console.error('Error importing content:', error);
      return false;
    }
  }

  /**
   * Merge stored content with defaults to handle missing properties
   */
  private static mergeWithDefaults(stored: Partial<SiteContent>): SiteContent {
    const merged: SiteContent = { ...defaultSiteContent };

    // Deep merge each section
    if (stored.hero) {
      merged.hero = { ...defaultSiteContent.hero, ...stored.hero };
    }

    if (stored.benefits) {
      merged.benefits = {
        ...defaultSiteContent.benefits,
        ...stored.benefits,
        benefits: stored.benefits.benefits || defaultSiteContent.benefits.benefits
      };
    }

    if (stored.trust) {
      merged.trust = { ...defaultSiteContent.trust, ...stored.trust };
    }

    if (stored.gallery) {
      merged.gallery = {
        ...defaultSiteContent.gallery,
        ...stored.gallery,
        images: stored.gallery.images || defaultSiteContent.gallery.images
      };
    }

    if (stored.reviews) {
      merged.reviews = {
        ...defaultSiteContent.reviews,
        ...stored.reviews,
        reviews: stored.reviews.reviews || defaultSiteContent.reviews.reviews
      };
    }

    if (stored.finalCTA) {
      merged.finalCTA = {
        ...defaultSiteContent.finalCTA,
        ...stored.finalCTA,
        benefits: stored.finalCTA.benefits || defaultSiteContent.finalCTA.benefits
      };
    }

    if (stored.footer) {
      merged.footer = {
        ...defaultSiteContent.footer,
        ...stored.footer,
        socialLinks: stored.footer.socialLinks || defaultSiteContent.footer.socialLinks
      };
    }

    return merged;
  }

  /**
   * Check if content has been modified from defaults
   */
  static hasCustomContent(): boolean {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored !== null;
  }

  /**
   * Get content change timestamp
   */
  static getLastModified(): Date | null {
    try {
      const timestamp = localStorage.getItem(`${STORAGE_KEY}_timestamp`);
      return timestamp ? new Date(parseInt(timestamp)) : null;
    } catch {
      return null;
    }
  }

  /**
   * Update timestamp when content is saved
   */
  private static updateTimestamp(): void {
    try {
      localStorage.setItem(`${STORAGE_KEY}_timestamp`, Date.now().toString());
    } catch {
      // Ignore timestamp errors
    }
  }
}

// Override saveSiteContent to include timestamp
const originalSave = ContentStorage.saveSiteContent;
ContentStorage.saveSiteContent = function(content: SiteContent): boolean {
  const result = originalSave.call(this, content);
  if (result) {
    ContentStorage['updateTimestamp']();
  }
  return result;
};
