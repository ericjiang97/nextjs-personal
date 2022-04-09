import moment from "moment";
import { NextPage } from "next";
import { Bar, Line } from "react-chartjs-2";
import DonationsByMonthChart from "../components/charts/DonationsByMonthChart";
import SmallHeroBanner from "../components/SmallHeroBanner";
import MainLayout from "../containers/MainLayout";
import { Donation, DonationsByMonth } from "../types/Philanthropy";
import getPhilanthropyData from "../utils/airtable";

interface PhilanthropyPageProps {
  data: Donation[];
  donationsByMonth: DonationsByMonth;
}

const PhilanthropyPage: NextPage<PhilanthropyPageProps> = ({
  data,
  donationsByMonth,
}) => {
  console.log(donationsByMonth);

  return (
    <MainLayout
      pageTitle="Philanthropy"
      customHero={
        <SmallHeroBanner
          title="Philanthropy"
          description="As part of my way of giving back to society apart from volunteering and mentoring, I'm also doing some donations and charity work."
        />
      }
      pageMeta={{
        description: `As part of my way of giving back to society apart from volunteering and mentoring, I'm also doing some
        donations and charity work.`,
        endpoint: "/",
      }}
    >
      <div className="relative px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="relative mx-auto max-w-7xl">
          <DonationsByMonthChart data={donationsByMonth} />
          <div className="mt-10">
            <h4 className="text-2xl font-semibold text-gray-500">
              Donation History
            </h4>
            <div className="mt-4">
              <iframe
                className="airtable-embed"
                src="https://airtable.com/embed/shrk5nvmKvWV8ZeOi?backgroundColor=gray&viewControls=on"
                frameBorder="0"
                width="100%"
                height="533"
                style={{ background: "transparent", border: "1px solid #ccc" }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export async function getServerSideProps() {
  const res = await getPhilanthropyData();

  let donationsByMonth: DonationsByMonth = {};

  res
    .sort((a, b) => {
      if (moment(a.Date).isBefore(moment(b.Date))) return -1;
      return 1;
    })
    .forEach((donation) => {
      const date = moment(donation.Date);
      const month = date.format("MMM YYYY");

      if (donationsByMonth[month] != null) {
        donationsByMonth[month].donated += donation.Amount;
      } else {
        donationsByMonth[month] = {
          donated: donation.Amount,
          matched: 0,
        };
      }

      if (donation["Employer Matched"]) {
        if (donationsByMonth[month] != null) {
          donationsByMonth[month].matched += donation.Amount;
        } else {
          donationsByMonth[month].matched = donation.Amount;
        }
      }
    });

  return { props: { data: res, donationsByMonth } };
}

export default PhilanthropyPage;
