import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Nav from "../components/Template/Nav";
import Logo from "../components/Template/Logo";
import Routes from "./Routes";
import Footer from "../components/Template/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Logo />
        <Nav />
        <Routes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
