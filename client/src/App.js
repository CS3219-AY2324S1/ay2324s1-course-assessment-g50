import axios from "axios";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Alerts from "./components/alerts/alerts";
import Question from "./components/questions/questions";
import QuestionForm from "./components/question-form/question-form";
import UserProfileManager from "./components/user/UserAuthentication";
import Profile from "./components/user/Profile";
import PrivateRoute from "./components/routing/privateRoute";
import AdminRoute from "./components/routing/adminRoute";
import SolveQuestion from "./components/userCollaboration/SolveQuestion.js";
import "./App.css";
import Navbar from "./components/navbar/navbar.js";

/* To enable sending of cookies on each request globally */
axios.defaults.withCredentials = true;

const App = () => (
  <Router>
    <Navbar />
    <Alerts />
    <Routes>
      <Route path="/" element={<PrivateRoute component={Question}/>} />
      <Route path="/add-questions" element={<AdminRoute component={QuestionForm}/>} />
      <Route path="/login" element={<UserProfileManager />} />
      <Route path="/profile" element={<PrivateRoute component={Profile}/>} />
      <Route path="/solve-question" element={<PrivateRoute component={SolveQuestion}/>} />
    </Routes>
  </Router>
);

export default App;
