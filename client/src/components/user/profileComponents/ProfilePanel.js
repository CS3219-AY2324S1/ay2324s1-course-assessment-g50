import "./profilePanel.css";

const ProfilePanel = ( {onclick, sectionName, selected, Icon} ) => {

    return (
        <div className={"panel " + (selected === sectionName ? "selected" : "")} onClick={() => onclick(sectionName)}>
            <p>{sectionName}</p>
            {Icon && Icon}
        </div>
    )
}

export default ProfilePanel;