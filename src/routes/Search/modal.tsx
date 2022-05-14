import styles from './SearchList.module.scss'

const Modal = ({ isBookMarked, handleBookMarkDeleteClick, handleBookMarkAddClick, handleMovieClick }: any) => {
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
