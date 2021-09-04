import "font-awesome/css/font-awesome.min.css";
import "./App.css";

import { BrowserRouter } from "react-router-dom";
import Nav from "../components/template/Nav";
import Logo from "../components/template/Logo";
import Routes from "./Routes";
import Footer from "../components/template/Footer";


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
