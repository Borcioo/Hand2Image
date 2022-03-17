import axios from "axios"

const client = axios.create({ baseURL: "https://api.unsplash.com/" })

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Client-ID ` + process.env.REACT_APP_ACCESS_KEY
  const onSuccess = (response: any) => response
  const onError = (error: any) => {
    return error
  }
  return client(options).then(onSuccess).catch(onError)
}

const clientHint = axios.create()

export const requestHint = ({ ...options }) => {
  const onSuccess = (response: any) => response
  const onError = (error: any) => {
    return error
  }
  return clientHint(options).then(onSuccess).catch(onError)
}
