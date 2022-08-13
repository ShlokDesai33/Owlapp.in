import { Books, UserCircle, Chats } from 'phosphor-react';

type Props = {
  filters: {
    users: boolean
    forums: boolean
    resources: boolean
  }
  setFilters: (filters: { users: boolean; forums: boolean; resources: boolean }) => void
};

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Filters({ filters, setFilters }: Props) {
  return (
    <>
      <button 
        className={classNames(
          filters.resources && 'bg-gray-bg border-white text-primary',
          'flex items-center gap-x-2 mb-6 mt-8 px-6 py-3 rounded-full border-2'
        )}
        onClick={(e) => {
          e.preventDefault();
          setFilters({ ...filters, resources: !filters.resources });
        }}
      >
        <Books size={30} weight="light" />
        <h5>Resources</h5>
      </button>

      <button 
        className={classNames(
          filters.users && 'bg-gray-bg border-white text-primary',
          'flex items-center gap-x-2 mb-6 mt-8 px-6 py-3 rounded-full border-2'
        )}
        onClick={(e) => {
          e.preventDefault();
          setFilters({ ...filters, users: !filters.users });
        }}
      >
        <UserCircle size={30} weight="light" />
        <h5>Users</h5>
      </button>

      <button 
        className={classNames(
          filters.forums && 'bg-gray-bg border-white text-primary',
          'flex items-center gap-x-2 mb-6 mt-8 px-6 py-3 rounded-full border-2'
        )}
        onClick={(e) => {
          e.preventDefault();
          setFilters({ ...filters, forums: !filters.forums });
        }}
      >
        <Chats size={30} weight="light" />
        <h5>Forums</h5>
      </button>
    </>
  )
}