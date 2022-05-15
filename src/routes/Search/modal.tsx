import styles from './SearchList.module.scss'

interface Props {
  isBookMarked: boolean
  handleBookMarkDeleteClick: () => void
  handleBookMarkAddClick: () => void
  handleMovieClick: () => void
}
const Modal = ({ isBookMarked, handleBookMarkDeleteClick, handleBookMarkAddClick, handleMovieClick }: Props) => {
  return (
    <section className={styles.bookMarkPopup}>
      <button
        type='button'
        onClick={isBookMarked ? handleBookMarkDeleteClick : handleBookMarkAddClick}
        className={styles.pinkButton}
      >
        {isBookMarked ? '즐겨찾기 취소' : '즐겨찾기 등록'}
      </button>
      <button type='button' className={styles.whiteButton} onClick={handleMovieClick}>
        닫기
      </button>
    </section>
  )
}

export default Modal
