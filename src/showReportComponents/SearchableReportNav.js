import { Navbar, Button, Form, Nav, Container, Row, Col, Collapse } from 'react-bootstrap';
import { Component } from 'react';

function Input({state, label, prop, handleChange, options}) {
  const val = state[prop];
  const type = options ? {as: "select"} : {as: "input"};
  const content = options ?  (
    ["", ...options].map((o, idx) => <option key={prop+"_"+idx} >{o}</option>)
  ): null;

  return (
      <Form.Group >
      <Form.Label>{label}</Form.Label>
      <Form.Control 
              {...type}
              name={prop}
              placeholder={ label } 
              onChange={ handleChange }
              defaultValue={ val } >
                {content}
              </Form.Control>
      </Form.Group>
  )
}


class SearchableReportNav extends Component {

  constructor(props){
    super(props);
    this.state = {
      ordinal: -1,
      subject: "",
      group: "",
      subjects: [],
      opened: true
    };
    this.loadReports = () => props.loadReports(this.state);
  }

  componentDidMount() {
    this.setState({subjects: ["Physics", "Maths"]});
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
  return (<>

      <Collapse in={this.props.toolbarOpened}>
        <Navbar  expand="lg">
        <Navbar.Brand >Перегляд відомостей</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
          <Container>
            <Row>
              <Col>
              <Input label="Номер документу" prop="ordinal" state={this.state}  handleChange={ this.handleChange } />
              </Col>
              <Col>
              <Input label="Номер групи"     prop="group"   state={this.state}  handleChange={ this.handleChange } />
              </Col>
              <Col>
              <Input label="Назва предмету"  prop="subject" state={this.state}  handleChange={ this.handleChange }  options={this.state.subjects}/>
              </Col>
          </Row>
          </Container>
          </Nav>
          <Button onClick={this.loadReports} >Завантажити відомості </Button>
        </Navbar.Collapse>
        </Navbar>
      </Collapse>
      </>
      )
  }
}


export default SearchableReportNav;