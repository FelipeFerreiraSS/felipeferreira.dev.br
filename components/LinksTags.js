import { Fragment } from 'react'
import {
  CheckIcon,
  ChevronDownIcon,
  LinkIcon,
  PencilIcon,
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  

export default function LinksTags() {
  return (
    <>
        <div className="pt-7 flex justify-center bg-gray-800">

        <Link href={"/blog/tags/html"}>
            <span className="ml-3 hidden sm:block">
            <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                HTML
            </button>
            </span>
        </Link>

        <Link href={"/blog/tags/css"}>
            <span className="ml-3 hidden sm:block">
            <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                CSS
            </button>
            </span>
        </Link>

        <Link href={"/blog/tags/javascript"}>
            <span className="ml-3 hidden sm:block">
            <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                JavaScript
            </button>
            </span>
        </Link>
        {/* Dropdown 
        <Menu as="div" className="relative ml-3 sm:hidden">
          <Menu.Button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            More
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                  >
                    Edit
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                  >
                    View
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
        */}
      </div>
    </>         
  )
}