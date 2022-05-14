import styles from './SearchList.module.scss'
import { useEffect, useRef, useState, Suspense } from 'react'
import MovieItem from './Item'
import LNB from './lnb'
import _ from 'lodash'
import { getMovieDataApi } from 'services/movie'

const SearchList = () => {
  const [movieData, setMovieData] = useState<never[]>([])
  const [movieTitle, setMovieTitle] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [isTitleChanged, setIsTitleChanged] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('검색 결과가 없습니다.')

  const uniqueIdData = _.uniqBy(movieData, 'imdbID')

  const fetchMoreTrigger = useRef<any>()
  const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) setPageNumber((prev) => prev + 1)
  })

  useEffect(() => {
    fetchMoreObserver.observe(fetchMoreTrigger.current)
    const observerRefValue = fetchMoreTrigger.current
    return () => {
      if (observerRefValue) fetchMoreObserver.unobserve(observerRefValue)
    }
  }, [])

  useEffect(() => {
    getMovieDataApi({ s: movieTitle, page: pageNumber }).then((res) => {
      if (res.data.Response === 'False') {
        switch (res.data.Error) {
          case 'Too many results.': {
            setErrorMsg('검색 결과가 너무 많습니다.')
            break
          }
          case 'Movie not found!': {
            if (!isTitleChanged) {
              setErrorMsg('마지막 페이지입니다.')
              return
            }
            setErrorMsg('검색 결과가 없습니다.')
            break
          }
        }
        setMovieData([])
        return
      }
      if (isTitleChanged) {
        setErrorMsg('')
        setMovieData([])
        setIsTitleChanged(false)
        return
      }
      setErrorMsg('')
      setMovieData((prev: any) => prev.concat(...res.data.Search))
    })
  }, [pageNumber, movieTitle, isTitleChanged])

  return (
    <Suspense fallback={<div>로딩중</div>}>
      <main>
        <LNB setMovieTitle={setMovieTitle} setPageNumber={setPageNumber} setIsTitleChanged={setIsTitleChanged} />
        <div className={styles.movieSearchWrapper}>
          <div>
            <p className={styles.guidance}>관심있는 영화를 검색하고 즐겨찾기에 추가해 보세요.</p>
            <h1 className={styles.title}>검색 결과</h1>
            <ul>
              <div className={styles.scrollBox}>
                {uniqueIdData?.map((movie: any) => (
                  <MovieItem key={movie.imdbID} movie={movie} />
                ))}
                <strong>{errorMsg}</strong>
              </div>
              <div className={styles.moreButton} ref={fetchMoreTrigger}>
                다음 페이지로
              </div>
            </ul>
          </div>
        </div>
      </main>
    </Suspense>
  )
}

export default SearchList
