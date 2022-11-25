import { Books, UserCircle } from 'phosphor-react'

type Props = {
  filters: {
    users: boolean
    resources: boolean
  }
  setFilters: (filters: { users: boolean, resources: boolean }) => void
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Filters({ filters, setFilters }: Props) {
  return (
    <div className="flex gap-x-2">
      <button
        className={classNames(
          filters.resources && 'bg-gray-bg border-2 border-gray-bg text-primary',
          !filters.resources && 'text-gray-500',
          'flex items-center gap-x-2 px-4 py-2 rounded-full border-2'
        )}
        onClick={(e) => {
          e.preventDefault();
          setFilters({ ...filters, resources: !filters.resources });
        }}
      >
        <Books size={20} weight="regular" />
        Resources
      </button>

      <button
        className={classNames(
          filters.users && 'bg-gray-bg border-2 border-gray-bg text-primary',
          !filters.users && 'text-gray-500',
          'flex items-center gap-x-2 px-4 py-2 rounded-full border-2'
        )}
        onClick={(e) => {
          e.preventDefault();
          setFilters({ ...filters, users: !filters.users });
        }}
      >
        <UserCircle size={20} weight="regular" />
        Users
      </button>
    </div>
  )
}