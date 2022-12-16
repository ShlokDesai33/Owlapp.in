type Props = {
  id: string;
  title: string;
  options: {
    value: string;
    priceAddition: number;
  }[]
  isRequired?: boolean;
  defaultValue: string[];
}

export default function CheckboxField({ id, title, options, isRequired, defaultValue }: Props) {
  return (
    <div className="overflow-hidden border-2 border-gray-100 rounded sm:rounded-md">
      <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
        <fieldset>
          <legend className="contents text-base font-medium text-gray-900">{title}</legend>
          <div className="mt-4 space-y-4">
            {options.map((option: any) => (
              <div className="flex items-start" key={option.value}>
                <div className="flex h-5 items-center">
                  <input
                    id={option.value}
                    value={option.value}
                    name={'@' + id + ';' + title}
                    type="checkbox"
                    required={isRequired || false}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    defaultChecked={defaultValue?.includes(option.value)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={option.value} className="font-medium text-gray-700">
                    {option.value}
                  </label>
                  {
                    option.priceAddition > 0 && (
                      <p className="text-gray-500 text-sm">
                        Adds <span className="text-indigo-600">₹{option.priceAddition}</span> to the base price.
                      </p>
                    )
                  }
                </div>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="bg-gray-50 h-11 sm:h-12 md:h-14"></div>
    </div>
  )
}