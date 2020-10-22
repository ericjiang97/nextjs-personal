import Link from 'next/link';
import Prismic from 'prismic-javascript';
import { RichText } from 'prismic-reactjs';
import { client } from '../../../config/prismic';

export default function BlogHome(props: any) {
  return (
    <div>
      <ul>
        {props.posts.results.map((post: { uid: string; post: { data: { title: string } } }) => (
          <li key={post.uid}>
            <Link href={`/v2/blog/${post.uid}`} as={`/v2/blog/${post.uid}`}>
              <a>{RichText.render(post.data.title)} </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await client.query(Prismic.Predicates.at('document.type', 'blog-post'), {
    orderings: '[my.post.date desc]',
  });
  return {
    props: {
      posts,
    },
  };
}
