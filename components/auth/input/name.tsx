function lengthTest(name: string): boolean {
  if (name.length === 0) {
    return false;
  }
  else return true;
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  state: {
    isNameValid: boolean,
    isEmailValid: boolean,
    isPasswordValid: boolean,
  }
  setState: (state:
    {
      isNameValid: boolean,
      isEmailValid: boolean,
      isPasswordValid: boolean
    }
  ) => void,
}

export default function NameInputField({ state, setState }: Props) {
  return (
    <input
      aria-label="name"
      type="name"
      name="name"
      placeholder="Full name"
      className={classNames(
        state.isNameValid && 'border-green-500',
        !state.isNameValid && 'focus:border-red-500 border-gray-btn',
        'outline-none bg-transparent placeholder:text-xl placeholder:text-gray-text',
        'mb-6 border-2 py-4 px-4 w-full rounded-xl text-xl'
      )}
      onChange={(e) => {
        if (lengthTest(e.target.value) && !state.isNameValid) {
          setState({ ...state, isNameValid: true });
        }
        else if (!lengthTest(e.target.value) && state.isNameValid) {
          setState({ ...state, isNameValid: false });
        }
      }}
    />
  );
}