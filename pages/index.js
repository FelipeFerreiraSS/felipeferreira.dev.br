import Link from 'next/link';

export default function Home() {

  return (
    <>
      <div>
        <h1 class="text-3xl font-bold underline">
          Home
        </h1>
        <div>
          <Link href={"/blog/"}>
              <a class="text-sky-500 hover:text-sky-600">Blog</a>
          </Link>
        </div>
      </div>
    </>
  );
}