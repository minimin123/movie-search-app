import styles from './BookMark.module.scss'
import { useEffect, useState } from 'react'
import store from 'storejs'
import BookMarkItem from './Item'

const BookMark = () => {
  const [movieData, setMovieData] = useState<any>([])
  const [isEdited, setIsEdited] = useState(false)

  useEffect(() => {
    setMovieData(store.get('bookMark'))
  }, [isEdited])

  return (
    <main className={styles.bookMarkMain}>
      <div className={styles.bookMarkWrapper}>
        <h1>내 즐겨찾기</h1>
        <ul>
          {movieData?.map((movie: any) => (
            <BookMarkItem key={movie.imdbID} movie={movie} setIsEdited={setIsEdited} />
          ))}
        </ul>
      </div>
    </main>
  )
}

export default BookMark
