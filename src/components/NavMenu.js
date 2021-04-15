import { Navbar, Button, Nav } from 'react-bootstrap';

function NavMenu ({loadReports, checkReport, saveReport, isCheckEnabled, isSaveEnabled}) {

    return (
        <Navbar bg="primary navbar-dark" expand="lg">
        <Navbar.Brand >Робота з відомостями</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link >Переглянути дані</Nav.Link>
            <Nav.Link >Видалити дані</Nav.Link>
            <label className="btn btn-default btn-primary btn-nav">
                Завантажити відомості
                <input type="file" hidden multiple accept=".pdf" 
                    onChange={(e) => loadReports(e.target.files)}/>
            </label>
            </Nav>
            <Button className="btn-nav" onClick={checkReport} disabled={!isCheckEnabled} >Перевірити відомості</Button>
            <Button onClick={saveReport} disabled={!isSaveEnabled} >Завантажити відомість в базу</Button>
        </Navbar.Collapse>
        </Navbar>
        )
}


export default NavMenu;