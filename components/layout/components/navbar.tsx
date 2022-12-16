import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { CaretDown, ChartBar, Cursor, Lifebuoy, List, LockKey, Phone, Robot, RocketLaunch, Scales, UsersThree, X } from 'phosphor-react'
import Image from 'next/image'
import logoSvg from '../../../public/images/logo.svg'
import Link from 'next/link'

const solutions = [
  {
    name: 'Analytics',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: '#',
    icon: ChartBar,
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '#',
    icon: Cursor,
  },
  {
    name: 'Help Centers',
    description: "Answer your customer's questions in forums and FAQs.",
    href: '#',
    icon: Lifebuoy,
  },
  {
    name: 'Automation',
    description: 'Build strategic funnels that will drive your customers to convert',
    href: '#',
    icon: Robot,
  },
]

const callsToAction = [
  { name: 'Contact Us', href: '/contact', icon: Phone },
]

const resources = [
  {
    name: 'About Us',
    description: 'Learn more about the team and company behind this endeavour.',
    href: '/about',
    icon: UsersThree,
  },
  {
    name: 'Our Vision',
    description: 'Read about our goals and the motivation for our innovation.',
    href: '/vision',
    icon: RocketLaunch,
  },
  {
    name: 'Privacy Policy',
    description: 'Understand what information / data we collect, why we collect it.',
    href: '/policy',
    icon: LockKey,
  },
  {
    name: 'Terms of Service',
    description: 'The rules, specifications, and requirements for the use of Owl and other products.',
    href: '/terms&conditions',
    icon: Scales,
  },
]

const recentPosts = [
  { id: 1, name: 'Boost your conversion rate', href: '#' },
  { id: 2, name: 'How to use search engine optimization to drive traffic to your site', href: '#' },
  { id: 3, name: 'Improve your customer experience', href: '#' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function LandingNavbar({ classes = '' }) {
  return (
    <Popover className={`${classes}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <button className="flex items-center gap-x-1">
                <span className="sr-only">Instrumus</span>
                <Image
                  src={logoSvg}
                  alt="Logo"
                  width={45}
                  height={45}
                />
                <h1 className="text-xl font-medium hidden lg:inline">Instrumus</h1>
              </button>
            </Link>
          </div>

          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <List className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            <Link href="/dashboard" passHref>
              <button className="text-base font-medium text-gray-500 hover:text-gray-900">
                Dashboard
              </button>
            </Link>

            <Link href="/contact" passHref>
              <button className="text-base font-medium text-gray-500 hover:text-gray-900">
                Contact Us
              </button>
            </Link>

            {/* <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group inline-flex items-center rounded-md text-base font-medium hover:text-gray-900 focus:outline-none'
                    )}
                  >
                    <span>Solutions</span>
                    <CaretDown
                      className={classNames(
                        open ? 'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500'
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {solutions.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              passHref
                            >
                              <button className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50 text-left">
                                <item.icon className="h-6 w-6 flex-shrink-0 text-primary" aria-hidden="true" />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900">{item.name}</p>
                                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                </div>
                              </button>
                            </Link>
                          ))}
                        </div>

                        <div className="space-y-6 bg-gray-50 px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                          {callsToAction.map((item) => (
                            <div key={item.name} className="flow-root">
                              <Link
                                href={item.href}
                              >
                                <button className="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-100 text-left">
                                  <item.icon className="h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                  <span className="ml-3">{item.name}</span>
                                </button>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover> */}

            <a href="https://owl-console.vercel.app" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Console
            </a>

            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group inline-flex items-center rounded-md text-base font-medium hover:text-gray-900 focus:outline-none'
                    )}
                  >
                    <span>More</span>
                    <CaretDown
                      className={classNames(
                        open ? 'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500'
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {resources.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                            >
                              <button className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50 text-left">
                                <item.icon className="h-6 w-6 flex-shrink-0 text-primary" aria-hidden="true" />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900">{item.name}</p>
                                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                </div>
                              </button>
                            </Link>
                          ))}
                        </div>

                        {/* <div className="bg-gray-50 px-5 py-5 sm:px-8 sm:py-8">
                          <div>
                            <h3 className="text-base font-medium text-gray-500">Recent Posts</h3>
                            <ul role="list" className="mt-4 space-y-4">
                              {recentPosts.map((post) => (
                                <li key={post.id} className="truncate text-base">
                                  <Link href={post.href}>
                                    <button className="font-medium text-gray-900 hover:text-gray-700 text-left">
                                      {post.name}
                                    </button>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-5 text-sm">
                            <Link href="#">
                              <button className="font-medium text-primary hover:text-primary/80 text-left">
                                View all posts
                                <span aria-hidden="true"> &rarr;</span>
                              </button>
                            </Link>
                          </div>
                        </div> */}
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </Popover.Group>

          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <Link href="/auth/signin">
              <button className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                Sign in
              </button>
            </Link>
            
            <Link href="/auth/signup">
              <button className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden z-10">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <Image
                    src={logoSvg}
                    alt="Logo"
                    width={45}
                    height={45}
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>

              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {resources.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                    >
                      <button className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50 text-left">
                        <item.icon className="h-6 w-6 flex-shrink-0 text-primary" aria-hidden="true" />
                        <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                      </button>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            <div className="space-y-6 py-6 px-5">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <Link href="/dashboard">
                  <button className="text-base font-medium text-gray-900 hover:text-gray-700 text-left w-fit">
                    Dashboard
                  </button>
                </Link>

                <Link href="/contact">
                  <button className="text-base font-medium text-gray-900 hover:text-gray-700 text-left w-fit">
                    Contact Us
                  </button>
                </Link>

                <a href="https://owl-console.vercel.app" className="text-base font-medium text-gray-900 hover:text-gray-700 text-left w-fit">
                    Console
                </a>

                <Link href="/browse">
                  <button className="text-base font-medium text-gray-900 hover:text-gray-700 text-left w-fit">
                    Browse
                  </button>
                </Link>

                {/* {solutions.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                  >
                    <button className="text-base font-medium text-gray-900 hover:text-gray-700 text-left w-fit">
                      {item.name}
                    </button>
                  </Link>
                ))} */}
              </div>

              <div>
                <Link href="/auth/signup">
                  <button className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                    Sign up
                  </button>
                </Link>
                
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Already have an account?{' '}
                  <Link href="/auth/signin">
                    <button className="text-primary hover:text-primary/80">
                      Sign in
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}