import Header from "./Header";
import styled from "styled-components";

const Wrapper = styled.main`
  grid-area: content;
  padding: 10px;

  > div {
    margin-top: 10px;
    padding: 15px;
    background-color: #fff;
    box-shadow: var(--shadow);
  }

  @media (max-width: 360px) {
    max-width: 100vw;

    .MuiTableCell-root {
      padding: 15px 10px;
    }
  }
`;

const Main = (props) => {
  return (
    <>
      <Header {...props} />
      <Wrapper>
        <div>{props.children}</div>
      </Wrapper>
    </>
  );
};

export default Main;
