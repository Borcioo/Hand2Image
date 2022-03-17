import { useInfiniteQuery } from "react-query"
import { request } from "../utils/axios"

const fetchImages = (input: string, pageParam: number) => {
  return request({ url: `/search/photos?per_page=20&page=${pageParam}&query=${input}` })
}

export const useSearchImages = (input: string) => {
  return useInfiniteQuery(["img-query", input], ({ pageParam = 1 }) => fetchImages(input, pageParam), {
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < pages[0].data.total_pages) {
        return pages.length + 1
      } else {
        return undefined
      }
    },
  })
}
