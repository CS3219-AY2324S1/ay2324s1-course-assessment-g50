import axios from "axios";
import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Alerts from "./components/alerts/alerts";
import Question from "./components/questions/questions";
import UserProfileManager from "./components/user-profile-manager/UserProfileManager";
import Profile from "./components/user-profile-manager/Profile";
import "./App.css";

/* To enable sending of cookies on each request globally*/
axios.defaults.withCredentials = true;

const App = () => {

  
  return (<Router>
      <Routes>

        <Route path="/" element={<QuestionPage />} />
        
        <Route>
          <Route path="/login" element={<UserProfileManager />}/>
          <Route path="/profile" element={<Profile />}/>
        </Route>

      </Routes>
  </Router>)
};

const QuestionPage = () => (
  <div>
    <Question />
    <Alerts />
  </div>
);

export default App;
