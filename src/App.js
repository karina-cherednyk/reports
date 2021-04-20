import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EditableReportPage   from "./pages/EditableReportPage";
import StudentsDisplayPage  from "./pages/StudentsDisplayPage";
import SubjectsDisplayPage  from "./pages/SubjectsDisplayPage";
import ReportsDisplayPage   from "./pages/ReportsDisplayPage";
import {Navbar, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { Component } from 'react';

function App() {
  return (
    <div className="App">

      <Router>
        <Navbar bg="primary" variant="light" expand="lg">
            <LinkContainer to="/editReports">
              <Nav.Link>Завантажити нові відомості</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/students">
              <Nav.Link>Відомості про студентів</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/subjects">
              <Nav.Link>Відомості про курси</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/reports" >
              <Nav.Link>Переглянути збережені відомості</Nav.Link>
            </LinkContainer>
        </Navbar>
        <Switch>
          <Route path="/editReports">
            <EditableReportPage />
          </Route>
          <Route path="/students">
            <Users />
          </Route>
          <Route path="/subjects">
            <About />
          </Route>
          <Route path="/reports">
            <ReportsDisplayPage />
          </Route>
        </Switch> 
      </Router>
    </div>
  );
}

class Home extends Component {
  render() {
  return <h2>Home</h2>;
  }
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
