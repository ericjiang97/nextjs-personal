import { CardProps } from 'bumbag';
import { PrismicBlogCategory, PrismicBlogPost } from '../../../types/PrismicBlogPost';

export default interface BlogCardProps {
  uid: string;
  cardProps?: CardProps;
  blogPostContent: PrismicBlogPost<PrismicBlogCategory>;
  showSummary?: boolean;
  showCoverImage?: boolean;
  maxWordCount?: number;
}
