import moment, { Moment } from 'moment';

import PageLayout from '../containers/layouts/PageLayout';
import MainContainer from '../containers/MainContainer';
import { InferGetServerSidePropsType } from 'next';
import { Chart } from 'react-google-charts';

interface Donation {
  Date: string;
  Category: string;
  Amount: number;
  Fund: string;
  Matched: boolean;
  'Employer Matched': boolean;
}

const getFinancialYear = (date: Moment = moment()) => {
  if (date.month() + 1 >= 7 && date.month() + 1 <= 12) {
    return date.year();
  }
  return date.year() - 1;
};

const getTotal = (donations: Donation[]) => {
  return donations.reduce((acc: number, donation) => {
    const accumulator = acc + donation.Amount;
    return accumulator;
  }, 0);
};

const Philanthropy = ({ donation, donationByCategoryMap }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const currentFinancialYear = getFinancialYear();

  const totalThisFY = getTotal(donation[currentFinancialYear]);
  const lastFY = getTotal(donation[currentFinancialYear - 1]);
  const diff = totalThisFY - lastFY;

  const donationsByCategory = Object.keys(donationByCategoryMap).map((category: string) => {
    return [category, donationByCategoryMap[category]];
  });

  const chartData = Object.keys(donation).flatMap((key) => {
    if (Number(key) < getFinancialYear()) {
      const fyMatched = donation[key].reduce((acc, cur) => {
        return cur['Employer Matched'] ? acc + cur.Amount : acc;
      }, 0);

      const fyUnmatched = donation[key].reduce((acc, cur) => {
        return !cur['Employer Matched'] ? acc + cur.Amount : acc;
      }, 0);

      return [[`FY${key}`, fyUnmatched, fyMatched, 0]];
    }
    const res = donation[key].map((d) => {
      const isFuture: boolean = moment(d.Date).isAfter(moment());
      return [
        d.Date,
        !isFuture && !d['Employer Matched'] ? d.Amount : 0,
        !isFuture && d['Employer Matched'] ? d.Amount : 0,
        isFuture ? d.Amount : 0,
      ];
    });
    return res;
  });

  return (
    <PageLayout title="Philanthropy">
      <MainContainer>
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
          <h1 className="m-0 w-full pt-14 leading-tight text-5xl text-center font-semibold">Philanthropy</h1>
          <p>
            As part of my idea of giving back to society apart from volunteering and mentoring, I'm also doing some
            donations and charity work.
          </p>
          <div className="m-0 mt-2 w-full pt-14 leading-tight text-xs font-medium">
            Note: Financial Years are Australia Financial Years which is between 1st July and 30th June every year.
          </div>
          <hr className="my-1" />

          <div className="m-0 w-full pt-14 leading-tight font-medium flex">
            <div className="m-0 w-full pt-14 leading-tight font-medium flex-1">
              <span className="text-xs">{`Total donated this year FY${currentFinancialYear}`}</span>
              <h3 className="mt-1 text-3xl">{`$${totalThisFY}`}</h3>
              <span className="text-xs" style={{ color: diff < 0 ? 'red' : 'green' }}>
                {`${diff < 0 ? '↓ -' : '↑ '}$${Math.abs(diff)} vs FY${currentFinancialYear - 1}`}
              </span>
            </div>
          </div>
        </div>
      </MainContainer>
      <div className="max-w-4xl mx-auto pt-10 py-auto pb-8 flex flex-col flex-wrap justify-around overflow-x-scroll">
        <div className="max-w-4xl mx-auto w-full">
          <Chart
            chartType="BarChart"
            width="100%"
            height="30vh"
            loader={<div>Loading...</div>}
            data={[['Date', 'Unmatched', 'Employer Matched', 'Committed'], ...chartData]}
            options={{
              chartArea: { width: '50%' },
              hAxis: {
                title: 'Total Donated (A$)',
              },
              isStacked: true,
              title: 'Donations by FY',
              vAxis: {
                title: 'Date / Financial Year',
              },
            }}
          />
        </div>
        <div className="my-3">
          <h3 className="m-0 w-full pt-14 leading-tight text-xl font-semibold">
            Donation by Category (this Financial Year)
          </h3>
          <Chart
            chartType="PieChart"
            width="100%"
            height="30vh"
            loader={<div>Loading...</div>}
            data={[['Category', 'Amount'], ...donationsByCategory]}
            options={{
              chartArea: { width: '50%' },
              title: 'Donations by Category this FY',
            }}
          />
        </div>
        <div className="my-3">
          <h3 className="m-0 w-full pt-14 leading-tight text-xl font-semibold">All Transactions</h3>
          <iframe
            className="airtable-embed"
            src="https://airtable.com/embed/shrk5nvmKvWV8ZeOi?backgroundColor=gray&viewControls=on"
            frameBorder="0"
            width="100%"
            height="533"
            style={{ background: 'transparent', border: '1px solid #ccc' }}
          ></iframe>
        </div>
      </div>
    </PageLayout>
  );
};

export async function getServerSideProps() {
  const headers = new Headers();
  if (process.env.NEXT_PUBLIC_AIRTABLE_API) {
    headers.append('Authorization', `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API}`);
  }

  const allDonations: { [key: string]: Donation[] } = await fetch(
    `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_TABLE_ID}/main`,
    {
      headers,
    },
  )
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      return data.records.map((record: any) => {
        return record.fields;
      });
    })
    .then((donations: Donation[]) => {
      return donations.reduce((acc: { [key: string]: Donation[] }, donation) => {
        const date = moment(donation.Date);
        const financialYear = getFinancialYear(date);

        if (acc[financialYear] != null) {
          acc[financialYear] = [...acc[financialYear], donation];
        } else {
          acc[financialYear] = [donation];
        }

        acc[financialYear].sort((a, b) => moment(a.Date).diff(moment(b.Date)));

        return acc;
      }, {});
    });

  const donationByCategoryMap = allDonations[getFinancialYear()].reduce((acc: { [key: string]: number }, donation) => {
    if (acc[donation.Category]) {
      acc[donation.Category] += donation.Amount;
    }
    acc[donation.Category] = donation.Amount;
    return acc;
  }, {});
  return {
    props: { donationByCategoryMap, donation: allDonations }, // will be passed to the page component as props
  };
}

export default Philanthropy;
