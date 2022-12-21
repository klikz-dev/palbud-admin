import classNames from 'classnames'

export default function Input({ value, setValue, className, ...props }) {
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
      className={classNames(
        'px-5 py-2 placeholder:italic text-black border border-zinc-400 rounded w-full',
        className
      )}
    />
  )
}
