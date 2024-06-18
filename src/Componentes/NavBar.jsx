import { Link, Outlet, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import Logo from "../Imagens/Logo.png";
import "./NavBar.css";
import { useState, useEffect } from "react";

function NavBar() {
  const [show, setShow] = useState(true);
  const [activeLink, setActiveLink] = useState("/");
  const location = useLocation();

  const handeShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <div className="app-container">
      <div className={`${activeLink === "/adocao" ? "d-none" : "side-navbar"}`} id="sidebar">
        <h1>
          <img src={Logo} className="d-block mx-auto img-fluid" alt="Logo SPAA" />
        </h1>
        <ul className="nav flex-column list-unstyled text-white w-100">
          <li className={`nav-link ${activeLink === "/" ? "active" : ""}`}>
            <Link to="/" onClick={() => setActiveLink("/")}>
              Lista de animais
            </Link>
          </li>
          <li className={`nav-link ${activeLink === "/eventos-castracao" ? "active" : ""}`}>
            <Link to="/eventos-castracao" onClick={() => setActiveLink("/eventos-castracao")}>
              Eventos de castração
            </Link>
          </li>
          <li className={`nav-link ${activeLink === "/eventos-arrecadacao" ? "active" : ""}`}>
            <Link to="/eventos-arrecadacao" onClick={() => setActiveLink("/eventos-arrecadacao")}>
              Eventos de arrecadação
            </Link>
          </li>
          <li className={`nav-link ${activeLink === "/formularios-adocao" ? "active" : ""}`}>
            <Link to="/formularios-adocao" onClick={() => setActiveLink("/formularios-adocao")}>
              Formulários de adoção
            </Link>
          </li>
          <li className={`nav-link ${activeLink === "/cuidadores" ? "active" : ""}`}>
            <Link to="/cuidadores" onClick={() => setActiveLink("/cuidadores")}>
              Cuidadores
            </Link>
          </li>
          <li className={`nav-link ${activeLink === "/especies" ? "active" : ""}`}>
            <Link to="/especies" onClick={() => setActiveLink("/especies")}>
              Espécies
            </Link>
          </li>
          <hr />
          <li className={`nav-link ${activeLink === "/adocao" ? "active" : ""}`}>
            <Link to="/adocao" onClick={() => setActiveLink("/adocao")}>
              Animais para adoção
            </Link>
          </li>
        </ul>
      </div>

      <div className={`${activeLink === "/adocao" ? "main-content ms-0" : "main-content"}`}>
        <Container>
          <Outlet />
        </Container>
      </div>
    </div>
  );
}

export default NavBar;