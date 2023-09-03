import moment, { Moment } from "moment";

type Nullable<T> = T | null;
export interface Project {
  url: string;
  imageUrl?: string;
  repoUrl?: string;
  name: string;
  description: string;
  screenshotUrl?: string;
}

export interface ExperiencePosition {
  title: string;
  dates: {
    startDate: Moment;
    endDate?: Moment;
  };
  description?: string[];
}

export interface Experience {
  company: string;
  companyUrl: string;
  positions: ExperiencePosition[];
}

export type IPrismicDocumentRecord = PrismicDocument<
  Record<string, any>,
  string,
  string
>;

export interface Talk {
  slug: Nullable<string>;
  date: string;
  org: Nullable<string>;
  title?: Nullable<string>;
  url?: Nullable<string>;
}


export interface CustomRuntimeConfig {
  version: string;
}