import Link from 'next/link';
import Date from '../Date';

export default function LatestPosts({ latestPosts }) {
  return (
    <section className='bg-gray-800 text-gray-300'>
      <div class="mx-auto max-w-screen-xl px-4 py-4 sm:py-16 sm:px-6 lg:px-8">
        <h2 class="text-3xl text-center font-bold sm:text-4xl">Últimos posts no blog</h2>

        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
          {latestPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <div className="group relative cursor-pointer">
                <div className="overflow-hidden rounded-lg bg-white group-hover:opacity-75 ">
                  <img
                    src={post.coverImage.url}
                    alt={post.altImage}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h2 className="mt-2 text-3xl text-gray-100 font-semibold text-center lg:text-start">
                  {post.title}
                </h2>
                <div class="flex items-center justify-center lg:justify-start mt-2 mb-2">
                  <p class="text-gray-100 text-xs tracking-widest mr-3">
                    <Date dateString={post.date}/>
                  </p>
                  <p class="text-gray-100 text-xs tracking-widest mr-3">
                    📌{post.tags}
                  </p>
                  <p class="text-gray-100 text-xs tracking-widest">
                    🕐{post.readingTime}
                  </p>
                </div>
                <p className="text-sm text-gray-300 mb-8 mt-2 text-center lg:text-start">{post.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div class="flex justify-center">
          <Link href="/blog/">
            <button
              class="mt-4 mr-3 inline-flex items-center rounded border border-indigo-600 bg-indigo-600 px-6 py-2 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
            >
              <span class="text-lg">Todos os posts</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
