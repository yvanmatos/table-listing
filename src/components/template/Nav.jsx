import styled from "styled-components";
import NavItem from "./NavItem";

const Wrapper = styled.aside`

  background-color: var(--bg-dark);
  box-shadow: 2px 0 10px 0 rgb(0, 0, 0, 0.12), 2px 0 15px 0 rgb(0, 0, 0, 0.09);
  grid-area: menu;

@media (max-width: 768px) {
  .menu {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    height: 100%;
    justify-content: space-around;
  }
}

`

const Nav = () => {
  return (
    <Wrapper>
      <nav className="menu">
        <NavItem destination="home" icon="home" page="Início" />
        <NavItem destination="/posts" icon="sticky-note-o" page="Posts" />
        <NavItem destination="/albums" icon="picture-o" page="Albums" />
        <NavItem destination="/todos" icon="list-ul" page="To-Do" />
      </nav>
    </Wrapper>
  );
};

export default Nav;
