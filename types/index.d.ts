export interface ExperiencePosition {
  title: string;
  dates: string;
}

export interface Experience {
  company: string;
  companyUrl: string;
  positions: ExperiencePosition[];
  description: string[];
}
