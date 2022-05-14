import styles from './SearchList.module.scss'
import { debounce } from 'lodash'

const LNB = ({ setMovieTitle, setPageNumber, setIsTitleChanged }: any) => {
  const handleSearchInput = (e: any) => {
    debounceOnChange(e)
  }

  const debounceOnChange = debounce((e: any) => {
    setMovieTitle(e.target.value)
    setPageNumber(1)
    setIsTitleChanged(true)
  }, 500)

  return (
    <nav className={styles.lnb}>
      <input type='text' placeholder='검색어를 입력하세요' onChange={handleSearchInput} />
    </nav>
  )
}

export default LNB
