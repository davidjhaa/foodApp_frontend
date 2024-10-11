import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import "../Styles/nav.css";


function NavBar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();  
    } 
    catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav>
      <div className="menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/allPlans">Plans</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/profilePage">{user.name || "Profile"}</Link> 
              </li>
              <li>
                <button className="logoutBtn" onClick={handleLogout}>Logout</button> 
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;

