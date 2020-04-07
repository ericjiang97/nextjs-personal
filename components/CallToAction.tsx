import React from "react";

const CallToAction = () => {
  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto py-auto p-8 flex flex-row flex-wrap justify-around">
        <div
          className="flex-1 mx-auto py-auto flex flex-col justify-start mr-4"
          style={{ minWidth: 280 }}
        >
          <h3 className="m-0 text-brand text-xl font-semibold">
            Currently helping battle the spread of COVID-19.
          </h3>
          <h3 className="mt-2 text-sm ">
            I'm working on a few open source projects at the moment, you can
            too.
          </h3>
        </div>
        <div className="max-w-2xl mx-auto py-auto flex flex-col items-center justify-end">
          <a
            className="bg-transparent hover:bg-brand text-white my-2 font-semibold hover:text-white py-2 px-4 border border-brand hover:border-transparent rounded"
            href="https://github.com/AusCovid19"
          >
            Flight Tracker (AU)
          </a>{" "}
          {/* <a
            className="bg-transparent hover:bg-brand text-white my-2 font-semibold hover:text-white py-2 px-4 border border-brand hover:border-transparent rounded"
            href="https://github.com/Western-Health-Covid19-Collaboration/wh_covid19_app"
          >
            WHAC19
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
