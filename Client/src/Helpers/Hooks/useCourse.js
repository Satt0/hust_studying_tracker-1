import { useState,useEffect } from "react";
import course from "Assets/Sample/course";
const genListOfCourse = (raw) => {

  const map = {};
  const output = [];
  course.forEach((item) => {
   
  
   if(item.sub_class_id!=="NULL"){
    if (map[item["course_id"]]) {
      output[map[item["course_id"]].index].count += 1;
      return;
    }
    output.push({
      course_id: item.course_id,
      course_name: item.course_name,
      type: item.course_type,
      amount: item.amount,
      count: 1,
    });

    map[item["course_id"]] = {
      index: output.length - 1,
    };
   
   }
    return;
  });
  return output
};
export function useCourseList() {
  
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(genListOfCourse(course));
  }, []);

  return data;
}
