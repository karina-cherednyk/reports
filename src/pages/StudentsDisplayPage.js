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
                  date: "Дата", isDebtor: "боржник",
                  index: "№"
              }
  return names[name]
}
function invisibleColumn(name){
  return name === "index" || name === "isDebtor";
}

const dateFormatter = (cell, _) => {
  return cell.day+" "+cell.month+" "+cell.year
}
const paginationOptions = {
  sizePerPageList: ([5, 10, 15, 20, 30]).map(x => ({text: x+"", value: x}))
};

const custNumFilter = numberFilter({
  // options: [2100, 2103, 2105],
  placeholder: ' ',
  withoutEmptyComparatorOption: true,
  comparators: [Comparator.EQ, Comparator.GT, Comparator.LT],
  style: { display: "flex", justifyContent: "space-between"},
  numberStyle : {width: "80px"}
});



const studentContent= (row) => {
  return  <Container className="dataFooter" >
            <Row> <h2>{row.studentName}</h2></Row>
            <Row><p>Середній бал за рік:</p> </Row>
            <Row><p>Середній бал за семестр:</p></Row>
          </Container>
         
}



const CustomToggleList = ({columns, onColumnToggle, toggles}) => <>{
  columns.filter(col => !invisibleColumn(col.dataField))
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

}</>

class StudentsDisplayPage extends Component {
  constructor(props){
    super(props);

    const data = require('./storedStudents.json');
    data.forEach( (r, idx) => r.index=idx )
    const dataColumns = data[0] ? Object.keys(data[0]) : [];
    const columns  = dataColumns.map(x => ({dataField: x, text: mapColumnName(x)}) )
    columns.find( x => x.dataField === "date").formatter = dateFormatter;
    columns.find( x => x.dataField === "index").hidden = true;
    columns.forEach( x => x.filter = textFilter({ placeholder: " ", style: { display: "flex", justifyContent: "space-between"} }));
    columns.find( x => x.dataField === "grade").filter = custNumFilter;
    const debtorCol = columns.find( x => x.dataField === "isDebtor");
    debtorCol.filter = 
          selectFilter({
            getFilter: (filter) => this.debtFilter = filter,
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


    this.rowEvents = {
      onClick: (e, row, rowIndex) => {
        this.setState({footerContent: studentContent(row)});
      }
    }
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
              <Form.Check.Input onClick={ (e) => this.debtFilter(e.target.checked || "") } /> 
              <Form.Check.Label>Показувати лише боржників</Form.Check.Label>
            </Form.Check>

            <CustomToggleList { ...props.columnToggleProps }  />
            </Nav>
          </Col>
          <Col sm={10}>
          
          <Card className="m-auto" style={{top: "20px", minWidth: "90%"}}>
          <Container style={{ minWidth: "100%"}} >
          <Row>
            <BootstrapTable
                condensed={true}
                bordered={ false }
                { ...props.baseProps }
                pagination={ paginationFactory(paginationOptions) } 
                filter={ filterFactory() }
                rowEvents={ this.rowEvents }
                
                />
          </Row>
          <Row >
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