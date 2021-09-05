import styled from "styled-components";
import Main from "../template/Main";

const Display = styled.div`
  font-size: 4em;
  letter-spacing: 1px;
  font-weight: 100;
`;

const Lead = styled.p`
  margin-bottom: 5px;
  line-height: 1.5;
`;
const Home = () => {
  return (
    <Main icon="home" title="Início" subtitle="Projeto de teste">
      <Display>Bem vindo(a)!</Display>
      <hr />
      <Lead>
        Sistema desenvolvido para consumir e listar dados da API
        <strong>
          {" "}
          <a href="https://jsonplaceholder.typicode.com/">JSONPlaceholder</a>
        </strong>
        .
      </Lead>
    </Main>
  );
};

export default Home;
