import "./Logo.css";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <aside className="logo">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
    </aside>
  );
};

export default Logo;
