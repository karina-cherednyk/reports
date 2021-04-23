import {  Nav, Row, Col,  Tab } from 'react-bootstrap';
import Report from '../editComponents/Report';
import EditableReportsNav from '../editComponents/EditableReportsNav';
import ConfirmDialog from '../editComponents/ConfirmDialog';
import { Component } from 'react';
import  React  from 'react';

//const backendServer = "http://138.68.95.218:40410";
const backendServer = "http://localhost:8080";
class EditableReportPage extends Component {

    constructor(){
        super()
        this.state = {
            reports: [],
            curIdx: -1,
            checkEnabled: false,
            saveEnabled: false,
        };
        this.reportInstances  = [];
        this.confirmDialogRef = React.createRef();
    }
    getCurrentReport = () => {
      if(this.state.curIdx < 0) return null;
      return this.reportInstances[this.state.curIdx].getUpdatedReport();
    }
    getCurrentReportRef = () => {
      if(this.state.curIdx < 0) return null;
      return this.reportInstances[this.state.curIdx];
    }

    checkReport = async () => {
      const report = this.getCurrentReport();
      
      if(!report) return;

      let requestOptions = { mode: 'cors', method: 'POST', body: JSON.stringify(report), headers: {
        'Content-Type': 'application/json'
      } };
      
      let report2 = await fetch(backendServer + "/check-chad-student-sheet", requestOptions).then(r => r.json());
      for(const prop of Object.keys(report2)){
        if(!prop.endsWith("Error")) report2[prop+"Changed"] = false;
      }
      const newReports = this.state.reports;
      newReports[this.state.curIdx] = report2;
      this.setState({reports: newReports, checkEnabled: false});

    }

    saveReport = () => {
      const report = this.getCurrentReport();
      if(report)
        this.confirmDialogRef.current.showLoadDialog(report);
    }

    setCheckEnabled = (val) =>  this.setState({checkEnabled: val});
    setSaveEnabled = (val) =>  this.setState({saveEnabled: val});

    loadReports = (files) => {
      const files_length = files.length; 
        let fetched_reports = [];
        Array.from(files).forEach(async (file) => {
            let data = new FormData();
            data.append('pdfInput', file);
            let requestOptions = { mode: 'cors', method: 'POST', body: data,  };
            
            let report = await fetch(backendServer + "/parse", requestOptions).then(r => r.json());
            console.log("AFTER PARSING")
            console.log(report);
            report.data = report.data.map((r, i) => ({...r, "index":i}))
            
            fetched_reports.push(report);
            if(fetched_reports.length === files_length){
                const new_reports = [...this.state.reports, ...fetched_reports];
                new_reports.forEach((r, idx) => r.index = idx);
                
                this.setState({"reports": new_reports});
                console.log(this.state.reports);
            }
                
        } )
    }

    handleReportSelect = (idx) => {
      this.setState({curIdx: idx}, () => {
        const reportRef = this.getCurrentReportRef();
        this.setState({checkEnabled: reportRef.checkEnabled, saveEnabled: reportRef.saveEnabled}) 
      } )
    }

    render (){
      return (
        <>
        <ConfirmDialog ref={this.confirmDialogRef} 
                      title={"Підтвердити збереження"}
                      prompt={"Оригінал не відповідає відомості, що буде збережена в базі даних, Зберегти виправлену відомість?"}
                      />
        <EditableReportsNav  toolbarOpened={this.props.toolbarOpened}
                             loadReports={this.loadReports}  curIdx={this.state.curIdx}
                             checkReport={this.checkReport}  isCheckEnabled={this.state.checkEnabled}
                             saveReport={this.saveReport}    isSaveEnabled={this.state.saveEnabled}
        />
        <Tab.Container  defaultActiveKey={-1} onSelect={this.handleReportSelect} >
          <Row style={{padding: "20px"}}>
            <Col sm={3}>
              < Nav variant="pills" className="flex-column">
                {this.state.reports.map( (r,idx) => {
                  return (
                  <Nav.Item key={"nav-"+idx} ><Nav.Link eventKey={idx}> {r.fileName}</Nav.Link></Nav.Item>
                )})}
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                {this.state.reports.map( (r,idx) => (
                    <Tab.Pane key={"ntab-"+idx} eventKey={idx} >
                      <Report ref={ref => { this.reportInstances[idx] = ref; } } report={r} 
                              setCheckEnabled={this.setCheckEnabled} setSaveEnabled={this.setSaveEnabled} />
                      </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
      </Tab.Container>

        </>)
        
    }
}

export default EditableReportPage;