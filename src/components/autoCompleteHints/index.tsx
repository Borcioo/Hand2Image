import React from "react"
import { Link } from "react-router-dom"
import { useSearchContext } from "../../contexts/SearchContext"

interface Hints {
  query: string
  length: number
}

interface Props {
  data: Hints[]
  reset: React.Dispatch<React.SetStateAction<[] | Hints[] | undefined>>
  setInput: React.Dispatch<React.SetStateAction<string>>
}

const AutoCompleteHints = (props: Props) => {
  const { data, reset, setInput } = props
  const { onChange } = useSearchContext()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, query: string) => {
    onChange(query)
    setInput("")
    reset([])
  }

  return (
    <ul className='nobull' id='nobull'>
      {data?.map((item: Hints, i: number) => {
        return (
          <Link
            onClick={(e) => handleClick(e, item.query)}
            key={i}
            to={{
              pathname: "/results",
              search: `?q=${item.query}`,
            }}>
            <li>{item.query}</li>
          </Link>
        )
      })}
    </ul>
  )
}

export default AutoCompleteHints
