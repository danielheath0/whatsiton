import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h1>What's it on?</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/watchlist">Watchlist</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
