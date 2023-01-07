type Props = {
  id: string
  title: string
  isRequired?: boolean
  defaultValue: string
}

export default function TextField({ id, title, isRequired, defaultValue }: Props) {
  return (
    <div className="overflow-hidden border-2 border-gray-100 rounded sm:rounded-md flex flex-col justify-between">
      <div className="bg-white px-4 py-5 sm:p-6">
        <label htmlFor="first-name" className="block text-base font-medium text-gray-900">
          {title}
        </label>
        <input
          type="text"
          name={'@' + id + ';' + title}
          id={title}
          required={isRequired || false}
          defaultValue={defaultValue}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Type here..."
          onKeyDown={(e) => {
            if (['Enter', 'NumpadEnter'].includes(e.key)) {
              // prevent form submission
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        />
      </div>
      <div className="bg-gray-50 h-11 sm:h-12 md:h-14"></div>
    </div>
  )
}