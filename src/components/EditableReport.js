import { Button, Navbar, Nav,  Tab, Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { useState } from 'react';
// import { Dropdown } from 'bootstrap';
import { DropdownButton, Dropdown } from 'react-bootstrap';

let i = 0;

function mapColumnName(name) {
    const names = { ordinal: "№", surname: "Прізвище", firstName: "Ім`я", 
                    lastName: "По батькові", bookNo: "№_залікової книжки", 
                    termGrade: "За роботу в трим", ectsGrade: "Оцінка ЄКТС",
                    examGrade: "За тезу, залік, екзамен", sum: "Разом", nationalGrade: "Національна оцінка"
                }
    return names[name]
}

function EditableReport() {
    const [reports, setReports] = useState([]);
    const [curIndex, setCurIndex] = useState(-1)

    function changeDataRow(row, colName, val){
        console.log(row+" "+colName);
        let curReport = reports[curIndex];
        console.log(row)
        console.log(colName)
        console.log(curReport.data)
    }

    function changeHeaderRow(colName, preColName, val){
        let curReport = reports[curIndex];
        if(preColName) {
            curReport[preColName][colName] = val;
            curReport[preColName][colName+"Changed"] = true;
        }
        else {
            curReport[colName] = val;
            curReport[colName+"Changed"] = true;
        }
        const newReports = [...reports];
        newReports[curIndex] = curReport;

        setReports(newReports);
    }

    async function loadReports(files){
        let treports = [];
        Array.from(files).forEach(async (file) => {
            let data = new FormData();
            data.append('pdfInput', file);
    
            let requestOptions = {
                mode: 'cors',
                method: 'POST',
                body: data
            };

            let report = await fetch(backendServer + "/parsePdf", requestOptions).then(r => r.json());
            report.data = report.data.map((r, i) => ({...r, "index":i}))
            treports.push(report);
            if(treports.length === files.length){
                console.log(treports);
                setReports(treports);
            }
                
        } )
    }

const ectsEditor = {
    type: "select",
    options: "ABCDEF".split("").map( c => ({label: c, value: c}))
};

const nationalEditor = {
    type: "select",
    options: ["Відмінно", "Добре", "Задовільно", "Незадовільно"].map( c => ({label: c, value: c}))
}

const gradeValidator =  (newValue, row, column) => {
    if (isNaN(newValue)) {
      return { valid: false,message: "Grade should be numeric" };
    }
    return true;
}


function Table({tableData}){
    let tableColumns = [];
    let dataColumns = [];
    function mapStyle(cell, row, rowIndex, colIndex){
        const error = tableData[rowIndex][dataColumns[colIndex]+'Error']
        const changed = tableData[rowIndex][dataColumns[colIndex]+'Changed']
        if(changed) return {color: "green"};
        else if(error) return {color: "red"}
        else return {color: "black"}
    }

    if(tableData){
        let columns = Object.keys(tableData[0]).map(c => [c, mapColumnName(c)] ).filter(c => c[1]);
        
        dataColumns = columns.map(c => c[0]);
        tableColumns = columns.map(c => ({dataField: c[0], text: c[1], style: mapStyle }) );
    }
    tableColumns.find( x => x.dataField == "ectsGrade").editor = ectsEditor;
    tableColumns.find( x => x.dataField == "nationalGrade").editor = nationalEditor;
    tableColumns.find( x => x.dataField == "examGrade").validator = gradeValidator;
    tableColumns.find( x => x.dataField == "termGrade").validator = gradeValidator;
    tableColumns.find( x => x.dataField == "sum").validator = gradeValidator;

    const tableData2 = [...tableData.map(row => ({...row}))]
    const cellEdit = cellEditFactory({
        mode: "click",
        beforeSaveCell: (oldValue, newValue, row, col) => {
            console.log(row)
            console.log(tableData)
            console.log(tableData2)
            console.log(oldValue, newValue);
        }
    });

    return <BootstrapTable 
            style={{maxWidth: "40vw"}}
            key={++i}
            keyField='id' 
            cellEdit={ cellEdit }
            data={ tableData2 } 
            condensed={true}
            columns={ tableColumns } />
}

function Report({report}){
    return (<Card  border="secondary"  >
                <Container >
                    <Row><Col><Form.Label className="form-label-h" >НАЦІОНАЛЬНИЙ УНІВЕРСИТЕТ “КИЄВО-МОГИЛЯНСЬКА АКАДЕМІЯ”</Form.Label></Col></Row>
                    <Row><Col><Form.Label className="form-label-h">Заліково-екзаменаційна відомість {`${report.sheetType} № ${report.sheetCode}`} </Form.Label></Col></Row>
                    <Row><Col><ComboBox      report={report}        label="Освітній рівень" options={["бакавр","магістр"]}  prop="okr" /></Col></Row>
                    <Row><Col><ComboBox      report={report}        label="Факультет"       options={["ФІ", "FE"]}          prop="faculty"/></Col>
                         <Col><ComboBox      report={report}        label="Рік навчання"    options={[1, 2, 3]}             prop="eduYear"/></Col>
                         <Col><Input         report={report}        label="Група"           placeholder="Група"             prop="group"/></Col></Row>
                    <Row><Col><Input         report={report}        label="Дисципліна"                                      prop="subject" /></Col></Row>
                    <Row><Col><ComboBox      report={report}        label="Семестр"         options={["1", "2"]}            prop="term"/></Col>
                         <Col><Input         report={report}        label="Залікові бали"   placeholder="залікові біли"     prop="creditPoints" /></Col></Row>
                    <Row><Col><ComboBox      report={report}        label="Форма контролю"  options={["залік","іспит"]}     prop="controlForm" /></Col>
                         <Col><Input         report={report}        label="День"            placeholder="День"              pre="date" prop="day" /></Col>
                         <Col><Input         report={report}        label="Місяць"          placeholder="Місяць"            pre="date" prop="month"/></Col>
                         <Col><Input         report={report}        label="Рік"             placeholder="Рік"               pre="date" prop="year"/></Col></Row>
                    <Row><Col><Input         report={report}        label="Прізвище"                                        prop="teacherSurname" /></Col>
                         <Col><Input         report={report}        label="Ім'я"                                            prop="teacherFirstname" /></Col>
                         <Col xs={4}><Input  report={report}        label="По-батькові екзаменатора"                        prop="teacherLastname"/></Col>
                         <Col xs={4}><Input  report={report}        label="Вчене звання"                                    prop="teacherRank"/></Col></Row>
                    <Row>
                     <Col><Table tableData={report.data} /></Col>
                    </Row>
                </Container>
                
            </Card>)
}

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

const backendServer = "http://138.68.95.218:40410"

    function ComboBox({report, label, prop, options}) {
        const val = report[prop];
        const changed = report[prop+"Changed"];
        const error = val && changed ? null : report[prop+"Error"];
        console.log(prop +" "+changed+" "+error)

        return (
            <Form.Group >
            <Form.Label>{label}</Form.Label>
            <Dropdown onSelect={(eKey, _) => changeHeaderRow(prop, null, eKey)}>
            <DropdownButton id="dropdown-basic-button" title={val}>
            {[...options].map(o => <Dropdown.Item eventKey={o}>{o}</Dropdown.Item>)}
            </DropdownButton>
            </Dropdown>
          </Form.Group>
        )
    }
    function Input({report, label, prop, pre, placeholder=label}) {
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
                    className={changed ? "changed-input" : null}
                    placeholder={placeholder} 
                    onChange={ (e) => changeHeaderRow(prop, pre, e.target.value) }
                    value={val} />
            </Form.Group>
        )
    }

    return (
        <>
        <NavMenu  loadReports={loadReports}  />
        <div style={{paddingTop: '20px'}}>
        
        <Tab.Container  defaultActiveKey="page1" onSelect={(key) => setCurIndex(key) } > <Row>
          <Col sm={2}>
           {
                reports.map((x,i) => <Nav.Item key={i++} className="left-nav"><Nav.Link eventKey={i} >{x.fileName}</Nav.Link> </Nav.Item> )
           }
           </Col>
           <Col>
           <Tab.Content>
           {
                reports.map((x,i) => <Tab.Pane key={i++} eventKey={i} ><Report report={x} /> </Tab.Pane> )
           }
           </Tab.Content>
           </Col> 
        </Row></Tab.Container>
        </div>
        </>
    )
}

export default EditableReport;