import React, { useState } from "react";
import { useDispatch } from "react-redux";
import RichText from "./rich-text.js";
import MultipleSelect from "./multi-select.js";
import { addNewQuestion } from "../../../reducers/questionSlice.js";
import { sendError } from "../../../services/alert.service.js";
import "./question-form.css";
import "../questions.css";

const difficulties = ["Easy", "Medium", "Hard"];

// Empty Form (question has additional id field set after calling addQuestion)
const initialState = {
  title: "",
  categories: [],
  description: "",
  complexity: "",
};

const EMPTY_DESCRIPTION = "<p><br></p>";

const QuestionForm = () => {
  const [formData, setFormData] = useState(initialState);
  const { title, categories, description, complexity } = formData;
  const dispatch = useDispatch();
  const onDescriptionChange = (value) => {
    // If not form data's initial state
    if (value !== EMPTY_DESCRIPTION) {
      return setFormData({ ...formData, description: value });
    }
  };

  // Update the state with the selected values
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    const noneEmpty = Object.values(formData).every(
      (field) => field !== null && field !== ""
    );
    const hasCat = formData.categories.length > 0;
    const hasDesc = formData.description.replace(/<(?!img\s)[^>]*>/g, "").trim().length !== 0;

    const isValid = noneEmpty && hasCat && hasDesc;

    if (isValid) {
      try {
        await dispatch(addNewQuestion(formData)).unwrap();
        setFormData(initialState);
      } catch (error) {
        sendError(dispatch, error.message);
      }
    } else {
      sendError(dispatch, "All fields must be filled");
    }
  };

  return (
    <div className="post-form">
      <p className="section-title" align="left">
        Add New Questions
      </p>

      <form onSubmit={onSubmit}>
        <div className="body">
          <div className="column left">
            <input
              className="field"
              type="text"
              name="title"
              placeholder="Title *"
              value={title}
              onChange={onChange}
            />
            <RichText value={description} setValue={onDescriptionChange} />
            <div className="btn-container">
              <input type="submit" className="btn" value="Submit"></input>
            </div>
          </div>

          <div className="column right">
            <MultipleSelect categories={categories} onChange={onChange} />
            <select
              name="complexity"
              value={complexity}
              onChange={onChange}
              className="field"
            >
              <option value="" disabled hidden>
                Complexity
              </option>
              {difficulties.map((dif, i) => (
                <option value={dif} key={i}>
                  {dif}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
