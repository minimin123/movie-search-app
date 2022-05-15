import styles from './SearchList.module.scss'

import { useEffect, useState } from 'react'
import store from 'storejs'

import Modal from './modal'

import defaultImage from '../../assets/movie.jpeg'
import { FilledHeartIcon, HeartIcon } from 'assets/svgs'

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
          <div className={styles.marker}>{isBookMarked ? <FilledHeartIcon /> : <HeartIcon />}</div>
        </div>
      </li>
    </div>
  )
}

export default MovieItem
