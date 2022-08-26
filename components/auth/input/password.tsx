function strengthTest(password: string): boolean {
  if (password.length < 8) {
    return false;
  }
  else return true;
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  state: {
    isEmailValid: boolean,
    isPasswordValid: boolean,
  }
  setState: (state: { isEmailValid: boolean, isPasswordValid: boolean }) => void,
}

export default function PasswordInputField({ state, setState }: Props) {
  return (
    <input
      aria-label="password"
      type="password"
      name="password"
      placeholder="Password"
      className={classNames(
        state.isPasswordValid && 'border-green-500',
        !state.isPasswordValid && 'focus:border-red-500',
        'outline-none bg-transparent placeholder:text-xl placeholder:text-gray-text',
        'mb-6 border-2 py-4 px-4 w-full rounded-xl border-gray-btn text-xl'
      )}
      onChange={(e) => {
        if (strengthTest(e.target.value) && !state.isPasswordValid) {
          setState({ ...state, isPasswordValid: true });
        }
        else if (!strengthTest(e.target.value) && state.isPasswordValid) {
          setState({ ...state, isPasswordValid: false });
        }
      }}
    />
  );
}