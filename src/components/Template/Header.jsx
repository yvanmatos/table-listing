import styled from "styled-components";

const HeaderWrapper = styled.header`
  background-color: #fff;
  padding: 0px 15px;
  overflow: hidden;
  white-space: nowrap;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  grid-area: header;

  h1 {
    display: flex;
    font-size: 2em;
    margin: 0;
  }

  h1 > svg {
    margin-right: 10px;
    height: 1.5em;
    width: 1.5em;
  }

  p {
    margin: 10px 0 0 0;
    color: #969696;
    font-size: 1.2em;
    font-weight: 400;
  }

  @media (max-width: 576px) {
    display: none;
  }
`;

const Header = (props) => {
  const Icon = props.icon;

  return (
    <HeaderWrapper>
      <h1>
        <Icon /> {props.title}
      </h1>
      <p>{props.subtitle}</p>
    </HeaderWrapper>
  );
};

export default Header;
