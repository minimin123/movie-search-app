import styles from './SearchList.module.scss'

import React, { FormEventHandler, useState } from 'react'

import { SearchIcon } from 'assets/svgs'

interface Props {
  setMovieTitle: (_: string) => void
  setPageNumber: (_: number) => void
  setIsTitleChanged: (_: boolean) => void
}
const LNB = ({ setMovieTitle, setPageNumber, setIsTitleChanged }: Props) => {
  const [title, setTitle] = useState('')

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement> | FormEventHandler<HTMLFormElement> | any) => {
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
