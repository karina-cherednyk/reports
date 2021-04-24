import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import EditableReportPage   from "./pages/EditableReportPage";
import StudentsDisplayPage  from "./pages/StudentsDisplayPage";
import DeletePage           from './pages/DeletePage';
import ReportsDisplayPage   from "./pages/ReportsDisplayPage";
import {Navbar, Nav, Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { Component } from 'react';
import { ArrowUp, ArrowDown } from "react-bootstrap-icons";

class App extends Component {
  constructor(){
    super();
    this.state = {
      toolbarOpened: true
    }
  }

  render(){
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
            <LinkContainer to="/delete">
              <Nav.Link>Видалити з бази</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/reports" >
              <Nav.Link>Переглянути збережені відомості</Nav.Link>
            </LinkContainer>
            <Button className="ml-auto"
              onClick={() => 
                this.setState({toolbarOpened : !this.state.toolbarOpened})}
                aria-expanded={this.state.opened} > 
                {this.state.toolbarOpened ? <ArrowUp/> : <ArrowDown /> }
              </Button>
        </Navbar>
        <Switch>
          <Route path="/editReports">
            <EditableReportPage toolbarOpened={this.state.toolbarOpened} />
          </Route>
          <Route path="/students">
            <StudentsDisplayPage />
          </Route>
          <Route path="/reports">
            <ReportsDisplayPage toolbarOpened={this.state.toolbarOpened}  />
          </Route>
          <Route path="/delete">
            <DeletePage   />
          </Route>
        </Switch> 
      </Router>
    </div>
  );
  }
}


export default App;
