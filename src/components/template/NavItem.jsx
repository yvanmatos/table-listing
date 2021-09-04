import "./NavItem.css";
import { Link } from "react-router-dom";

const NavItem = (props) => {
  return (
    <Link to={`${props.destination}`}>
      <i className={`fa fa-${props.icon}`} /> {props.page}
    </Link>
  );
};

export default NavItem;
