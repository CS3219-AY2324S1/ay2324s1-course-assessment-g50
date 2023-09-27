import "./App.css";
import React from "react";
import UserProfileManager from "./components/user-profile-manager/UserProfileManager";
import Question from "./components/questions/questions";
import Alerts from "./components/alerts/alerts";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

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
