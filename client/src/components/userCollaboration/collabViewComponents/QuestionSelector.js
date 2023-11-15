import "./questionSelector.css";
const QuestionSelector = ({ selectedQuestion, fetchedQuestions, handleQuestionChange }) => {
    return (
        <div className="editor-question-selector-container">
            <label className="label">Questions Language</label>
            <select className="question" value={selectedQuestion} onChange={handleQuestionChange}>
                {fetchedQuestions.map((question) => (
                    <option key={question} value={question}>
                        {question}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default QuestionSelector;