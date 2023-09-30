import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import "./userAvatar.css";
import { Link } from "react-router-dom";
import { selectCookie } from '../../reducers/userSlice';

const UserAvatar = () => {
    const validCookie = useSelector(selectCookie); 
    
    return (
        <div className="profile-icon">
            { validCookie
            ? <Link className="links" to="/profile"> <FaUser className="icon"/> <p>View profile</p></Link>
            : <Link className="links" to="/login"><FaUser className="icon"/> <p>Login here</p></Link>
            }
        </div>
    )
}


export default UserAvatar;