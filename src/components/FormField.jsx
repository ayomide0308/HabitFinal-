function FormField({ label, id, error, ...inputProps }) {
  return (
    <div>
     <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-white">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? 'true' : 'false'}
        className={`field ${error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-100' : ''}`}
        {...inputProps}
      />
      {error && <p className="mt-1.5 text-sm text-rose-600">{error}</p>}
    </div>
  )
}

export default FormField