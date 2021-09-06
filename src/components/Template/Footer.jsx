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
        Desenvolvido com{" "}
        <i className="fa fa-heart" style={{ color: "#dc143c" }} /> por
        <strong> Yvan Matos</strong>
      </span>
    </Wrapper>
  );
};

export default Footer;
