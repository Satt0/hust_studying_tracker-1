import React from 'react'
import styles from 'Assets/Scss/Page/EditCoursePage.module.scss'
import CourseDisplayAvailable from 'Components/CourseDisplayAvailable'
import ShowSelectedCourse from 'Components/ShowSelectedCourse'
export default function EditCoursePage() {
    return (
        <div className={styles.container}>
            <div className={styles.availableWrapper}>
                <CourseDisplayAvailable/>
            </div>
            <div>
                <ShowSelectedCourse/>
            </div>
        </div>
    )
}
