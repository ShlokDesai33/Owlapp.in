function regexTest(email: string): boolean {
  return /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(email);
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

export default function EmailInputField({ state, setState }: Props) {
  return (
    <input
      aria-label="email"
      type="email"
      name="email"
      placeholder="Email"
      className={classNames(
        state.isEmailValid && 'border-green-500',
        !state.isEmailValid && 'focus:border-red-500 border-gray-btn',
        'outline-none bg-transparent placeholder:text-xl placeholder:text-gray-text',
        'mb-6 border-2 py-4 px-4 w-full rounded-xl text-xl'
      )}
      onChange={(e) => {
        if (regexTest(e.target.value) && !state.isEmailValid) {
          setState({ ...state, isEmailValid: true });
        }
        else if (!regexTest(e.target.value) && state.isEmailValid) {
          setState({ ...state, isEmailValid: false });
        }
      }}
    />
  );
}