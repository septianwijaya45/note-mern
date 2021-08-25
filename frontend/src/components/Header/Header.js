import React from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Container, } from "react-bootstrap"

function Header(){
    return (
        <Navbar bg="primary" expand="lg" variant="dark">
            <Container>

                <Navbar.Brand href="/">Note React</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="m-auto">
                        <Form inline>
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="mr-sm-2"
                                aria-label="Search"
                            />
                        </Form>
                    </Nav>
                    <Nav >
                        <Nav.Link href="#action1">My Note</Nav.Link>
                        <NavDropdown title="Septian Wijaya" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">My Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
