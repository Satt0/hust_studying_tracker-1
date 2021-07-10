import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider ,useSelector} from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./Store";
import "Assets/Css/reset.css";
import "Assets/Css/global.css";

//
import LoginPage from 'Pages/LoginPage'
const CheckUserExists=()=>{
  const isLoggedIn=useSelector(state=>state.user.logInStatus)


  if(typeof isLoggedIn){
    return <App/>
  }
  return <LoginPage/>
}


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CheckUserExists/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
