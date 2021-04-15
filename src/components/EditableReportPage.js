import {  Nav, Row, Col,  Tab } from 'react-bootstrap';
import Report from './Report';
import NavMenu from './NavMenu';
import ConfirmDialog from './ConfirmDialog';
import { Component } from 'react';
import  React  from 'react';

const backendServer = "http://138.68.95.218:40410";

class EditableReportPage extends Component {

    constructor(){
        super()
        this.state = {
            reports: [],
            curIdx: -1,
        };
        this.reportInstances  = [];
        this.confirmDialogRef = React.createRef();
    }

    checkReport = () => {
      if(this.state.curIdx < 0) return;
      const report = this.reportInstances[this.state.curIdx].getUpdatedReport();
      // this.confirmDialogRef.current.showLoadDialog(report);
    }

    saveReport = () => {
      if(this.state.curIdx < 0) return;
      const report = this.reportInstances[this.state.curIdx].getUpdatedReport();
      this.confirmDialogRef.current.showLoadDialog(report);
    }


    loadReports = (files) => {
        let fetched_reports = [];
        Array.from(files).forEach(async (file) => {
            let data = new FormData();
            data.append('pdfInput', file);
            let requestOptions = { mode: 'cors', method: 'POST', body: data };

            let report = await fetch(backendServer + "/parsePdf", requestOptions).then(r => r.json());
            report.data = report.data.map((r, i) => ({...r, "index":i}))
            
            fetched_reports.push(report);
            if(fetched_reports.length === files.length){
                const new_reports = [...this.state.reports, ...fetched_reports];
                new_reports.forEach((r, idx) => r.index = idx);
                console.log(new_reports)
                this.setState({"reports": new_reports});
            }
                
        } )
    }

    render (){
      return (
        <>
        <ConfirmDialog ref={this.confirmDialogRef} 
                      title={"Підтвердити збереження"}
                      prompt={"Оригінал не відповідає відомості, що буде збережена в базі даних, Зберегти виправлену відомість?"}
                      />
        <NavMenu  loadReports={this.loadReports}  
                  checkReport={this.checkReport}
                  saveReport={this.saveReport}
                  />

        <Tab.Container  defaultActiveKey={-1} onSelect={(idx) => this.setState({curIdx: idx}) } >
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
                    <Tab.Pane key={"ntab-"+r.index} eventKey={idx} ><Report ref={ref => { this.reportInstances[idx] = ref; } } report={r} /></Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
      </Tab.Container>

        </>)
        
    }
}

export default EditableReportPage;