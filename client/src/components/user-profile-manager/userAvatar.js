import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "./userAvatar.css";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import { selectCookie } from '../../reducers/userSlice';

const UserAvatar = () => {
    const validCookie = useSelector(selectCookie); 
    
    return (
        <div className="profile-icon">
            <FaUser className="icon"/>
            { validCookie
            ? <Link className="links" to="/profile"> View profile</Link>
            : <Link className="links" to="/login">Login here</Link>
            }
        </div>
    )
}


export default UserAvatar;