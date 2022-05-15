import styles from './BookMark.module.scss'

import { useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import store from 'storejs'
import { IMovieData } from 'types/movie'
import Modal from './modal'

const BookMarkItem = ({ movie, setIsEdited, index, id }: any) => {
  const [isClicked, setIsClicked] = useState(false)
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
    setIsClicked((prev) => !prev)
  }

  const handleBookMarkDeleteClick = () => {
    store.set(
      'bookMark',
      prevBookMarkList.filter((item: IMovieData) => item.imdbID !== currentMovieInfo.imdbID)
    )
    setIsClicked((prev) => !prev)
    setIsBookMarked(false)
    setIsEdited((prev: boolean) => !prev)
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className={styles.movieItemWrapper}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isClicked && (
            <Modal handleBookMarkDeleteClick={handleBookMarkDeleteClick} handleMovieClick={handleMovieClick} />
          )}
          <li>
            <div className={styles.movieItem} onClick={handleMovieClick} role='button' aria-hidden>
              <img src={Poster} alt={Title} />
              <section className={styles.movieInfo}>
                <h2>{Title}</h2>
                <p>{Year}</p>
                <p>{Type}</p>
              </section>
              {isBookMarked && <div className={styles.marker}>⭐️</div>}
            </div>
          </li>
        </div>
      )}
    </Draggable>
  )
}

export default BookMarkItem
