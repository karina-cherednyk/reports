import { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class ConfirmDialog extends Component {
  constructor(props){
    super(props);
    this.state = { show: false };
    this.title = props.title;
    this.prompt = props.prompt;
  }

  showLoadDialog = (report) => {
    this.setState({show: true});
    this.report = report;
  }
  handleClose = () => this.setState({show: false});
  handleConfirm = () => {
    console.log("LOADED TO DB");
    console.log(this.report);
    this.handleClose();
  }

  render (){

    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.prompt}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Скасувати
            </Button>
            <Button variant="primary" onClick={this.handleConfirm}>
              Підтвердити
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ConfirmDialog;