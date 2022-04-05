const config = {
  PRISMIC: {
    token: process.env.PRISMIC_TOKEN,
  },
  AIRTABLE: {
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API,
    tableId: process.env.NEXT_PUBLIC_AIRTABLE_TABLE_ID,
  },
};

export default config;
