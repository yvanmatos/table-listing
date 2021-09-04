import "./Nav.css";
import NavItem from "./NavItem";

const Nav = () => {
  return (
    <aside className="menu-wrapper">
      <nav className="menu">
        <NavItem destination="home" icon="home" page="Início" />
        <NavItem destination="posts" icon="sticky-note-o" page="Posts" />
        <NavItem destination="albums" icon="picture-o" page="Albúns" />
        <NavItem destination="todos" icon="list-ul" page="To-Do" />
      </nav>
    </aside>
  );
};

export default Nav;
