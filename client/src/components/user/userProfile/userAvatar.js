import { FaUser } from "react-icons/fa";
import "./userAvatar.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

/* This is the component for the question table page */
const UserAvatar = () => {    
    const isLoggedIn = useSelector((state) => state.currentUser.isLoggedIn);
    return (
        <div className="profile-icon">
            <Link className="links" to="/profile"> <FaUser className="icon"/> <p>{isLoggedIn ? "View profile" : "Login"}</p></Link>
        </div>
    )
}

export default UserAvatar;