import styles from './GNB.module.scss'

import { NavLink } from 'react-router-dom'
import cx from 'classnames'

const GNB = () => {
  return (
    <nav className={styles.gnb}>
      <ul>
        <li>
          <NavLink to='search' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            검색
          </NavLink>
        </li>
        <li>
          <NavLink to='bookMark' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            즐겨찾기
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default GNB
