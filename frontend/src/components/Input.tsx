import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/16/solid';
import React, { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "password" | "email",
  label: string,
  placeholder: string,
  value: string,
  error?: string,
  icon?: React.ReactNode
}

const Input = ({
  id,
  type = 'text',
  name,
  label,
  placeholder,
  value,
  icon,
  error,
  disabled = false,
  className = '',
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (<div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      {type === "email" && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
      </div>}
      {type === "password" && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <LockClosedIcon className="h-5 w-5 text-gray-400" />
      </div>}
      <input
        id={id}
        name={name}
        type={type === "password" && showPassword ? "text" : type}
        className={`w-full pl-10 pr-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'
          } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        placeholder={placeholder}
        {...props}
      />
    </div>
    {type === "password" && <button
      type="button"
      className="absolute inset-y-0 right-0 pr-3 flex items-center"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
      ) : (
        <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
      )}
    </button>}
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>)


};

export default Input;