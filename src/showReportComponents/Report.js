import { Form, Card, Container, Row, Col } from 'react-bootstrap';
import { Component } from 'react';
import Table from './Table';
import React from 'react';


function Text({report, label, prop, pre, placeholder=label, handleChange}) {
    const val = pre ? report[pre][prop] : report[prop];

    return (
        <Form.Group >
        <Form.Label>{label}</Form.Label>
        <Form.Control value={val} disabled />
        </Form.Group>
    )
}

class Report extends Component{

    constructor(props){
        super(props);
        this.state = {...props.report};

    }

    render() { 
    return <>
    <Card  border="secondary" >
    <Container >
        <Row><Col><Form.Label className="form-label-h" >НАЦІОНАЛЬНИЙ УНІВЕРСИТЕТ “КИЄВО-МОГИЛЯНСЬКА АКАДЕМІЯ”</Form.Label></Col></Row>
        <Row><Col><Form.Label className="form-label-h">Заліково-екзаменаційна відомість {`${this.state.sheetType} № ${this.state.sheetCode}`} </Form.Label></Col></Row>
        <Row><Col><Text      report={this.state}        label="Освітній рівень" prop="okr"            /></Col></Row>
        <Row><Col><Text      report={this.state}        label="Факультет"       prop="faculty"           /></Col>
              <Col><Text     report={this.state}        label="Рік навчання"    prop="eduYear"           /></Col>
              <Col><Text     report={this.state}        label="Група"           prop="group"             /></Col></Row>
        <Row><Col><Text      report={this.state}        label="Дисципліна"      prop="subject"           /></Col></Row>
        <Row><Col><Text      report={this.state}        label="Семестр"         prop="term"              /></Col>
              <Col><Text     report={this.state}        label="Залікові бали"   prop="creditPoints"      /></Col></Row>
        <Row><Col><Text      report={this.state}        label="Форма контролю"  prop="controlForm"       /></Col>
              <Col><Text     report={this.state}        label="День"            pre="date" prop="day"    /></Col>
              <Col><Text     report={this.state}        label="Місяць"          pre="date" prop="month" /></Col>
              <Col><Text     report={this.state}        label="Рік"             pre="date" prop="year"   /></Col></Row>
        <Row><Col><Text      report={this.state}        label="Прізвище"        prop="teacherSurname"    /></Col>
              <Col><Text     report={this.state}        label="Ім'я"            prop="teacherFirstname"  /></Col>
              <Col xs={4}><Text  report={this.state}    label="По-батькові екзаменатора"    prop="teacherLastname"   /></Col>
              <Col xs={4}><Text  report={this.state}    label="Вчене звання"                prop="teacherRank"       /></Col></Row>
        <Row>
              <Col><Table tableData={this.state.data} /></Col> 
        </Row>
    </Container>         
    </Card>
    </>

    }
}

export default Report;