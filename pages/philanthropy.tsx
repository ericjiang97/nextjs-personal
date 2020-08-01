import moment, { Moment } from 'moment';

import PageLayout from '../containers/layouts/PageLayout';
import { InferGetServerSidePropsType } from 'next';
import { Chart } from 'react-google-charts';
import { Heading, Paragraph, Text, Label, Container } from 'bumbag';

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
    const fyData = donation[key].reduce(
      (acc, cur) => {
        const isFuture: boolean = moment(cur.Date).isAfter(moment());

        const { matched, unmatched, commited } = acc;
        if (!isFuture) {
          return {
            commited,
            matched: cur['Employer Matched'] ? matched + cur.Amount : matched,
            unmatched: !cur['Employer Matched'] ? unmatched + cur.Amount : unmatched,
          };
        }
        return {
          matched,
          unmatched,
          commited: commited + cur.Amount,
        };
      },
      { unmatched: 0, matched: 0, commited: 0 },
    );

    return [[`FY${key}`, fyData.unmatched, fyData.matched, fyData.commited]];
  });

  return (
    <PageLayout
      title="Philanthropy"
      pageMeta={{
        description: `As part of my way of giving back to society apart from volunteering and mentoring, I'm also doing some
        donations and charity work.`,
        endpoint: '/',
        imageUrl: '/images/eric-jiang-bitbybit.jpeg',
      }}
    >
      <Heading use="h3">Philanthropy</Heading>
      <Paragraph>
        As part of my way of giving back to society apart from volunteering and mentoring, I'm also doing some donations
        and charity work.
      </Paragraph>
      <Text fontSize="0.75rem">
        Note: Financial Years are Australia Financial Years which is between 1st July and 30th June every year.
      </Text>
      <hr style={{ marginTop: '0.75rem', marginBottom: '0.5rem' }} />
      <div>
        <Label fontSize="0.8rem">{`Total commited this year (FY${currentFinancialYear})`}</Label>
        <Heading use="h3" fontWeight="500" marginBottom="0">{`$${totalThisFY}`}</Heading>
        <Text marginTop="0" fontSize="0.75rem" color={diff < 0 ? 'red' : 'green'}>
          {`${diff < 0 ? '↓ -' : '↑ '}$${Math.abs(diff)} vs FY${currentFinancialYear - 1}`}
        </Text>
      </div>
      <Container overflowX="scroll">
        <Container marginTop="0.75rem">
          <Heading use="h4">Donations over Time</Heading>
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
                title: 'Financial Year',
              },
            }}
          />
        </Container>
        <Container marginTop="0.75rem">
          <Heading use="h4">Donation by Category (this Financial Year)</Heading>
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
        </Container>
        <Container marginTop="0.75rem">
          <Heading use="h4">All Transactions</Heading>
          <iframe
            className="airtable-embed"
            src="https://airtable.com/embed/shrk5nvmKvWV8ZeOi?backgroundColor=gray&viewControls=on"
            frameBorder="0"
            width="100%"
            height="533"
            style={{ background: 'transparent', border: '1px solid #ccc' }}
          ></iframe>
        </Container>
      </Container>
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
