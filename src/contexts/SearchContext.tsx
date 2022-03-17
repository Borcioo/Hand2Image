import React, { useState } from "react"

// @ts-ignore: Unreachable code error
const SearchContext = React.createContext()

const useSearchContext = () => {
  // @ts-ignore: Unreachable code error
  const [searchQuery, setSearchQuery] = React.useContext(SearchContext)

  const handleQuery = (value: string) => {
    setSearchQuery(value)
  }

  return { value: searchQuery, onChange: handleQuery }
}

const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("")

  return <SearchContext.Provider value={[searchQuery, setSearchQuery]}>{children}</SearchContext.Provider>
}

export { SearchProvider, useSearchContext }
