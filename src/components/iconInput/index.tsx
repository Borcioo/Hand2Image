import React from "react"

interface IconInputProps {
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  icon: React.ReactNode
  reset: (e: { stopPropagation: () => void }) => void
}

const IconInput = (props: IconInputProps) => {
  const { value, onChange, icon, reset } = props

  return (
    <div className='input-container'>
      {icon}
      <input className='searchBar' type='text' value={value} onChange={onChange} name='search' autoComplete='off' placeholder='Search Unsplash...' />
      {reset && (
        <div className='btn-reset' onClick={reset}>
          <svg xmlns='http://www.w3.org/2000/svg' className='icon-small' fill='none' viewBox='0 0 24 24' stroke='black' strokeWidth={2}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </div>
      )}
    </div>
  )
}

export default IconInput
