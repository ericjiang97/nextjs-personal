import moment, { Moment } from 'moment';

import PageLayout from '../containers/layouts/PageLayout';
import MainContainer from '../containers/MainContainer';
import { InferGetServerSidePropsType } from 'next';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  RadialChart,
} from 'react-vis';
import useDarkTheme from '../hooks/useDarkTheme';

interface Donation {
  Date: string;
  Category: string;
  Amount: number;
  Fund: string;
  Matched: boolean;
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
  const { darkTheme } = useDarkTheme();
  const currentDate = moment();
  const currentFinancialYear = getFinancialYear();

  const totalThisFY = getTotal(donation[currentFinancialYear]);
  const lastFY = getTotal(donation[currentFinancialYear - 1]);
  const diff = totalThisFY - lastFY;

  const donationsByCategory = Object.keys(donationByCategoryMap).map((category: string) => {
    return { label: `${category}: $${donationByCategoryMap[category]}`, angle: donationByCategoryMap[category] };
  });

  const axesStyle = { stroke: 'none', fill: darkTheme ? '#AEAEAE' : '#2e2e2e', fontWeight: 600, margin: '3rem' };
  return (
    <PageLayout title="Philanthropy">
      <MainContainer>
        <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
          <h1 className="m-0 w-full pt-14 leading-tight text-5xl text-center font-semibold">Philanthropy</h1>
          <p>
            As part of my idea of giving back to society apart from volunteering and mentoring, I'm also doing some
            donations and charity work.
          </p>
          <hr className="my-1" />
          <div className="m-0 w-full pt-14 leading-tight font-medium">{`This year I've donated/commited $${totalThisFY}, which is $${Math.abs(
            diff,
          )} ${diff < 0 ? 'less' : 'more'} than last financial year`}</div>
          <div className="m-0 mt-2 w-full pt-14 leading-tight text-xs font-medium">
            Financial Years are Australia Financial Years which are between 1st July and 30th June
          </div>
        </div>
      </MainContainer>
      <div className="max-w-4xl mx-auto pt-10 py-auto pb-8 flex flex-col flex-wrap justify-around overflow-x-scroll">
        <div className="max-w-4xl mx-auto">
          <XYPlot className="m-auto text-grey-500 max-w-4xl w-xl" xType="ordinal" stackBy="y" width={500} height={300}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis style={axesStyle} />
            <YAxis
              style={axesStyle}
              tickFormat={(v) => {
                return `$${v}`;
              }}
              tickPadding={0}
            />
            {Object.keys(donation).map((key: string, i) => {
              const fyDonations = donation[key];
              const data = fyDonations.map((donation) => {
                const transDate = moment(donation.Date);
                const financialYear = getFinancialYear(transDate);

                const isInCurrentFinancialYear = financialYear < currentDate.year();
                return {
                  x: isInCurrentFinancialYear ? `FY${key}` : transDate.format('MMM YYYY'),
                  y: donation.Amount,
                };
              });
              return (
                <VerticalBarSeries
                  barWidth={Number(key) < moment().year() ? 0.2 : 0.5}
                  color={Number(key) < moment().year() ? '#ccc' : '#12939A'}
                  data={data}
                  key={i}
                />
              );
            })}
          </XYPlot>
        </div>
        <div className="my-3">
          <h3 className="m-0 w-full pt-14 leading-tight text-xl font-semibold">
            Donation by Category (this Financial Year)
            <RadialChart data={donationsByCategory} width={500} height={300} showLabels={true}></RadialChart>
          </h3>
        </div>
        <iframe
          className="airtable-embed"
          src="https://airtable.com/embed/shrk5nvmKvWV8ZeOi?backgroundColor=gray&viewControls=on"
          frameBorder="0"
          width="100%"
          height="533"
          style={{ background: 'transparent', border: '1px solid #ccc' }}
        ></iframe>
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
    console.log(donation, acc);
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
