// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismicT from "@prismicio/types";
import type * as prismic from "@prismicio/client";

type Simplify<T> = {
    [KeyType in keyof T]: T[KeyType];
};
/**
 * Primary content in BeforeAfter → Primary
 *
 */
interface BeforeAfterSliceDefaultPrimary {
    /**
     * title field in *BeforeAfter → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: before_after.primary.title
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    title: prismicT.KeyTextField;
    /**
     * before image field in *BeforeAfter → Primary*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: before_after.primary.before_image
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    before_image: prismicT.ImageField<never>;
    /**
     * after image field in *BeforeAfter → Primary*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: before_after.primary.after_image
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    after_image: prismicT.ImageField<never>;
}
/**
 * Default variation for BeforeAfter Slice
 *
 * - **API ID**: `default`
 * - **Description**: `BeforeAfter`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type BeforeAfterSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<BeforeAfterSliceDefaultPrimary>, never>;
/**
 * Slice variation for *BeforeAfter*
 *
 */
type BeforeAfterSliceVariation = BeforeAfterSliceDefault;
/**
 * BeforeAfter Shared Slice
 *
 * - **API ID**: `before_after`
 * - **Description**: `BeforeAfter`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type BeforeAfterSlice = prismicT.SharedSlice<"before_after", BeforeAfterSliceVariation>;
/**
 * Primary content in RichText → Primary
 *
 */
interface RichTextSliceDefaultPrimary {
    /**
     * richtext field in *RichText → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: This is where it all begins...
     * - **API ID Path**: rich_text.primary.text
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    text: prismicT.RichTextField;
}
/**
 * Default variation for RichText Slice
 *
 * - **API ID**: `default`
 * - **Description**: `RichText`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type RichTextSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<RichTextSliceDefaultPrimary>, never>;
/**
 * Slice variation for *RichText*
 *
 */
type RichTextSliceVariation = RichTextSliceDefault;
/**
 * RichText Shared Slice
 *
 * - **API ID**: `rich_text`
 * - **Description**: `RichText`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type RichTextSlice = prismicT.SharedSlice<"rich_text", RichTextSliceVariation>;
declare module "@prismicio/client" {
    interface CreateClient {
        (repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client;
    }
    namespace Content {
        export type { BeforeAfterSliceDefaultPrimary, BeforeAfterSliceDefault, BeforeAfterSliceVariation, BeforeAfterSlice, RichTextSliceDefaultPrimary, RichTextSliceDefault, RichTextSliceVariation, RichTextSlice };
    }
}
