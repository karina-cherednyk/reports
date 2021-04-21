import React from 'react';
import { Component } from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import Report from '../showReportComponents/Report';
import SearchableReportsNav from '../showReportComponents/SearchableReportNav';

class ReportsDisplayPage extends Component {
  constructor(props){
    super(props);
    this.allSearchFields = [];

    this.state = {
      reports: [],
      curIdx: -1,
      searchFields: [],
    
  }}

  loadReports = ({subject, group, ordinal}) => {
    const reports = require('./storedReports.json')
    this.setState({reports: reports});
  }

  setSearchFields = (fields) => {
    this.setState({searchFields: fields})
  }
  
  
  render(){
    return (
    <>
      <SearchableReportsNav  
        loadReports={this.loadReports}
        toolbarOpened={this.props.toolbarOpened}
      />
      <Tab.Container defaultActiveKey={-1}>
        <Row style={{padding: "20px"}}>
          <Col sm={3}>
            < Nav variant="pills" className="flex-column">
              {this.state.reports.map( (r,idx) => (
                <Nav.Item key={"nav-"+idx} ><Nav.Link eventKey={idx}> {r.fileName}</Nav.Link></Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              {this.state.reports.map( (r,idx) => (
                  <Tab.Pane key={"ntab-"+r.index} eventKey={idx} >
                    <Report  report={r}  />
                    </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
      </Row>
      </Tab.Container>
    </>)
  }

}
export default ReportsDisplayPage;