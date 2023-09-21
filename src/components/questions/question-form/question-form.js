import React, { useState } from "react";
import { useDispatch } from "react-redux";
import RichText from "./rich-text.js";
import { addNewQuestion } from "../../../reducers/questionSlice.js";
import { sendError } from "../../../services/alert.service.js";
import "./question-form.css";
import "../questions.css";

// Option Fields (hardcode or save to db?)
// prettier-ignore
const category_list = [
  "Array", "String", "Hash Table", "Math", "Dynamic Programming", "Sorting", 
  "Greedy", "Depth-First Search", "Binary Search", "Database", "Breadth-First Search", 
  "Tree", "Matrix", "Two Pointers", "Binary Tree", "Bit Manipulation", 
  "Heap (Priority Queue)", "Stack", "Prefix Sum", "Graph", "Simulation", 
  "Design", "Counting", "Backtracking", "Sliding Window", "Union Find", 
  "Linked List", "Ordered Set", "Enumeration", "Monotonic Stack", "Trie", 
  "Recursion", "Divide and Conquer", "Bitmask", "Number Theory", "Queue", 
  "Binary Search Tree", "Segment Tree", "Memoization", "Geometry", "Topological Sort", 
  "Binary Indexed Tree", "Hash Function", "Game Theory", "Shortest Path", "Combinatorics", 
  "Interactive", "String Matching", "Data Stream", "Rolling Hash", "Brainteaser", 
  "Randomized", "Monotonic Queue", "Merge Sort", "Iterator", "Concurrency", 
  "Doubly-Linked List", "Probability and Statistics", "Quickselect", "Bucket Sort", 
  "Suffix Array", "Minimum Spanning Tree", "Counting Sort", "Shell", "Line Sweep", 
  "Reservoir Sampling", "Strongly Connected", "Component", "Eulerian Circuit", 
  "Radix Sort", "Rejection Sampling", "Biconnected Component"
];

const difficulties = ["Easy", "Medium", "Hard"];

// Empty Form (question has additional id field set after calling addQuestion)
const initialState = {
  title: "",
  categories: [],
  description: "",
  complexity: "",
};

const QuestionForm = () => {
  const [formData, setFormData] = useState(initialState);
  const { title, categories, description, complexity } = formData;
  const dispatch = useDispatch();

  const onCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setFormData({ ...formData, categories: selectedOptions });
  };

  const onDescriptionChange = (value) =>
    setFormData({ ...formData, description: value });

  // Update the state with the selected values
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    const isValid = Object.values(formData).every(
      (field) => field !== null && field !== ""
    );

    if (isValid) {
      dispatch(addNewQuestion(formData));
      setFormData(initialState);

      setTimeout(() => {}, 1000);
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
            <select
              name="categories"
              value={categories}
              onChange={onCategoryChange}
              className="field"
              multiple
            >
              <option value="" disabled hidden>
                categories
              </option>
              {category_list.map((cat, i) => (
                <option value={cat} key={i}>
                  {cat}
                </option>
              ))}
            </select>
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
