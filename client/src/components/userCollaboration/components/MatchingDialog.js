import { Dialog } from "@mui/material";
import "./matchingDialog.css";
import { useState } from "react";
import { SingleSelect, MultipleSelect } from "./MatchingOptions";
import { useNavigate } from "react-router-dom";
import {establishingConnectionAction} from "../../../reducers/matchingSlice";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  categories: [],
  complexity: "",
};

const EMPTY_FIELDS = 'Please select all options';


/* Pop out window for users to select various options regarding matching with another user */
const MatchingDialog = ({ dialogIsOpen, setDialogIsOpen }) => {
  const [categories, setCategories] = useState([]);
  const [complexity, setComplexity] = useState();
  const [fieldsAreEmpty, setFieldsAreEmpty] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const availableCategories = useSelector(state => state.questions.availableCategories);
  const availableComplexities = useSelector(state => state.questions.availableComplexities);

  const handleClose = () => {
    setDialogIsOpen(false);
  }

  const categoriesOnChange = (e) => {
    setCategories(e.target.value);
  }

  const complexityOnChange = (e) => {
    setComplexity(e.target.value);
  }

  const handleStartMatching = () => {
    if (complexity && categories.length !== 0) {
      dispatch(establishingConnectionAction({
        complexity: complexity,
        categories: categories,
      }));
      navigate("/solve-question");
    } else {
      setFieldsAreEmpty(true);
      setTimeout(() => setFieldsAreEmpty(false), 3000);
    }

  }

  return (
    <Dialog open={dialogIsOpen} onClose={handleClose} className="dialog-box">
      <p className="title">Select your options for questions</p>
      <MultipleSelect availableCategories={availableCategories} categories={categories} onChange={categoriesOnChange}/>
      <SingleSelect availableComplexities={availableComplexities} complexity={complexity} onChange={complexityOnChange}/>
      {fieldsAreEmpty && <p className="warning">Please select all options</p>}
      <div className="start-match-button" onClick={handleStartMatching}>Start Matching</div>
    </Dialog>
    
    )
}

export default MatchingDialog;