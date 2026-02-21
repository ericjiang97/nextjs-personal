import SmallHeroBanner from "../../components/SmallHeroBanner";
import { createClient } from "../../config/prismic";
import MainLayout from "../../containers/MainLayout";
import AlbumsList from "./albums_list";
import { Suspense } from "react";

export default function AlbumHomePage() {
  const albums = createClient().getAllByType("album", {
    orderings: {
      field: "document.date",
      direction: "desc",
    },
  });

  return (
    <MainLayout
      customHero={
        <SmallHeroBanner
          title="Albums"
          description="I take photos in my spare time."
        />
      }
      pageTitle="Albums"
      pageMeta={{ description: "Photography Albums", endpoint: "/albums" }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <AlbumsList data={albums} />
      </Suspense>
    </MainLayout>
  );
}
