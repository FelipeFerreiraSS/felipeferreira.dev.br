import Link from 'next/link';

export default function LatestPosts({ teste }) {
  return (
    <section className='bg-gray-800 text-gray-300'>
      <div class="mx-auto max-w-screen-xl px-4 py-4 sm:py-16 sm:px-6 lg:px-8">
        <h2 class="text-3xl text-center font-bold sm:text-4xl">Últimos posts no blog</h2>

        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
          {teste.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <div className="group relative cursor-pointer">
                <div className="overflow-hidden rounded-lg bg-white group-hover:opacity-75 ">
                  <img
                    src={post.coverImage.url}
                    alt="teste"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h1 className="mt-2 text-3xl text-gray-100">
                  {post.title}
                </h1>
                <p class="text-gray-100 text-xs tracking-widest font-semibold">
                  {new Date(post.date).toDateString()}
                </p>
                <p className="text-sm font-semibold text-gray-300 mb-8 mt-2">{post.description}</p>
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
