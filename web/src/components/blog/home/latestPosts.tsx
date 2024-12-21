import Link from 'next/link';
import { format } from 'date-fns'

type Post = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  readTime: string;
  updatedAt: string
  headerImage?: {
    imageUrl: string;
  };
  tags: [
    {
      id: number;
      name: string
    }
  ]
};

type BlogProps = {
  latestPosts: Post[];
};

export default function LatestPosts({ latestPosts }: BlogProps) {
  return (
    <section className='bg-gray-800 text-gray-300'>
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-center font-bold sm:text-4xl">Últimos posts no blog</h2>

        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
          {latestPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <div className="group relative cursor-pointer">
                <div className="overflow-hidden rounded-lg bg-white group-hover:opacity-75 ">
                  <img
                    src={post.headerImage?.imageUrl}
                    alt={post.headerImage?.imageUrl}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h2 className="mt-2 text-3xl text-gray-100 font-semibold text-center lg:text-start">
                  {post.title}
                </h2>
                <div className="flex items-center justify-center lg:justify-start mt-2 mb-2">
                  <p className="text-gray-100 text-xs tracking-widest mr-3">
                    <time dateTime={post.updatedAt}>📅{format(post.updatedAt, 'd/LL/yyyy')}</time>
                  </p>
                  <p className="text-gray-100 text-xs tracking-widest mr-3">
                    {post.tags.map((tag) => (
                      <span key={tag.id} className="gap-2">
                        📌{tag.name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)) .join(' ')}
                      </span>
                    ))}
                  </p>
                  <p className="text-gray-100 text-xs tracking-widest">
                    🕐{post.readTime} min
                  </p>
                </div>
                <p className="text-sm text-gray-300 mb-8 mt-2 text-center lg:text-start">{post.summary}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center">
          <Link href="/blog/">
            <button
              className="mt-4 mr-3 inline-flex items-center rounded border border-indigo-600 bg-indigo-600 px-6 py-2 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
            >
              <span className="text-lg">Todos os posts</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

