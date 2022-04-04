import React from "react";
import MainLayout from "../containers/MainLayout";

const NotFoundPage = () => {
  return (
    <MainLayout pageTitle="404: Page Not Found" showHero={false}>
      <div className="flex flex-col">
        <h2 className="text-4xl font-bold">Page Not found</h2>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;
