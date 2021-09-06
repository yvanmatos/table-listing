import styled from "styled-components";
import Main from "../Template/Main";

const Display = styled.div`
  font-size: 4em;
  letter-spacing: 1px;
  font-weight: 100;
  margin-bottom: 30px;

  @media (max-width: 576px) {
    font-size: 3em;
  }
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
