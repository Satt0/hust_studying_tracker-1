import courses from 'Assets/Sample/course'

const getCourseAvailableClass=(courseId)=>{
    
    return courses.filter(e=>{
        
        return e.course_id===courseId && e.sub_class_id !== "NULL"
    })
}

const getClassInformation=({classId,courseId})=>{
    const thisCourse=courses.find(e=>e.course_id===courseId && e.class_id===classId)
    const {sub_class_id,class_id}=thisCourse
    if(sub_class_id!==class_id){
        const subCourse=courses.find(e=>e.course_id===courseId && e.class_id===sub_class_id)
        return {thisCourse,subCourse}
    }
    return {thisCourse}

    
}

export {getCourseAvailableClass,getClassInformation}