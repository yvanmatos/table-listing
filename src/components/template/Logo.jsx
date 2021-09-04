import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.aside`
  background-color: var(--bg-dark);
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: logo;

  img {
    padding: 0px 15px;
    width: 100%;
  }

  @media (max-width: 576px) {
    img {
      width: 300px;
    }
  }
`;

export const Logo = () => {
  return (
    <Wrapper>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
    </Wrapper>
  );
};

export default Logo;
