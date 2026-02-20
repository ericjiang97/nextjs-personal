'use client';

import { useParams } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "../../../config/prismic";
import MainLayout from "../../../containers/MainLayout";
import NotFoundPage from "../../not-found";
import BlogContent from "./blogcontent";
import SmallHeroBanner from "../../../components/SmallHeroBanner";

export default function Content() {
    const uid = useParams().uid as string;
    if (!uid || uid.length === 0) return <NotFoundPage />

    const post = createClient().getByUID("blog-post", uid);
    if (!post) return <NotFoundPage />

    const endpoint = `/blog/${uid}`;

    return (
        <Suspense fallback={<MainLayout
            pageTitle="Blog"
            pageMeta={{
                endpoint,
                description: "",
                imageUrl: `https://ericjiang.dev/api/static?blog=${uid}`,
            }}
            customHero={<SmallHeroBanner
                title="Blog"
                description="I occasionally write on my blog about tech, projects, food, reviews (and will add photography and travel in the future)... so here's some of them."
            />}
        ><div>Loading...</div>
        </MainLayout>}>
            <BlogContent content={post} />
        </Suspense >
    )
}