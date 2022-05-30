import { axios } from 'hooks/worker'
import { IMovieDataAPIRes } from 'types/movie'

const URL = 'https://www.omdbapi.com'
const API_KEY = process.env.REACT_APP_API_KEY

interface Params {
  s: string
  page: number
}

export const getMovieDataApi = (params: Params) =>
  axios.get<IMovieDataAPIRes>(`${URL}/?apikey=${API_KEY}`, {
    params,
  })
