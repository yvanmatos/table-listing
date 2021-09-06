import { Favorite } from "@material-ui/icons";
import styled from "styled-components";

const Wrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 25px;
  background-color: #fff;
  box-shadow: var(--shadow);
  grid-area: footer;
`;

const Footer = () => {
  return (
    <Wrapper>
      <span>
        Desenvolvido com {" "}
        <Favorite style={{color: "red", fontSize:"1em"}} /> por
        <strong> Yvan Matos</strong>
      </span>
    </Wrapper>
  );
};

export default Footer;
