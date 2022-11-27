import Image from 'next/image'
import Link from 'next/link';
import LinksTags from '../components/LinksTags';
import Date from '../components/Date';

export default function AllPosts({ allPosts }) {
  return (
    <main>
      <LinksTags/>
      <section className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-10 sm:py-10 lg:max-w-none lg:py-10">
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {allPosts.map((post) => (
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
          </div>
        </div>
      </section>   
    </main>
  );
}