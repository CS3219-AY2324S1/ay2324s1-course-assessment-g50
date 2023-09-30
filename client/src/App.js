import axios from 'axios';
import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Alerts from "./components/alerts/alerts";
import Question from "./components/questions/questions";
import UserProfileManager from "./components/user-profile-manager/UserProfileManager";
import "./App.css";

/* To enable sending of cookies on each request globally*/
axios.defaults.withCredentials = true;

const App = () => (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<QuestionPage />} />
        <Route path="/profile/*" element={<UserProfileManager />} />
      </Routes>
    </div>
  </Router>
);

const QuestionPage = () => (
  <div>
    <Question />
    <Alerts />
    <Link to="/profile">Go to Profile</Link>
  </div>
);

export default App;
