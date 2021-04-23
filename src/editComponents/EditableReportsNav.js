import { Navbar, Button, Nav, Collapse } from 'react-bootstrap';

function EditableReportsNav ({toolbarOpened, loadReports, checkReport, saveReport, isCheckEnabled, isSaveEnabled}) {

    return (
        <Collapse in={toolbarOpened}>
        <Navbar expand="lg">
        <Navbar.Brand >Робота з відомостями</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <label className="btn btn-default btn-primary btn-nav">
                Завантажити відомості
                <input type="file" hidden multiple accept=".pdf" 
                    onChange={(e) => { loadReports(e.target.files); e.target.value = ""; }}  />
            </label>
            </Nav>
            <Button className="btn-nav" onClick={checkReport} disabled={!isCheckEnabled} >Перевірити відомості</Button>
            <Button onClick={saveReport} disabled={!isSaveEnabled} >Завантажити відомість в базу</Button>
        </Navbar.Collapse>
        </Navbar>
        </Collapse>
        )
}


export default EditableReportsNav;