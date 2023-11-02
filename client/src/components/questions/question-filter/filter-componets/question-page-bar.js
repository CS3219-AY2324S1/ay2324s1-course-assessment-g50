import React, { useState, } from 'react';
import { useDispatch, } from 'react-redux';
import { Select, MenuItem, FormControl, Pagination } from '@mui/material';
import './question-page-bar.css';
import { updateFilter } from '../../../../reducers/questionSlice';

const QuestionPageBar = ({ totalPages }) => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        dispatch(updateFilter({ page: newPage }))
    };

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        dispatch(updateFilter({ pageSize: newPageSize }))
    };

    return (
        <div className="question-page-container">
            <div className="question-page-seletor">
                <FormControl>
                    <Select
                        value={pageSize}
                        onChange={(e) => handlePageSizeChange(e.target.value)}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="question-page-number">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(event, value) => handlePageChange(value)}
                    color="primary"
                />
            </div>
        </div>
    );
};

export default QuestionPageBar;