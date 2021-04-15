import { Navbar, Button, Nav } from 'react-bootstrap';

function NavMenu ({loadReports}) {

    return (
        <Navbar bg="primary navbar-dark" expand="lg">
        <Navbar.Brand href="#home">Робота з відомостями</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="#home">Переглянути дані</Nav.Link>
            <Nav.Link href="#link">Видалити дані</Nav.Link>
            <label className="btn btn-default btn-primary btn-nav">
                Завантажити відомості
                <input type="file" hidden multiple accept=".pdf" 
                    onChange={(e) => loadReports(e.target.files)}/>
            </label>
            </Nav>
            <Button>Завантажити відомість в базу</Button>
        </Navbar.Collapse>
        </Navbar>
        )
}


export default NavMenu;