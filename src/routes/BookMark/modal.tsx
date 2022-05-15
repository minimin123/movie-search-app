import styles from './BookMark.module.scss'

const Modal = ({ handleBookMarkDeleteClick, handleMovieClick }: any) => {
  return (
    <section className={styles.bookMarkPopup}>
      <button type='button' onClick={handleBookMarkDeleteClick} className={styles.pinkButton}>
        즐겨찾기 취소
      </button>
      <button type='button' className={styles.whiteButton} onClick={handleMovieClick}>
        닫기
      </button>
    </section>
  )
}

export default Modal
