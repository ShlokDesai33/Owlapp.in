import { ArrowsVertical, Books, CheckCircle, UserCircle } from 'phosphor-react'
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'

type Props = {
  objectFilter: number
  setObjectFilter: (arg0: number) => void
  inputRef: React.RefObject<HTMLInputElement>
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const options = [
  {
    id: 0,
    name: 'Resources',
    avatar: <Books size={30} weight="regular" className="h-6 w-6 flex-shrink-0 text-indigo-600" />,
  },
  {
    id: 1,
    name: 'Users',
    avatar: <UserCircle size={30} weight="regular" className="h-6 w-6 flex-shrink-0 text-indigo-600" />
  }
]

export default function Example({ objectFilter, setObjectFilter, inputRef }: Props) {
  return (
    <Listbox value={options[objectFilter]} onChange={e => {
      inputRef.current!.value = '';
      setObjectFilter(e.id)
    }}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative w-44 cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="flex items-center">
                {options[objectFilter].avatar}
                <span className="ml-1 block truncate">{options[objectFilter].name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-1 flex items-center pr-2">
                <ArrowsVertical className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-gray-100' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <div className="flex items-center">
                          {option.avatar}
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-1 block truncate')}
                          >
                            {option.name}
                          </span>
                        </div>

                        {selected ? (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-600">
                            <CheckCircle className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}