import { useEffect, useState } from 'react'
import styles from './SearchList.module.scss'
import store from 'storejs'
import defaultImage from '../../assets/movie.jpeg'
import Modal from './modal'
import { IMovieData } from 'types/movie'

const MovieItem = ({ movie }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isBookMarked, setIsBookMarked] = useState(false)

  const { Title, Type, Poster, Year, imdbID } = movie

  const currentMovieInfo = {
    Title,
    Year,
    Type,
    Poster,
    imdbID,
  }

  const prevBookMarkList = store.get('bookMark')

  useEffect(() => {
    if (prevBookMarkList?.find((el: IMovieData) => el.imdbID === imdbID)) {
      setIsBookMarked(true)
    }
  }, [prevBookMarkList, imdbID])

  const handleMovieClick = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleBookMarkAddClick = () => {
    if (!prevBookMarkList) {
      store.set('bookMark', [currentMovieInfo])
    } else {
      store.set('bookMark', [currentMovieInfo, ...store.get('bookMark')])
    }
    setIsBookMarked(true)
    setIsMenuOpen((prev) => !prev)
  }

  const handleBookMarkDeleteClick = () => {
    store.set(
      'bookMark',
      store.get('bookMark').filter((item: IMovieData) => item.imdbID !== currentMovieInfo.imdbID)
    )
    setIsMenuOpen((prev) => !prev)
    setIsBookMarked(false)
  }

  return (
    <div className={styles.movieItemWrapper}>
      {isMenuOpen && (
        <Modal
          isBookMarked={isBookMarked}
          handleBookMarkDeleteClick={handleBookMarkDeleteClick}
          handleBookMarkAddClick={handleBookMarkAddClick}
          handleMovieClick={handleMovieClick}
        />
      )}
      <li>
        <div className={styles.movieItem} onClick={handleMovieClick} role='button' aria-hidden>
          <img src={Poster === 'N/A' ? defaultImage : Poster} alt={Title} />
          <section className={styles.movieInfo}>
            <h2>{Title}</h2>
            <p>{Year}</p>
            <p>{Type}</p>
          </section>
          {isBookMarked && <div className={styles.marker}>⭐️</div>}
        </div>
      </li>
    </div>
  )
}

export default MovieItem
