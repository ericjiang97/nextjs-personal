
export interface Project {
    url: string;
    imageUrl?: string;
    repoUrl?: string;
    name: string;
    description: string;
    screenshotUrl?: string;
  }

export type IPrismicDocumentRecord = PrismicDocument<Record<string, any>, string, string>;