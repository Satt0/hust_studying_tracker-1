import Layout from "Components/Layout";
import SelectCoursePage from "Pages/SelectCoursePage";
import EditCoursePage from "Pages/EditCoursePage";
import { Switch, Route } from "react-router-dom";

// import Hooks

import {useCourseList} from 'Helpers/Hooks/useCourse'

function App() {
  const allCourses=useCourseList()
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route key="home" path="/" exact>
            <SelectCoursePage allCourses={allCourses}/>
          </Route>
          <Route  key="edit" path="/edit" exact>
            <EditCoursePage />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
