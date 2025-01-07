import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./Navbar.css"; // Import the CSS file

const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container fluid>
        {/* Brand Logo */}
        <Navbar.Brand href="/" className="navbar-brand">
          <div className="brand-logo">
            <i className="bi bi-tv logo-icon"></i>
            <span className="brand-text">KinoLoka</span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto justify-content-center">
            <Nav.Link href="#home" active>Home</Nav.Link>
            <Nav.Link href="#movies">Movies</Nav.Link>
            <Nav.Link href="#tvshows">TV Shows</Nav.Link>
            <Nav.Link href="#livetv">Live TV</Nav.Link>
          </Nav>
          <Nav className="navbar-nav">
            {/* Profile Icon */}
            <Nav.Link href="#profile">
              <AccountCircleIcon />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;