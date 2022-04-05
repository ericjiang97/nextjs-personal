export interface Donation {
  Date: string;
  Category: string;
  Amount: number;
  Fund: string;
  Matched: boolean;
  "Employer Matched": boolean;
  "Tax Deductible (Aus)": boolean;
  Logo: string;
}

export type DonationsByMonth = {
  [key: string]: {
    donated: number;
    matched: number;
  };
};
