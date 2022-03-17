import { FormEvent, SetStateAction, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import AutoComplete from "../../components/autoComplete"
import { useSearchContext } from "../../contexts/SearchContext"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"
import IconInput from "../iconInput"

const SearchIcon = () => {
  return (
    <>
      <svg xmlns='http://www.w3.org/2000/svg' className='icon-small' fill='none' viewBox='0 0 24 24' stroke='black' strokeWidth={2}>
        <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
      </svg>
    </>
  )
}

const SearchBar = () => {
  const [input, setInput] = useState("")
  const { onChange } = useSearchContext()
  const ref = useRef<HTMLDivElement>(null)
  let navigate = useNavigate()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onChange(input)
    navigate(`/results`)
  }
  const handleReset = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    setInput("")
  }

  useOnClickOutside(ref, () => setInput(""))

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <IconInput value={input} onChange={(e) => setInput(e.target.value)} reset={(e) => handleReset(e)} icon={<SearchIcon />} />
      </form>
      <div className='hints' ref={ref}>
        <AutoComplete input={input} />
      </div>
    </div>
  )
}

export default SearchBar
