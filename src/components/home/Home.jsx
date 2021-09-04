import Main from "../template/Main";

const Home = () => {
  return (
    <Main icon="home" title="Início" subtitle="Projeto de teste">
      <div className="display-4">Bem vindo!</div>
      <hr />
      <p className="mb-0">
        Sistema desenvolvido para consumir e listar dados da API
        <strong>
          {" "}
          <a href="https://jsonplaceholder.typicode.com/">
            JSONPlaceholder
          </a>
        </strong>
        .
      </p>
    </Main>
  );
};

export default Home;
