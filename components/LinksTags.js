import Link from 'next/link'

const allTags = [
  { id:"01", name: 'CSS', href: 'css'},
  { id:"02", name: 'NextJs', href: 'nextJs'},
  { id:"03", name: 'StyledComponents', href: 'styledComponents'},
]

export default function LinksTags() {
  return (
    <div className="pt-7 flex justify-center bg-gray-800">
      {allTags.map((tag) => (
        <Link key={tag.id} href={`/blog/tags/${tag.href}`}>
          <span className="ml-3 hidden sm:block">
            <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {tag.name}
            </button>
          </span>
        </Link>
      ))}
    </div>
  )
}