import "./languageSelector.css";
const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
    const supportedLanguages = ["java", "python", "javascript"];

    return (
        <div className="editor-language-selector">
            <label className="label">Programming Language</label>
            <select className="language" value={selectedLanguage} onChange={onLanguageChange}>
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