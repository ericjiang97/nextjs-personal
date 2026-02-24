'use client'

import { PrismicDocument } from '@prismicio/client'
import { use } from 'react'
import Link from 'next/link'

export function Reviews({ reviews }: { reviews: Promise<PrismicDocument[]> }) {
    const allReviews = use(reviews)

    return (
        <div className="flex flex-col gap-4 pt-10">
            {allReviews.map((review: PrismicDocument) => {
                const { uid } = review;

                return (
                    <Link href={`/reviews/${review.uid}`} key={uid}>
                        <div key={review.uid}>{review.uid}</div>
                    </Link>
                )
            })}
        </div>
    )
}
