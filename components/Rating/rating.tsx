'use client'

import { StarIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function Rating({ rating }: React.PropsWithChildren<{ rating: number }>) {
    const finalRating = rating > 5 ? 5 : rating < 0 ? 0 : rating;

    const numOfStars = Math.floor(finalRating);

    return (
        <div className="flex items-center">
            <div className="flex items-center space-x-1">
                {Array.from({ length: numOfStars }, (_, index) => (
                    <StarIcon key={index} className="w-5 h-5 text-yellow-500" />
                ))}
                {Array.from({ length: 5 - numOfStars }, (_, index) => (
                    <StarIcon key={index} className="w-5 h-5 text-disabled" />
                ))}
            </div>

            <p className="ms-2 text-sm font-medium text-body">{finalRating} out of 5</p>
        </div>
    )
}