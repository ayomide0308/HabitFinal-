function ProgressBar({ value, barClass = 'bg-brand-600', className = '' }) {
  // Keep the value between 0 and 100, whatever we're given
  const safeValue = Math.min(100, Math.max(0, value))

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(safeValue)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`h-2 w-full overflow-hidden rounded-full bg-sunken ${className}`}
    >
      <div
        className={`h-full rounded-full transition-all duration-500 ease-out ${barClass}`}
        style={{ width: `${safeValue}%` }}
      />
    </div>
  )
}

export default ProgressBar