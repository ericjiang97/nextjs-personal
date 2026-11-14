import { Moment } from 'moment'

export type Nullable<T> = T | null

export interface Project {
  url: string
  imageUrl?: string | null
  repoUrl?: string | null
  name: string
  description: string
  screenshotUrl?: string | null
}

export interface ExperiencePosition {
  title: string
  dates: {
    startDate: Moment
    endDate?: Moment
  }
  description?: string[]
}

export interface Experience {
  company: string
  companyUrl: string
  positions: ExperiencePosition[]
}

export interface Talk {
  slug: Nullable<string>
  date: string
  org: Nullable<string>
  title?: Nullable<string>
  url?: Nullable<string>
}

export interface CustomRuntimeConfig {
  version: string
}
