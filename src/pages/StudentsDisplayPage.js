import React from 'react';
import { Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, numberFilter, selectFilter, Comparator } from 'react-bootstrap-table2-filter';
import { Card,  Container , Tab, Row, Col, Nav, Button, Form } from 'react-bootstrap';

function mapColumnName(name) {
  const names = { ordinal: "№ відомості", studentName: "ПІБ студента", 
                  bookNo: "№ залікової книжки",
                  grade: "Оцінка за курс", subject: "Курс", 
                  teacherName: "ПІБ викладача",
                  date: "Дата", isDebtor: "Боржник",
                  index: "№"
              }
  return names[name] ;
}


const dateFormatter = (cell) => {
  return cell.day+" "+cell.month+" "+cell.year
}
const paginationOptions = {
  sizePerPageList: ([5, 10, 15, 20, 30]).map(x => ({text: x+"", value: x}))
};

const custNumFilter = numberFilter({
  placeholder: ' ',
  withoutEmptyComparatorOption: true,
  comparators: [Comparator.EQ, Comparator.GT, Comparator.LT],
  style: { display: "flex", justifyContent: "space-between"},
  numberStyle : {width: "80px"}
});

const dateFilterLogic = (val, data) => {
  if (val) {
    val = val.trim();
    return data.filter(r =>
      r.date.day === parseInt(val) || r.date.year === parseInt(val) || r.date.month.includes(val)
    )
  }
  return data;
}


const CustomToggleList = ({columns, onColumnToggle, toggles}) => {
  console.log("In Update");
  return <>{
  columns.filter(col => !col.hidden )
  .map(col => ({...col, toggle: toggles.dataField}))
  .map( col => (
    <Nav.Item key={"nav-"+col.dataField} >
      {col.dataField === "studentName" ? (
        <Nav.Link className="active">
          {col.text} 
        </Nav.Link>
      ) :
      (<Nav.Link
        className="active"
        aria-pressed={columns.toggle} 
        onClick={(e) => { 
          onColumnToggle(col.dataField); 
          e.target.classList.toggle('active'); 
        } }> 
        {col.text} 
      </Nav.Link>)
      }
      </Nav.Item>
  ))

}</>}

class StudentsDisplayPage extends Component {
  constructor(props){
    super(props);

    const data = require('./storedStudents.json');
    data.forEach( (r, idx) => r.index=idx )
    const dataColumns = data[0] ? Object.keys(data[0]) : [];
    const columns  = dataColumns.map(x => ({dataField: x, text: mapColumnName(x)}) )
    columns.find( x => x.dataField === "date").formatter = dateFormatter;
    columns.find( x => x.dataField === "index").hidden = true;
    columns.forEach( x => x.filter = textFilter({placeholder: " ", getFilter: (filter) => this[x.dataField+"Filter"] = filter }));
    columns.find( x => x.dataField === "grade").filter = custNumFilter;
    columns.find( x => x.dataField === "date").filter = textFilter({onFilter: dateFilterLogic, placeholder: " "});
    columns.filter( x => !x.text ).forEach( x => x.hidden = true );

    const studentRow = columns.find( x => x.dataField === "studentName");
    const subjectRow = columns.find( x => x.dataField === "subject");
    const teacherRow = columns.find( x => x.dataField === "teacherName");

    [studentRow, subjectRow, teacherRow].forEach( r => this.createClickableRow(r));
    
    const debtorCol = columns.find( x => x.dataField === "isDebtor");
    debtorCol.filter = 
          selectFilter({
            getFilter: (filter) => this.isDebtorFilter = filter,
            placeholder: " ",
            style: { display: "block" },
            options: {true: "так", false: "ні"}
          });

    debtorCol.formatter = cell => cell ? "так": "ні";

    this.state = {
      dataColumns: dataColumns,
      columns: columns,
      data: data,
      footerContent: null,
    }

  }

