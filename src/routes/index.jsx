import styles from './Routes.module.scss'

import { Routes, Route } from 'react-router-dom'

import SearchList from './Search'
import GNB from 'routes/_shared/GNB'
import BookMark from './BookMark'

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<SearchList />} />
          <Route path='search' element={<SearchList />} />
          <Route path='bookMark' element={<BookMark />} />
          <Route path='*' element={<div>404</div>} />
        </Routes>
        <GNB />
      </div>
    </div>
  )
}

export default App
