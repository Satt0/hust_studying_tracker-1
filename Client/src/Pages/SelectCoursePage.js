import React from 'react'
import styles from 'Assets/Scss/Page/SelectCoursePage.module.scss'
import CourseDisplayTable from 'Components/CourseDisplayTable'
export default function SelectCoursePage({allCourses}) {
    return (
        <div className={styles.container}>
                <div className={styles.courseDisplayWrapper}>
                    <CourseDisplayTable data={allCourses}/>
                </div>
        </div>
    )
}
