import * as React from 'react'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, ...rest }) => {
    return (
      <div className="input">
        <label htmlFor={`text-${label}`}>{label}</label>
        <input className="text-input" name={`text-${label}`} type="text" {...rest} />
      </div>
    )
  }
)
