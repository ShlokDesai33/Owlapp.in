import { Eye, EyeSlash } from 'phosphor-react'
import { useState } from 'react'

export default function PasswordInputField() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="relative">
      <label htmlFor="password" className="sr-only">
        Password
      </label>
      <input
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        // onInvalid={(e) => {
        //   if (e.currentTarget.validity.valueMissing) {
        //     e.currentTarget.setCustomValidity('Please enter a password.');
        //   }
        //   else if (e.currentTarget.validity.patternMismatch) {
        //     if (e.currentTarget.value.length > 32) {
        //       e.currentTarget.setCustomValidity('Password must less than 32 characters.');
        //     }
        //     e.currentTarget.setCustomValidity('Password must contain atleast 8 characters, one uppercase letter and a number.');
        //   }
        // }}
        // pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$'
        minLength={8}
        maxLength={32}
        required
        className="relative block appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 w-full text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        placeholder="Password"
      />

      <button
        type="button"
        onClick={e => {
          e.preventDefault();
          setShowPassword(!showPassword)
        }}
        className="absolute bottom-0 right-0 p-2"
      >
        {showPassword ?  <EyeSlash size={22} className="text-gray-600" /> : <Eye size={22} className="text-gray-600" />}
      </button>
    </div>
  );
}