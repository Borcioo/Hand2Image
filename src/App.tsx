import { createContext, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import "./App.css"

import Results from "./pages/Results.page"
import Search from "./pages/Search.page"
import { SearchProvider } from "./contexts/SearchContext"
type Props = {}

const queryClient = new QueryClient()

const App = (props: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Search />} />
            <Route path='/results' element={<Results />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </SearchProvider>
    </QueryClientProvider>
  )
}

export default App
