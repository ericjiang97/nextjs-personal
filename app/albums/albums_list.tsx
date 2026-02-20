'use client';

import { use } from "react";
import moment from 'moment'
import * as prismicH from "@prismicio/helpers";
import { PrismicDocument } from "@prismicio/client";

export declare interface AlbumsListProps { data: Promise<PrismicDocument[]> }

export default function AlbumsList({ data }: React.PropsWithChildren<AlbumsListProps>) {
    const albums: PrismicDocument[] = use(data);

    return <div className="relative pb-20 sm:px-6 lg:px-8 mt-4 md:mt-8 lg:pb-28">
        <div className="relative mx-auto max-w-7xl">
            <div className="mx-auto mt-3 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-2">
                {
                    albums.map((album: PrismicDocument) => {
                        const { first_publication_date, last_publication_date, data } = album
                        const firstPosted = moment(
                            first_publication_date
                        );
                        const lastUpdated = moment(
                            last_publication_date
                        );

                        const isDateSame = firstPosted.isSameOrBefore(lastUpdated);


                        return <div
                            key={album.uid}
                            className="flex flex-col overflow-hidden rounded-lg shadow-lg"
                        >
                            <div className="flex flex-1 flex-col justify-between bg-white p-6">
                                <div className="flex-1">
                                    {data.featured_image && <div>
                                        <img src={data.featured_image.url} alt={data.featured_image.alt} />
                                    </div>}
                                    <div className="mt-2">
                                        <a href={`/albums/${album.uid}`} className="mt-2 block">
                                            <p className="text-xl font-semibold text-gray-900">
                                                {prismicH.asText(data.title)}
                                            </p>
                                        </a>
                                        <p className="text-sm font-medium text-gray-600">
                                            {!isDateSame
                                                ? `Posted on: ${firstPosted.format("DD MMMM YYYY")}`
                                                : `Last Updated on: ${lastUpdated.format("DD MMMM YYYY")}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
};