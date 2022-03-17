import React, { useEffect, useState } from "react"
import { useAutoComplete } from "../../hooks/useAutoComplete"
import AutoCompleteHints from "../autoCompleteHints"
import BeatLoader from "react-spinners/BeatLoader"

interface Props {
  input: string
}

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

const AutoComplete = (props: Props) => {
  const { input } = props
  const [hints, setHints] = useState<Hints[] | undefined | []>([])

  const onSuccess = (data: AutoCompleteData) => {
    if (typeof data !== "undefined") {
      const autoCompleteData = data.data
      if (autoCompleteData.autocomplete.length > 0) {
        setHints(autoCompleteData.autocomplete)
      } else if (autoCompleteData.did_you_mean.length > 0) {
        setHints(autoCompleteData.did_you_mean)
      } else {
        setHints(undefined)
      }
    }
  }

  const onError = (data: any) => {
    console.log("Error", data)
  }

  const { isLoading, refetch } = useAutoComplete(onSuccess, onError, input)

  useEffect(() => {
    if (input.length >= 3) {
      refetch()
    } else {
      setHints([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input])

  if (isLoading) {
    return (
      <div className='loader-container'>
        <BeatLoader color={"#000"} loading={true} size={10} />
      </div>
    )
  }

  if (hints === undefined) {
    return <p>Brak wyników...</p>
  }

  return <AutoCompleteHints reset={setHints} data={hints} />
}

export default AutoComplete
