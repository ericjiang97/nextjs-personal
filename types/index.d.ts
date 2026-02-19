import moment, { Moment } from "moment";

type Nullable<T> = T | null;

export declare interface Project {
  url: string;
  imageUrl?: string;
  repoUrl?: string;
  name: string;
  description: string;
  screenshotUrl?: string;
}

export declare interface ExperiencePosition {
  title: string;
  dates: {
    startDate: Moment;
    endDate?: Moment;
  };
  description?: string[];
}

export declare interface Experience {
  company: string;
  companyUrl: string;
  positions: ExperiencePosition[];
}

export type IPrismicDocumentRecord = PrismicDocument<
  Record<string, any>,
  string,
  string
>;

export declare interface Talk {
  slug: Nullable<string>;
  date: string;
  org: Nullable<string>;
  title?: Nullable<string>;
  url?: Nullable<string>;
}


export declare interface CustomRuntimeConfig {
  version: string;
}