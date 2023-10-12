import { FaUser } from "react-icons/fa";
import "./userAvatar.css";
import { Link } from "react-router-dom";

const UserAvatar = () => {    
    return (
        <div className="profile-icon">
            <Link className="links" to="/profile"> <FaUser className="icon"/> <p>View profile</p></Link>
        </div>
    )
}

export default UserAvatar;