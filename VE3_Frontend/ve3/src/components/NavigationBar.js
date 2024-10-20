import React from 'react';
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../Images/VE3.webp"; 

const NavigationBar = ({ isAuthenticated, isRegistered, onLogout, userRole }) => {
  return (
    <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg" className="primary">
      <Container>
        <Navbar.Brand>
          <LinkContainer to={"/"}>
            <Nav.Link>
              <Image
                src={logo}
                alt="CharityXchange"
                style={{
                  width: "65px",
                  height: "65px",
                  marginRight: "10px",
                  overflow: "hidden",
                  borderRadius: "50%",
                }}
                className="d-inline-block align-top"
              />
            </Nav.Link>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to={"/events"}>
              <Nav.Link className="Navlink" style={{ fontSize: "18px" }}>
                View Events
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to={"/about"}>
              <Nav.Link className="Navlink" style={{ fontSize: "18px" }}>
                About Us
              </Nav.Link>
            </LinkContainer>

            {/* Conditionally render Registration link */}
            {!isRegistered && (
              <LinkContainer to={"/register"}>
                <Nav.Link className="Navlink" style={{ fontSize: "18px" }}>
                  Registration
                </Nav.Link>
              </LinkContainer>
            )}

            {/* Conditional rendering of Create Event link for admin */}
            {userRole === "admin" && (
              <LinkContainer to={"/create-event"}>
                <Nav.Link className="Navlink" style={{ fontSize: "18px" }}>
                  Create Event
                </Nav.Link>
              </LinkContainer>
            )}

            {/* Conditional rendering of Events and Edit Profile based on authentication */}
            {isAuthenticated && (
              <>
                {/* Logout option */}
                <Nav.Link
                  className="Navlink"
                  onClick={onLogout}
                  style={{ fontSize: "18px", cursor: "pointer" }}
                >
                  Logout
                </Nav.Link>
              </>
            )}

            {/* Show Login link only if not authenticated */}
            {!isAuthenticated && (
              <LinkContainer to={"/login"}>
                <Nav.Link className="Navlink" style={{ fontSize: "18px" }}>
                  Login
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
