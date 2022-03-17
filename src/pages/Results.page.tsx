import React from "react"
import SearchBar from "../components/searchBar"
import { useSearchContext } from "../contexts/SearchContext"
import { useSearchImages } from "../hooks/useSearchImages"
import Gallery from "../components/gallery"
import { useLocation } from "react-router-dom"
import { Pages } from "../components/gallery"

function useQuery() {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}

const Results = () => {
  const { value } = useSearchContext()
  let search = useQuery()

  const query = value || search.get("q")

  const { isLoading, data, fetchNextPage, hasNextPage } = useSearchImages(query)

  return (
    <>
      <header>
        <div className='header-container'>
          <SearchBar />
        </div>
      </header>
      <nav className='nav'>
        <h1>{query}</h1>
      </nav>
      <main>
        <Gallery hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} isLoading={isLoading} data={data as unknown as Pages} />
      </main>
    </>
  )
}
export default Results
