import styled from "styled-components";
import NavItem from "./NavItem";
import { Home, ViewList, Image, PlaylistAddCheck } from "@material-ui/icons";

const Wrapper = styled.aside`
  background-color: var(--bg-dark);
  box-shadow: 2px 0 10px 0 rgb(0, 0, 0, 0.12), 2px 0 15px 0 rgb(0, 0, 0, 0.09);
  grid-area: menu;

  @media (max-width: 768px) {
    .menu {
      display: flex;
      align-items: center;
      justify-content: space-around;

      height: 100%;
      word-break: keep-all;
    }

    a {
      padding: 15px 5px;
    }
  }
`;

const Nav = () => {
  return (
    <Wrapper>
      <nav className="menu">
        <NavItem destination="/home" icon={Home} page="Início" />
        <NavItem destination="/posts" icon={ViewList} page="Posts" />
        <NavItem destination="/albums" icon={Image} page="Albums" />
        <NavItem destination="/todos" icon={PlaylistAddCheck} page="To-Do" />
      </nav>
    </Wrapper>
  );
};

export default Nav;
