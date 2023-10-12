import { FaUser } from "react-icons/fa";
import "./userAvatar.css";
import { Link } from "react-router-dom";

/* This is the component for the question table page */
const UserAvatar = () => {    
    return (
        <div className="profile-icon">
            <Link className="links" to="/profile"> <FaUser className="icon"/> <p>View profile</p></Link>
        </div>
    )
}

export default UserAvatar;