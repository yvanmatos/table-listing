import { Link } from "react-router-dom";
import styled from "styled-components";

const Item = styled(Link)`
  display: block;
  text-decoration: none;
  color: #fff;
  font-weight: 300;
  padding: 15px;

  i {
    margin-right: 5px;
  }

  :hover {
    color: #fff;
    background: linear-gradient(135deg, #750bb3 0%, #be32da 100%);
  }

  @media (max-width: 768px) {
    display: inline;
    padding: 10px;
    margin: 0px;
  }
`;

const NavItem = (props) => {
  return (
    <Item to={`${props.destination}`}>
      <i className={`fa fa-${props.icon}`} /> {props.page}
    </Item>
  );
};

export default NavItem;
