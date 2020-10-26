import { PrismicBlogCategory, PrismicBlogPost } from '../../../types/PrismicBlogPost';

export default interface BlogCardProps {
  uid: string;
  blogPostContent: PrismicBlogPost<PrismicBlogCategory>;
}
