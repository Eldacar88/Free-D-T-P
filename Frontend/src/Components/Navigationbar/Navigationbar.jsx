import "./navigationbar.css"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Link, Navigate } from "react-router-dom";

const Navigationbar = ({handleLogout}) => {

    const logout = () => {
        handleLogout(true);
      }

    return(
        <div>
            <Navbar className="navbarcontainer" bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav id="navcontainer"
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll>

                                <div><Link to={"/"}>Home</Link></div>
                                <div><Link to ={"/overallplanningoverview"}>New Overall Planing</Link></div>
                                <Nav.Link href="#">New Individual Planing</Nav.Link>
                                <div><Link to ={"/login"}>Login</Link></div>
                                <div><Link to ={"/register"}>Register</Link></div>
                                <div><Link className="link" to={"/"} onClick={logout}>Logout</Link></div>
                                
                                
                            </Nav>

                            <Form className="d-flex">
                                <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                    </Navbar.Collapse>
        </Container>
    </Navbar>

        </div>
    )
}

export default Navigationbar