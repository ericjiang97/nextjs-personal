'use client';

import React, { Suspense, use } from 'react'
import MainLayout from '../../../containers/MainLayout'
import { FoodreviewsDocument } from '../../../prismicio-types'
import moment from 'moment'
import Rating from '../../../components/Rating/rating'
import PrismicRichTextWrapper from '../../../components/PrismicRichTextWrapper'
import MapsDisplay from '../../../components/MapsDisplay'
import GmapsApiProvider from '../../../providers/GMapsProvider';

declare interface ReviewContentProps {
    review: Promise<FoodreviewsDocument>
}

export default function ReviewContent({
    review,
}: ReviewContentProps) {
    const reviewData = use(review)

    const { name, review_date, rating, maps_url } = reviewData.data
    const title = `${name}`

    const formattedDate = moment(review_date).fromNow();

    return (
        <GmapsApiProvider>
            <MainLayout
                pageTitle={title}
                customHero={
                    <div className="flex flex-col gap-2">
                        <span className="text-start block max-w-md text-base font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            {`Last Visited: ${formattedDate}`}
                        </span>
                        <h1>
                            <span className="text-start mt-2 block text-3xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                {name}
                            </span>
                        </h1>
                        <h2>
                            <Rating rating={Number(rating)} />
                        </h2>
                    </div>
                }
                pageMeta={{
                    description: title,
                    endpoint: `/reviews/${reviewData.uid}`,
                }}
            >
                <div className="px-6">
                    {maps_url && <MapsDisplay mapsUrl={maps_url.text} />}
                    <PrismicRichTextWrapper data={reviewData.data.review} />
                </div>
            </MainLayout>
        </GmapsApiProvider>
    )
}
