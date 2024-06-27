import { Link, Outlet, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Logo from "../Imagens/Logo.png";
import { useState, useEffect } from "react";

function TopNavBar() {
  const [activeLink, setActiveLink] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <>
      <Navbar bg="light" expand="lg" className="top-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={Logo} alt="Logo SPAA" className="navbar-logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link 
                as={Link} 
                to="/adocao" 
                className={activeLink === "/adocao" ? "active py-2" : "py-2"}
                onClick={() => setActiveLink("/adocao")}
              >
                Animais para adoção
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="main-content">
        <Outlet />
      </Container>
    </>
  );
}

export default TopNavBar;
