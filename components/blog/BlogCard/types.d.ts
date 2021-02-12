import { CardProps } from 'bumbag';
import { PrismicBlogCategory, PrismicBlogPost } from '../../../types/PrismicBlogPost';

export default interface BlogCardProps extends CardProps {
  uid: string;
  cardProps?: CardProps;
  blogPostContent: PrismicBlogPost<PrismicBlogCategory>;
  showSummary?: boolean;
  showCoverImage?: boolean;
  maxWordCount?: number;
}
