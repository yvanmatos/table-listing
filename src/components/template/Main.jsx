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
`

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
