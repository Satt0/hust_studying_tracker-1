import React from 'react'
import NavBar from './NavBar'
import styles from 'Assets/Scss/Component/Layout.module.scss'
export default function Layout({children}) {
    return (
        <div className={styles.container}>
            <NavBar/>
            {children}
        </div>
    )
}
