export default function Input(props) {
  if (props.type === 'submit') {
    return (
      <input
        className='text-base bg-blue-900 hover:bg-blue-800 text-white py-3 px-12 rounded cursor-pointer w-full'
        {...props}
      />
    )
  }

  return (
    <input
      className='text-base rounded w-full py-2 px-4 focus:bg-gray-100'
      {...props}
    />
  )
}
