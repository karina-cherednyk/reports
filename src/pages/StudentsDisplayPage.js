import React from 'react';
import { Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Card,  Container , Tab, Row, Col, Nav, Button } from 'react-bootstrap';

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
const dateFormatter = (cell, _) => {
  return cell.day+" "+cell.month+" "+cell.year
}
const paginationOptions = {
  sizePerPageList: ([5, 10, 15, 20, 30]).map(x => ({text: x+"", value: x}))
};


const CustomToggleList = ({columns, onColumnToggle, toggles}) => <>{
  columns.map(col => ({...col, toggle: toggles.dataField}))
  .map( col => (
    <Nav.Item key={"nav-"+col.dataField} >
      <Nav.Link
        className="active"
        aria-pressed={columns.toggle} 
        onClick={(e) => { 
          onColumnToggle(col.dataField); 
          e.target.classList.toggle('active'); 
        } }> 
        {col.text} 
      </Nav.Link>
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
    columns.find( x => x.dataField === "isDebtor").hidden = true;

    this.state = {
      dataColumns: dataColumns,
      columns: columns,
      data: data
    }
    console.log(this.state)
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
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
            <CustomToggleList { ...props.columnToggleProps } />
            </Nav>
          </Col>
          <Col sm={9}>
          <Card className="m-auto" style={{top: "20px"}}>
          <Container>
            <BootstrapTable
                condensed={true}
                bordered={ false }
                { ...props.baseProps }
                pagination={ paginationFactory(paginationOptions) } />
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