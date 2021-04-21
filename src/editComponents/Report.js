import { Form, Card, Container, Row, Col, FormControl } from 'react-bootstrap';
import { Component } from 'react';
import Table from './Table';
import React from 'react';


function Input({report, label, prop, pre,  handleChange, options}) {
    const val = pre ? report[pre][prop] : report[prop]; 
    const changed = pre ? report[pre][prop+"Changed"] : report[prop+"Changed"];
    const errMsg  = pre ? report[pre][prop+"Error"] : report[prop+"Error"];
    const error = val && changed ? null : errMsg;
    const type = options ? "select" : "input";
    const content = options ?  (
      ["", ...options].map((o, idx) => <option key={prop+"_"+idx} >{o}</option>)
    ): null;

    return (
        <Form.Group >
        <Form.Label>{label}</Form.Label>
        <Form.Control 
                as={type}
                isInvalid={ error }
                feedback={ error }
                name={prop}
                style={changed ? {color: "green", borderColor: "green"}: null}
                placeholder={ label } 
                onChange={ handleChange }
                defaultValue={ val } >{content}</Form.Control>
        <FormControl.Feedback type="invalid">{error}</FormControl.Feedback>
        </Form.Group>
    )
}

class Report extends Component{

    constructor(props){
        super(props);
        this.state = props.report;
        this.initFromProps(props);
    }

    componentWillReceiveProps(props) {
      this.setState({...props.report});
      this.initFromProps(props);
    }
    shouldComponentUpdate(nextProps){
      let upd = this.props.report !== nextProps.report;
      return upd;
    }

    initFromProps = (props) => {
      
      this.checkEnabled = false;
      this.saveEnabled = props.report.isValid;

      this.tableDataRef = React.createRef();
      this.setCheckEnabled = () => props.setCheckEnabled(this.checkEnabled);
      this.setSaveEnabled = () => props.setSaveEnabled(this.saveEnabled);
    }

    tableData = () => this.tableDataRef.current ? 
              this.tableDataRef.current.state.data : null;

    getUpdatedReport = () => {
      const report = this.state;
      report.data = this.tableData();
      return report;
    }
    changeEnableState = () => {
      this.checkEnabled = true;
      this.saveEnabled = false;

      this.setCheckEnabled();
      this.setSaveEnabled();
    }
    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value,
        [event.target.name+"Changed"]: true,
      });
      this.changeEnableState();
      console.log({ [event.target.name]: event.target.value })

    }

    render() { 
    return <>
    <Card  border="secondary" >
    <Container >
        <Row><Col><Form.Label className="form-label-h" >НАЦІОНАЛЬНИЙ УНІВЕРСИТЕТ “КИЄВО-МОГИЛЯНСЬКА АКАДЕМІЯ”</Form.Label></Col></Row>
        <Row><Col><Form.Label className="form-label-h">Заліково-екзаменаційна відомість {`${this.state.sheetType} № ${this.state.sheetCode}`} </Form.Label></Col></Row>
        <Row><Col><Input      report={this.state}        label="Освітній рівень" options={["Бакалавр","Магістр"]}  prop="okr"            handleChange={this.handleChange} /></Col></Row>
        <Row><Col><Input      report={this.state}        label="Факультет"       options={["ФІ", "FE"]}          prop="faculty"          handleChange={this.handleChange} /></Col>
              <Col><Input      report={this.state}        label="Рік навчання"    options={[1, 2, 3]}             prop="eduYear"          handleChange={this.handleChange} /></Col>
              <Col><Input         report={this.state}        label="Група"           placeholder="Група"             prop="group"            handleChange={this.handleChange} /></Col></Row>
        <Row><Col><Input         report={this.state}        label="Дисципліна"                                      prop="subject"          handleChange={this.handleChange} /></Col></Row>
        <Row><Col><Input      report={this.state}        label="Семестр"         options={["1", "2", "3", "4", "5", "6", "7", "8"]}      prop="term"             handleChange={this.handleChange} /></Col>
              <Col><Input         report={this.state}        label="Залікові бали"   placeholder="залікові біли"     prop="creditPoints"     handleChange={this.handleChange} /></Col></Row>
        <Row><Col><Input      report={this.state}        label="Форма контролю"  options={["залік","іспит", "екзамен"]}     prop="controlForm"      handleChange={this.handleChange} /></Col>
              <Col><Input         report={this.state}        label="День"            placeholder="День"              pre="date" prop="day"   handleChange={this.handleChange} /></Col>
              <Col><Input         report={this.state}        label="Місяць"          placeholder="Місяць"            pre="date" prop="month" handleChange={this.handleChange} /></Col>
              <Col><Input         report={this.state}        label="Рік"             placeholder="Рік"               pre="date" prop="year"  handleChange={this.handleChange} /></Col></Row>
        <Row><Col><Input         report={this.state}        label="Прізвище"                                        prop="teacherSurname"   handleChange={this.handleChange} /></Col>
              <Col><Input         report={this.state}        label="Ім'я"                                            prop="teacherFirstname" handleChange={this.handleChange} /></Col>
              <Col xs={4}><Input  report={this.state}        label="По-батькові екзаменатора"                        prop="teacherLastname"  handleChange={this.handleChange} /></Col>
              <Col xs={4}><Input  report={this.state}        label="Вчене звання"                                    prop="teacherRank"      handleChange={this.handleChange} /></Col></Row>
        <Row>
            <Col><Table ref={this.tableDataRef} tableData={this.state.data} changeEnableState={this.changeEnableState}/></Col>
        </Row>
    </Container>         
    </Card>
    </>

    }
}

export default Report;