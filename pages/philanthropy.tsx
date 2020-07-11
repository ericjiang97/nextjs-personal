import PageLayout from '../containers/layouts/PageLayout';
import MainContainer from '../containers/MainContainer';
import { InferGetServerSidePropsType } from 'next';

interface Donation {
  Date: string;
  Category: string;
  Amount: number;
  Fund: string;
  Matched: boolean;
}

const Philanthropy = ({ donation }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <PageLayout title="Philanthropy">
    <MainContainer>
      <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-col justify-around">
        <h1 className="m-0 w-full pt-14 leading-tight text-5xl text-center font-semibold">Philanthropy</h1>
      </div>
    </MainContainer>
    <div className="max-w-4xl mx-auto pt-10 py-auto pb-8 flex flex-col flex-wrap justify-around">
      <pre>{JSON.stringify(donation, null, 2)}</pre>
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

export async function getServerSideProps() {
  const headers = new Headers();
  if (process.env.NEXT_PUBLIC_AIRTABLE_API) {
    headers.append('Authorization', `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API}`);
  }

  const donation: Donation[] = await fetch(
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
    });

  return {
    props: { donation }, // will be passed to the page component as props
  };
}

export default Philanthropy;
