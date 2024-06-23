import { Link } from "react-router-dom";
import UserForm from "../users/UserForm";
import LogoutButton from "../users/LogoutButton";

type NavbarProps = {
  isLoggedIn: boolean;
  onLogin: (token: string) => void;
  onLogout: () => void;
};  


const Navbar: React.FC<NavbarProps> = ({isLoggedIn, onLogin, onLogout}) => {
  return (
    <nav>
      <h1>What's it on?</h1>
      <div className="nav-buttons-container">
        <button className="nav-button">
          <Link to="/">Search</Link>
        </button>
        <button className="nav-button">
          <Link to="/watchlist">Watchlist</Link>
        </button>
        {!isLoggedIn && <UserForm onLogin={onLogin} />}
      {isLoggedIn && <LogoutButton onLogout={onLogout} />}
      </div>
    </nav>
  );
};
export default Navbar;