import config from "../config";
import { Donation } from "../types/Philanthropy";

export const getPhilanthropyData = (): Promise<Donation[]> => {
  const headers = new Headers();

  if (config.AIRTABLE.apiKey) {
    headers.append("Authorization", `Bearer ${config.AIRTABLE.apiKey}`);
  }
  const tableUrl = `https://api.airtable.com/v0/${config.AIRTABLE.tableId}/main`;
  return fetch(tableUrl, { headers })
    .then((resp) => resp.json())
    .then((data) => {
      return data.records.map((record: any) => {
        const donation: Donation = {
          ...record.fields,
          Logo: record.fields.Logo ? record.fields.Logo[0].url : null,
        };
        return donation;
      });
    });
};

export default getPhilanthropyData;
