import { Link } from "react-router-dom";
import styled from "styled-components";

const Item = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  color: #fff;
  font-weight: 300;
  padding: 15px;
  :hover {
    color: #fff;
    background: linear-gradient(135deg, #750bb3 0%, #be32da 100%);
  }
  & > svg {
    margin-right: 5px;
  }
`;

const NavItem = (props) => {
  const Icon = props.icon;

  return (
    <Item to={`${props.destination}`}>
      <Icon /> <span>{props.page}</span>
    </Item>
  );
};

export default NavItem;
