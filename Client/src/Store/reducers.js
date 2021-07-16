import { combineReducers } from "redux";

import Type from "./TYPE";

const userDefault = {
  userid: null,
  logInStatus: null,
  name: null,
};
const pickedDefault = {
  courses: [],
};
const selectedDefault = {
  courses: [],
  mutex: {
    isLock: false,
    queue: [],
  },
};

const user = (state = userDefault, action) => {
  return state;
};
const cart = (state = pickedDefault, action) => {
  if (action.type === Type.addToCart) {
    const found = state.courses.find((e) => e.id === action.payload.id);
    if (found) {
      const newCourse = state.courses.filter((e) => e.id !== found.id);
      return { ...state, courses: newCourse };
    }
    const newCourse = [...state.courses, action.payload];
    return { ...state, courses: newCourse };
  }

  return state;
};
const selected = (state = selectedDefault, action) => {
  if (action.type === Type.prepareAddCourse) {
    const newQueue = [...state.mutex.queue, action.payload];
    return {
      ...state,
      mutex: { ...state.mutex, isLock: true, queue: newQueue },
    };
  } else if (action.type === Type.startAddCourse) {
    const newQueue = [...state.mutex.queue].slice(1);
    return {
      ...state,
      mutex: { ...state.mutex, isLock: false, queue: newQueue },
    };
  } else if (action.type === Type.insertSelectedCourse) {
    const newState = [...state.courses, action.payload];
    return { ...state, courses: newState };
  }else if(action.type===Type.removeCourse){
    const {classId,courseId}=action.payload

    const newState=state.courses.filter(e=>!(e.main.class_id===classId && e.main.course_id===courseId))
    return {...state,courses:newState}
  }
  return state;
};
// picked - select from all courses list

// selected -- select from picked list
export default combineReducers({
  user,
  cart,
  selected,
});
