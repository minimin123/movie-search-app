import styles from './BookMark.module.scss'

import { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import store from 'storejs'

import BookMarkItem from './Item'

import { IMovieData } from 'types/movie'

const BookMark = () => {
  const [movieData, setMovieData] = useState<never[]>([])
  const [isEdited, setIsEdited] = useState<boolean>(false)

  useEffect(() => {
    setMovieData(store.get('bookMark'))
  }, [isEdited])

  const onDragEnd = (result: any) => {
    const { destination, source } = result

    if (!destination) return
    if (destination === source) return
    const originData = store.get('bookMark')
    const [reorderedData] = originData.splice(source.index, 1)
    originData.splice(destination.index, 0, reorderedData)
    store.set('bookMark', originData)
    setIsEdited((prev) => !prev)
  }

  return (
    <main className={styles.bookMarkMain}>
      <div className={styles.bookMarkWrapper}>
        <h1>내 즐겨찾기</h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='movieList'>
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {movieData?.map((movie: IMovieData, index) => (
                  <BookMarkItem
                    key={movie.imdbID}
                    movie={movie}
                    setIsEdited={setIsEdited}
                    id={movie.imdbID}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </main>
  )
}

export default BookMark
