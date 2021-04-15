import { Form, Card, Container, Row, Col, FormControl } from 'react-bootstrap';
import { Component } from 'react';

function ComboBox({report, label, prop, options,  placeholder=label, handleChange}) {
    const val = report[prop];
    const changed = report[prop+"Changed"];
    const error = val && changed ? null : report[prop+"Error"];

    return (
        <Form.Group >
        <Form.Label>{label}</Form.Label>
        <Form.Control as="select" 
            isInvalid={ error }
            name={prop}
            style={changed ? {color: "green", borderColor: "green"}: null}
            placeholder={ placeholder } 
            defaultValue={val}
            onChange={ handleChange }
        >
            {["", ...options].map((o, idx) => <option key={prop+report.index+"_"+idx} >{o}</option>)}
        </Form.Control>
        <FormControl.Feedback type="invalid">{error}</FormControl.Feedback>
      </Form.Group>
    )
}
function Input({report, label, prop, pre, placeholder=label, handleChange}) {
    const val = pre ? report[pre][prop] : report[prop];
    const changed = pre ? report[pre][prop+"Changed"] : report[prop+"Changed"];
    const errMsg  = pre ? report[pre][prop+"Error"] : report[prop+"Error"];
    const error = val && changed ? null : errMsg;

    return (
        <Form.Group >
        <Form.Label>{label}</Form.Label>
        <Form.Control 
                isInvalid={ error }
                feedback={ error }
                name={prop}
                style={changed ? {color: "green", borderColor: "green"}: null}
                placeholder={ placeholder } 
                onChange={ handleChange }
                defaultValue={ val } />
        <FormControl.Feedback type="invalid">{error}</FormControl.Feedback>
        </Form.Group>
    )
}

class Report extends Component{

    constructor(props){
        super(props);
        this.state = {...props.report};
    }

    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value,
        [event.target.name+"Changed"]: true,
      });
      console.log(this.state)
      
    }

    render() { 
      return <>
      <Card  border="secondary" >
      <Container >
          <Row><Col><Form.Label className="form-label-h" >НАЦІОНАЛЬНИЙ УНІВЕРСИТЕТ “КИЄВО-МОГИЛЯНСЬКА АКАДЕМІЯ”</Form.Label></Col></Row>
          <Row><Col><Form.Label className="form-label-h">Заліково-екзаменаційна відомість {`${this.state.sheetType} № ${this.state.sheetCode}`} </Form.Label></Col></Row>
          <Row><Col><ComboBox      report={this.state}        label="Освітній рівень" options={["Бакалавр","Магістр"]}  prop="okr"            handleChange={this.handleChange} /></Col></Row>
          <Row><Col><ComboBox      report={this.state}        label="Факультет"       options={["ФІ", "FE"]}          prop="faculty"          handleChange={this.handleChange} /></Col>
               <Col><ComboBox      report={this.state}        label="Рік навчання"    options={[1, 2, 3]}             prop="eduYear"          handleChange={this.handleChange} /></Col>
               <Col><Input         report={this.state}        label="Група"           placeholder="Група"             prop="group"            handleChange={this.handleChange} /></Col></Row>
          <Row><Col><Input         report={this.state}        label="Дисципліна"                                      prop="subject"          handleChange={this.handleChange} /></Col></Row>
          <Row><Col><ComboBox      report={this.state}        label="Семестр"         options={["1", "2", "3", "4", "5", "6", "7", "8"]}      prop="term"             handleChange={this.handleChange} /></Col>
               <Col><Input         report={this.state}        label="Залікові бали"   placeholder="залікові біли"     prop="creditPoints"     handleChange={this.handleChange} /></Col></Row>
          <Row><Col><ComboBox      report={this.state}        label="Форма контролю"  options={["залік","іспит", "екзамен"]}     prop="controlForm"      handleChange={this.handleChange} /></Col>
               <Col><Input         report={this.state}        label="День"            placeholder="День"              pre="date" prop="day"   handleChange={this.handleChange} /></Col>
               <Col><Input         report={this.state}        label="Місяць"          placeholder="Місяць"            pre="date" prop="month" handleChange={this.handleChange} /></Col>
               <Col><Input         report={this.state}        label="Рік"             placeholder="Рік"               pre="date" prop="year"  handleChange={this.handleChange} /></Col></Row>
          <Row><Col><Input         report={this.state}        label="Прізвище"                                        prop="teacherSurname"   handleChange={this.handleChange} /></Col>
               <Col><Input         report={this.state}        label="Ім'я"                                            prop="teacherFirstname" handleChange={this.handleChange} /></Col>
               <Col xs={4}><Input  report={this.state}        label="По-батькові екзаменатора"                        prop="teacherLastname"  handleChange={this.handleChange} /></Col>
               <Col xs={4}><Input  report={this.state}        label="Вчене звання"                                    prop="teacherRank"      handleChange={this.handleChange} /></Col></Row>
          <Row>
              {/* <Col><Table tableData={report.data} /></Col> */}
          </Row>
      </Container>         
      </Card>
      </>

    }
}

export default Report;