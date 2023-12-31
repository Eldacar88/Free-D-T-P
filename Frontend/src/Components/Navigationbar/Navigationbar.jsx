import "./navigationbar.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Navigate } from "react-router-dom";

const Navigationbar = ({handleLogout, userRole, setUserRole}) => {

    const logout = () => {
        handleLogout(true);
    }

    return(
        <div>
            <Navbar className="navbar_container" bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav id="navcontainer"
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px'}}
                                navbarScroll>

                                <div><Link to={"/home"}>Home</Link></div>

                                <div><Link to ={"/overallplanningoverview"}>New Overall Planing</Link></div>
                                
                                <Nav.Link href="#">New Individual Planing</Nav.Link>
                                <div><Link to ={"/login"}>Login</Link></div>
                                <div><Link to ={"/register"}>Register</Link></div>
                                <div><Link className="link" to={"/"} onClick={logout}>Logout</Link></div>
                            </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navigationbar