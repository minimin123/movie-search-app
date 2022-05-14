export interface IMovieData {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface IMovieDataAPIRes {
  Search: IMovie[]
  totalResults: number
  Response: string
  Error?: string
}
