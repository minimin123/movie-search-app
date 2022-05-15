import styles from './SearchList.module.scss'

import { useState } from 'react'

import { SearchIcon } from 'assets/svgs'

const LNB = ({ setMovieTitle, setPageNumber, setIsTitleChanged }: any) => {
  const [title, setTitle] = useState('')

  const handleSearchInput = (e: any) => {
    setTitle(e.target.value)
  }

  const handleSearchClick = (e: any) => {
    e.preventDefault()
    setMovieTitle(title)
    setPageNumber(1)
    setIsTitleChanged(true)
  }

  return (
    <nav className={styles.lnb}>
      <form className={styles.inputWrapper} onSubmit={handleSearchClick}>
        <input type='text' placeholder='검색어를 입력하세요' onChange={handleSearchInput} value={title} />
        <button type='button' onClick={handleSearchClick}>
          <SearchIcon />
        </button>
      </form>
    </nav>
  )
}

export default LNB
