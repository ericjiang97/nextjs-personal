import React from 'react';
import MainLayout from '../../containers/MainLayout';
import { PrismicDocument } from '@prismicio/client';
import { createClient } from '../../config/prismic';
import SmallHeroBanner from '../../components/SmallHeroBanner';
import { Reviews } from './reviews';

export default function ReviewsPage() {
    const page: Promise<PrismicDocument[]> = createClient().getAllByType(
        'foodreviews',
        {
            orderings: {
                field: 'document.last_publication_date',
                direction: 'desc',
            },
        }
    )

    return (
        <MainLayout
            pageTitle="Reviews"
            customHero={
                <SmallHeroBanner
                    title="Reviews"
                    description="I occasionally write on my blog about tech, projects, food, reviews (and will add photography and travel in the future)... so here's some of them."
                />
            }
            pageMeta={{
                description:
                    "I occassionally write on my blog about tech, projects, reviews (and will add photography and travel in the future)... so here's some of them",
                endpoint: '/reviews',
            }}
        >
            <div className="px-4 pt-0 pb-20 sm:px-6 lg:px-4 lg:pt-0 lg:pb-28">
                <Reviews reviews={page} />
            </div>
        </MainLayout>
    )
}