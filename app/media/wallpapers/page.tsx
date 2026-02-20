'use client'

import Link from "next/link";
import SmallHeroBanner from "../../../components/SmallHeroBanner";
import MainLayout from "../../../containers/MainLayout";
import { wallpapers, Wallpapers } from "../../../data/wallpapers";

interface WallpapersADT extends Wallpapers {
  previewUri?: string;
  uri?: string;
}

const WallpapersPage = () => {
  const data: WallpapersADT[] = wallpapers.map((wallpaper) => {
    const { slug } = wallpaper;
    const publicRootDir = "/downloads/wallpapers/";
    const previewUri = `${publicRootDir}/${slug}/${wallpaper.previewFileName ?? "preview.webp"}`;

    const uri = `${publicRootDir}/${slug}/${slug}.jpg`;

    return { ...wallpaper, previewUri, uri };
  });


  return (
    <MainLayout
      pageTitle="Media - Wallpapers"
      customHero={
        <SmallHeroBanner
          title="Wallpapers"
          description="Here are some of my photos edited and optimised as wallpapers. Feel free to download thse images and use it as your desktop wallpapers!"
        />
      }
      pageMeta={{
        description:
          "Some of my photos edited and optimised as wallpapers, optimised for Mac & Other Displays. Includes support for 4K, 5K & 6K displays, in addition to P3 color profiles for more vibrant colors.",
        endpoint: "/media/wallpapers",
      }}
    >
      <div className="container flex max-w-7xl flex-1 flex-col">
        <ul
          role="list"
          className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-2 xl:gap-x-8"
        >
          {data.map((wallpaper) => (
            <li key={wallpaper.slug} className="relative">
              {wallpaper.tags && (
                <div className="my-2">
                  {wallpaper.tags.map((tag: string, index) => (
                    <span
                      className="mr-1 inline-block shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800"
                      key={index}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="aspect-w-10 aspect-h-7 max-h-100 group block w-full bg-transparent overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                <img
                  src={wallpaper.previewUri}
                  alt={wallpaper.title}
                  className="pointer-events-none object-cover group-hover:opacity-75 h-100"
                />
                <Link
                  href={`/downloads/wallpapers/${wallpaper.slug}/${wallpaper.slug}.${wallpaper.extension ?? "jpg"}`}
                >
                  <button
                    type="button"
                    className="absolute inset-0 focus:outline-none"
                  >
                    <span className="sr-only">
                      View details for {wallpaper.title}
                    </span>
                  </button>
                </Link>
              </div>
              <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-white">
                {wallpaper.title}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </MainLayout>
  );
};

export default WallpapersPage;