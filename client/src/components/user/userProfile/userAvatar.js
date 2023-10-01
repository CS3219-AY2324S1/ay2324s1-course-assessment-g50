import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import "./userAvatar.css";
import { Link } from "react-router-dom";
import { selectIsLoggedIn } from '../../../reducers/userSlice';

const UserAvatar = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn); 
    
    return (
        <div className="profile-icon">
            { isLoggedIn
            ? <Link className="links" to="/profile"> <FaUser className="icon"/> <p>View profile</p></Link>
            : <Link className="links" to="/login"><FaUser className="icon"/> <p>Login here</p></Link>
            }
        </div>
    )
}


export default UserAvatar;