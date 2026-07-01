interface FormSectionProps {
  titulo: string
  descricao?: string
  children: React.ReactNode
}

export function FormSection({ titulo, descricao, children }: FormSectionProps) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800">{titulo}</h3>
        {descricao && <p className="text-xs text-gray-500 mt-0.5">{descricao}</p>}
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  )
}

interface FormFieldProps {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}

export function FormField({ label, required, error, children }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  )
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export function Input({ error, className = '', ...props }: InputProps) {
  return (
    <input
      className={`
        w-full px-3 py-2 border rounded-lg text-sm transition-colors
        focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
        ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'}
        ${className}
      `}
      {...props}
    />
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
}

export function Select({ error, className = '', children, ...props }: SelectProps) {
  return (
    <select
      className={`
        w-full px-3 py-2 border rounded-lg text-sm transition-colors
        focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
        ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'}
        ${className}
      `}
      {...props}
    >
      {children}
    </select>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

export function Textarea({ error, className = '', ...props }: TextareaProps) {
  return (
    <textarea
      rows={3}
      className={`
        w-full px-3 py-2 border rounded-lg text-sm transition-colors resize-none
        focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
        ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'}
        ${className}
      `}
      {...props}
    />
  )
}

interface CheckboxFieldProps {
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function CheckboxField({ label, description, checked, onChange }: CheckboxFieldProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className="relative mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors
          ${checked ? 'bg-emerald-600 border-emerald-600' : 'border-gray-300 group-hover:border-emerald-400'}`}>
          {checked && (
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      <div>
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>
    </label>
  )
}
