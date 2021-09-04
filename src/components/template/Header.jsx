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
    font-size: 2em;
    margin: 0;
  }

  p {
    margin: 10px 0 0 0;
    color: #969696;
    font-size: 1.2em;
    font-weight: 400;
  }

  @media(max-width: 576px) {
    display: none;
  }
`

const Header = (props) => {
  return (
    <HeaderWrapper>
      <h1>
        <i className={`fa fa-${props.icon}`} /> {props.title}
      </h1>
      <p>{props.subtitle}</p>
    </HeaderWrapper>
  );
};

export default Header;
