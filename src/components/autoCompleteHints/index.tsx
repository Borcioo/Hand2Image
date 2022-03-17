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
}

const AutoCompleteHints = (props: Props) => {
  const { data, reset } = props
  const { onChange } = useSearchContext()

  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, query: string) => {
    onChange(query)
    reset([])
  }

  return (
    <ul className='nobull' id='nobull'>
      {data?.map((item: Hints, i: number) => {
        return (
          <Link
            key={i}
            to={{
              pathname: "/results",
              search: `?q=${item.query}`,
            }}>
            <li onClick={(e) => handleClick(e, item.query)}>{item.query}</li>
          </Link>
        )
      })}
    </ul>
  )
}

export default AutoCompleteHints
