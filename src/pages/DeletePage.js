import React from 'react';
import { Component } from 'react';
import {Row, Col, Container, Tab, ListGroup, Form, Button, Nav } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

class DeletePage extends Component {

  constructor(){
    super();
    this.state = {
      found: []
    }
  }

  Report =  () => {
      return (
        <Form className="col-6">
        <Form.Group>
          <Form.Label>Пошук відомості за номером</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group>
          <Form.Label>Пошук відомості за предметом</Form.Label>
          <Form.Control />
        </Form.Group>
        <Button variant="primary">Знайти необхідну відомість</Button>
        </Form>)
  }

  
  Student =  () => {
    return (<>
      <Form className="col-6">
        <Form.Group>
          <Form.Label>Пошук студента за ПІБ</Form.Label>
          <Form.Control type="number"/>
        </Form.Group>
        <Form.Group>
        <Button variant="primary">Знайти студента</Button>
        </Form.Group>
        <Form.Group>
          <Form.Label>Видалити студента з предмету</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group>
            <Form.Label>Видалити студента з групи</Form.Label>
            <Form.Control />
        </Form.Group>
        <Button variant="primary">Видалити студента</Button>
    </Form>
      </>)
  }
  
  Teacher =  () => {
    return (<>
      <Form className="col-6">
        <Form.Group>
          <Form.Label>Пошук викладача за ПІБ</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group>
        <Button variant="primary">Знайти викладача</Button>
        </Form.Group>
        <Form.Group>
          <Form.Label>Видалити викладача з предмету</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group>
          <Form.Label>Видалити викладача з групи</Form.Label>
          <Form.Control />
        </Form.Group>
        <Button variant="primary">Видалити викладача</Button>
      </Form>
      </>)
  }
  
  Subject =  () => {
    return (<>
      <Form className="col-6">
        <Form.Group>
          <Form.Label>Пошук дисципліни за назвою</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group><Button variant="primary">Знайти дисципліну</Button></Form.Group>
        <Form.Group><Button variant="primary">Видалити дисципліну</Button></Form.Group>
      </Form>
      </>)
  }



  render(){
    return  <>
    <Tab.Container defaultActiveKey={-1}>
    <Row style={{padding: "20px"}}>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
            <Nav.Item ><Nav.Link eventKey="report">Видалити відомість</Nav.Link></Nav.Item>
            <Nav.Item ><Nav.Link eventKey="teacher">Видалити викладача</Nav.Link></Nav.Item>
            <Nav.Item ><Nav.Link eventKey="student">Видалити студента</Nav.Link></Nav.Item>
            <Nav.Item ><Nav.Link eventKey="subject">Видалити предмет</Nav.Link></Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="report"  >{this.Report()}</Tab.Pane>
              <Tab.Pane eventKey="teacher" >{this.Teacher()}</Tab.Pane>
              <Tab.Pane eventKey="student" >{this.Student()}</Tab.Pane>
              <Tab.Pane eventKey="subject" >{this.Subject()}</Tab.Pane>
            </Tab.Content>
          </Col>
      </Row>
    </Tab.Container>
    </>
  }

}
export default DeletePage;