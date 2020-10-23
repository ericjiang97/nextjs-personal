export interface BlogPostFrontmatter {
  title: string;
  author: string;
  date: string;
  summary?: string;
  tags?: string[];
  category: string;
  coverImageUrl?: string;
  preview?: boolean;
}

export interface StaticBlogPost {
  frontmatter: BlogPostFrontmatter;
  markdownBody?: string;
  slug: string;
}
