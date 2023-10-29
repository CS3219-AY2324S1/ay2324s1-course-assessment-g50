import "./languageSelector.css";
const LanguageSelector = ({ selectedLanguage, handleLanguageChange }) => {
    const supportedLanguages = ["java", "python", "javascript"];

    return (
        <div className="editor-language-selector-container">
            <label className="label">Programming Language</label>
            <select className="language" value={selectedLanguage} onChange={handleLanguageChange}>
                {supportedLanguages.map((lang) => (
                    <option key={lang} value={lang}>
                        {lang}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;