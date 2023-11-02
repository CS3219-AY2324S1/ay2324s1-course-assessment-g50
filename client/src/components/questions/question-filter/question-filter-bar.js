import React from 'react';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../../../reducers/questionSlice';
import QuestionSearchBar from '../question-filter/filter-componets/question-search-bar'
import { Autocomplete, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { category_list } from '../question-form/multi-select';
import './question-filter-bar.css'

const QuestionFilterBar = () => {
  const dispatch = useDispatch();

  const handleDifficultyChange = (e) => {
    const newDifficulty = e.target.value
    // update difficulty filters
    dispatch(updateFilter({ complexity: newDifficulty }));
  }

  const handleTagChange = (e, newValue) => {
    const newTags = newValue
    // update tag values
    dispatch(updateFilter({ topicSlugs: newTags }))
  }

  return (
    <div className="question-filter-bar">
      <div className='question-difficulty-container'>
        <FormControl className='difficulty'>
          <InputLabel id="difficulty-filter-label">Difficulty</InputLabel>
          <Select labelId="difficulty-filter-label" onChange={handleDifficultyChange}>
            <MenuItem value="Easy">Easy</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Hard">Hard</MenuItem>
            <MenuItem value="" style={{ background: 'red', color: 'white' }}>Reset</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className='question-tag-container'>
        <Autocomplete className='tag'
          onChange={handleTagChange}
          multiple
          options={category_list}
          renderInput={(params) => <TextField {...params} label="Tags" />}
          isOptionEqualToValue={(option, value) => option === value}
        />
      </div>
      <QuestionSearchBar />
    </div>
  );
};

export default QuestionFilterBar;