  createClickableRow = (row) => {
    
    row.formatter = cell => <button className="tabLink">{cell}</button>;
    const content = () => this[row.dataField+"Content"];

    row.events = {
      onClick: (e, column, columnIndex, row, rowIndex) => {
        this.setState({footerContent: content()(row) });
      },
    };

  }

  clearAllFilters = () => {
    
    this.state.dataColumns.forEach( prop => {
        const filter = this[prop+"Filter"];
        if(filter) filter("");        
    });
    this.debtCheckRef.checked = false;
  }
  

  studentNameContent = (row) => {
    return  <>
    <Container className="dataFooter" >
      <Row> 
      <h2><button href="#" className="footerLink" 
              onClick={() => this.studentNameFilter(row.studentName)}>
          {row.studentName}
      </button></h2>
      </Row>
      <Row><p>Середній бал за рік:</p> </Row>
      <Row><p>Середній бал за семестр:</p></Row>
      <Row><p>Боржник з предметів: </p></Row>
      <Row><p>Середній бал: </p></Row>
      <ul>
        <li><button href="#" className="footerLink" 
        onClick={() => { this.studentNameFilter(row.studentName); this.subjectFilter(row.subject); }}>
          Математичне мислення
          </button></li>
      </ul>
    </Container>
    </>
     
  }

  subjectContent = (row) => {
    return <>
    <Container className="dataFooter" >
    <Row> 
      <h2><button href="#" className="footerLink" 
              onClick={() => this.subjectFilter(row.subject)}>
          {row.subject}
      </button></h2>
      </Row>
      <Row><p>
      <button href="#" className="footerLink" onClick={() => { this.debtFilter(true); this.subjectFilter(row.subject); }}>
        Кількість боржників:  0</button></p></Row>
      <Row><p>Середній бал у студентів: 0</p></Row>
      <Row><p>Кількість недопусків: 0</p> </Row>
    </Container>
    </>
  }

  teacherNameContent = (row) => {
    return <>
    <Container className="dataFooter" >
    <Row> 
      <h2><button href="#" className="footerLink" 
              onClick={() => this.teacherNameFilter(row.teacherName)}>
          {row.teacherName}
      </button></h2>
      </Row>
      <Row><p>Кількість недопусків: 0</p> </Row>
    </Container>
    </>
  }
  handleTableChange = (type, { filters }) => {
    console.log(filters);
  }

  render(){
    return (
      <ToolkitProvider
        keyField="index"
        data={ this.state.data } 
        columns={ this.state.columns } 
        columnToggle
      >
      { props =>
        (<Tab.Container defaultActiveKey={-1}>
        <Row style={{padding: "20px"}}>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
            <Form.Check className="nav-link">
              <Form.Check.Input onClick={ (e) => this.isDebtorFilter(e.target.checked || "") } ref={ref => this.debtCheckRef = ref}/> 
              <Form.Check.Label>Показувати лише боржників</Form.Check.Label>
            </Form.Check>
            <CustomToggleList { ...props.columnToggleProps }  />
            <Button variant="outline-primary" onClick={() => this.clearAllFilters()} >Очистити фільтри</Button>
            </Nav>
          </Col>
          <Col sm={10}>
          
          <Card className="m-auto" style={{top: "20px", minWidth: "90%"}}>
          <Container style={{ minWidth: "100%"}} >
          <Row>
            <BootstrapTable
                onTableChange={ this.handleTableChange }
                condensed={true}
                bordered={ false }
                { ...props.baseProps }
                pagination={ paginationFactory(paginationOptions) } 
                filter={ filterFactory() }
                rowEvents={ this.rowEvents }
                remote={ { filter: true } }
                />
          </Row>
          <Row className="align-items-end">
            {this.state.footerContent}
          </Row>
          </Container>
        </Card>
          </Col>
      </Row>
      </Tab.Container>)
    }
  </ToolkitProvider>
    )
  }

}
export default StudentsDisplayPage;