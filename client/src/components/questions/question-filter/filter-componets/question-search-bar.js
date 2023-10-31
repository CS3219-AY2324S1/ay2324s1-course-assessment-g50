import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions, selectFilters, updateFilter } from '../../../../reducers/questionSlice';
import TextField from "@mui/material/TextField";
import "./question-search-bar.css";

const QuestionSearchBar = () => {
    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);

    const handleTextChange = (e) => {
        const inputText = e.target.value
        // update filter keywords
        dispatch(updateFilter({ keyword: inputText || null }));
    }

    const handleKeyDown = (e) => {
        // Check if user 'Enter' key
        if (e.key === 'Enter') {
            dispatch(fetchQuestions(filters))
        }
    };

    return (
        <div className="question-search-bar">
            <div className="search-container">
                <TextField
                    id="outlined-basic"
                    onChange={handleTextChange}
                    onKeyDown={handleKeyDown}
                    variant="outlined"
                    fullWidth
                    label="Search"
                />
            </div>
        </div>
    );
}

export default QuestionSearchBar