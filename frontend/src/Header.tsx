import { Navbar, Container } from "react-bootstrap";


export function Header() {
    return (
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#home">Books</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
        </Navbar>
    )
}