import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {getClassInformation} from 'Helpers/API/SampleAPI'
import Type from 'Store/TYPE'
import styles from 'Assets/Scss/Component/ShowSelectedCourse.module.scss'
const tableColumn=[
    {name:"Mon",id:2},
    {name:"Tue",id:3},
    {name:"Wed",id:4},
    {name:"Thu",id:5},
    {name:"Fri",id:6},
    {name:"Sat",id:7},
]
const tableRow=[
    {name:"6:00"},
    {name:"8:00"},
    {name:"10:00"},
    {name:"12:00"},
    {name:"14:00"},
    {name:"16:00"},
    {name:"18:00"},

]
export default function ShowSelectedCourse() {

    const mutex=useSelector(state=>state.selected.mutex)
    const [shedule,setSchedule]=React.useState([])
    const heightRef=React.useRef(null)
    const dispatch=useDispatch()
    const courseList=useSelector(state=>state.selected.courses)
    const [height,setHeight]=React.useState(0)
    const onDelete=({classId,courseId})=>{
        dispatch({type:Type.removeCourse,payload:{classId,courseId}})
    }
    React.useEffect(()=>{
           
            const onResize=()=>{
                if(heightRef.current){
                    const height=heightRef.current.getBoundingClientRect().height
                    setHeight(height)
                }
            }
            onResize()
            window.addEventListener('resize',onResize)
            return ()=>{
                window.removeEventListener('resize',onResize)
            }
    },[heightRef])
    React.useEffect(()=>{
            const newSchedule=[]
            courseList.forEach(course=>{
                const {week_day,time_last,course_id,course_type,class_id}=course.main
                const deleteProps={
                    classId:class_id,courseId:course_id
                }
                newSchedule.push({deleteProps,wd:week_day,time:time_last,class:class_id,name:course_id,type:course_type})
                if(course?.sub?.course_id){
                    const {week_day,time_last,course_id,course_type,class_id}=course.sub
                    newSchedule.push({deleteProps,wd:week_day,time:time_last,class:class_id,name:course_id,type:course_type})

                }
            })
            setSchedule(newSchedule)            
    },[courseList])
    // React.useEffect(()=>{
    //     if(mutex.isLock){
    //         if(mutex.queue.length>0){
    //            const course= getClassInformation({...mutex.queue[0]})
    //            dispatch({type:Type.insertSelectedCourse,payload:{main:course.thisCourse,sub:course.subCourse}})
    //         }


    //         dispatch({type:Type.startAddCourse})
    //     }
    // },[mutex,dispatch])
    return (
        <div className={styles.container}>
           
            <div className={styles.calendar}>
                <div className={styles.rowHead}>
                    <div style={{opacity:0}}>time</div>
                    <div className={styles.rowHeadBody} ref={heightRef}>
                    {tableRow.map(e=><li className={styles.rowHeadItem}>{e.name}</li>)}

                    </div>
                </div>
                {tableColumn.map((e)=><div className={styles.col}>
                    <div className={styles.rowColTitle}>
                        {e.name} 
                    </div>
                   <div className={styles.rowBody}>
                   <li className={styles.course}>
                           {shedule.filter(c=>c.wd===e.id).map(course=><li style={{top:calTop(course.time,height),height:calHeight(course.time,height)}} className={styles.courseItem}>
                                <p>{course.name}  <strong onClick={()=>{onDelete(course.deleteProps)}} style={{color:'red',position:"absolute",right:4,cursor:'pointer'}}>X</strong></p>
                                <p>{course.type}</p>
                                <p>{course.time}</p>
                                <p>{course.class}</p>

                           </li>)}
                       </li>
                   {tableRow.map(e=><li className={styles.rowBodyItem}>
                    

                   </li>)}
                   </div>

                    
                </div>)}

            </div>
        </div>
    )
}



const calTop=(time,height)=>{
    const range=1800-500;
    const start=parseInt(time.split('-')[0])
   const offset=(start-500) / range
   
   return offset*height

}
const calHeight=(time,height)=>{
    
    const start=parseInt(time.split('-')[0])
    const end=parseInt(time.split('-')[1])
    const elHeight=end-start
    
    return elHeight/(1800-500) * height

}