'use client';

import { PrismicDocument } from "@prismicio/client";
import Link from "next/link";
import { createClient } from "../../../config/prismic";
import { Suspense } from "react";
import CategoryChipInner, { defaultClass } from "./CategoryChipInner";

export default function CategoryChip({ category }: { category: PrismicDocument }) {
    if (!category.uid) return <> </>

    const data = createClient().getByUID("category", category.uid);

    return (
        <Suspense fallback={
            <span className={defaultClass}>
                {category.uid}
            </span>}
        >
            <CategoryChipInner category={data} />
        </Suspense>
    )
}