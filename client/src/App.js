import axios from "axios";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Alerts from "./components/alerts/alerts";
import Question from "./components/questions/questions";
import UserProfileManager from "./components/user/UserAuthentication";
import Profile from "./components/user/Profile";
import PrivateRoute from "./components/routing/privateRoute";
import "./App.css";

/* To enable sending of cookies on each request globally*/
axios.defaults.withCredentials = true;

const App = () => (
  <Router>
    <Alerts />
    <Routes>
      <Route path="/" element={<PrivateRoute component={Question}/>} />
      <Route path="/login" element={<UserProfileManager />} />
      <Route path="/profile" element={<PrivateRoute component={Profile}/>} />
    </Routes>
  </Router>
);

export default App;
