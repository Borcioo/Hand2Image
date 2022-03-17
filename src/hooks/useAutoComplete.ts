import { useQuery } from "react-query"
import { requestHint } from "../utils/axios"

interface AutoCompleteData {
  data: {
    did_you_mean: Hints[]
    autocomplete: Hints[]
  }
}
export interface Hints {
  query: string
  length: number
}

const fetchAutoComplete = (input: string) => {
  return requestHint({ url: `/api/${input}` })
}

export const useAutoComplete = (onSuccess: (data: AutoCompleteData) => void, onError: (data: []) => void, input: string) => {
  return useQuery(["autocomplete", input], () => fetchAutoComplete(input), {
    enabled: false,
    onSuccess,
    onError,
    select: (data: AutoCompleteData) => {
      return data
    },
  })
}
