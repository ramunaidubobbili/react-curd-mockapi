import React from "react";
import {Col, Button, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';

import ServiceRequest from "../services/Service";

class AddPost extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: null,
      name: "",
      price: "",
      description: "",
      isLoading: false,

      nameError: false,
      priceError: false,
      descriptionError: false
    }
  }

  onChangeName = (e) => {
    let nameError = this.state.nameError && e.target.value === "";
    this.setState({
      name: e.target.value,
      nameError: nameError
    });
  }

  onChangePrice = (e) => {
    let priceError = this.state.priceError && e.target.value === "";
    this.setState({
      price: e.target.value,
      priceError: priceError
    });
  }

  onChangeDescription = (e) => {
    let descriptionError = this.state.descriptionError && e.target.value === "";
    this.setState({
      description: e.target.value,
      descriptionError: descriptionError
    });
  }

  add = () => {
    let isEmptyName = this.state.name !== "";
    let isEmptyPrice = this.state.price !== "";
    let isEmptyDescription = this.state.description !== "";

    if(isEmptyName && isEmptyPrice && isEmptyDescription){
      var data = {
        name: this.state.name,
        price: this.state.price,
        description: this.state.description
      };
      this.setState({
        isLoading: true
      })
      setTimeout(() => {
        ServiceRequest.create(data)
        .then(response => {
          this.setState({
            id: response.data.id,
            name: response.data.name,
            price: response.data.price,
            description: response.data.description,
            isLoading: false
          });
          this.props.handleClose();
          this.props.fetchData()
          this.props.alertCallback(true, {
            message: "Post Added Successfully!",
            type: "success"
          })
          //console.log(response.data);
        })
        .catch(e => {
          this.setState({
            isLoading: false
          })
          console.log(e);
          this.props.alertCallback(true, {
            message: "Request failed try again",
            type: "danger"
          })
        });
      }, 1000);
    } else{
      this.setState({
        nameError: !isEmptyName,
        priceError: !isEmptyPrice,
        descriptionError: !isEmptyDescription
      })
    }
    
  }

  render(){
    
    return(
      <>
        <Modal fade centered isOpen={this.props.open} toggle={this.props.handleClose}>
          <ModalHeader toggle={this.props.handleClose}>Add Post</ModalHeader>
          <ModalBody>
            <Form className="row">
              <Col md={6}>
                <FormGroup className="mb-3">
                  <Label for="name" size="lg">Name</Label>
                  <Input type="text" name="name" bsSize="lg" id="name" placeholder="Name"  value={this.state.name} onChange={this.onChangeName} invalid={this.state.nameError}/>
                  {this.state.nameError && <FormFeedback invalid>Name is required!</FormFeedback>}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className="mb-3">
                  <Label for="price" size="lg">Price</Label>
                  <Input type="number" name="price" bsSize="lg" id="price" placeholder="Price"  value={this.state.price} onChange={this.onChangePrice} invalid={this.state.priceError}/>
                  {this.state.priceError && <FormFeedback invalid>Price is required!</FormFeedback>}
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup className="mb-3">
                  <Label for="description" size="lg">Description</Label>
                  <Input type="textarea" name="description" bsSize="lg" id="description" placeholder="Description"  value={this.state.description} onChange={this.onChangeDescription}invalid={this.state.descriptionError}/>
                  {this.state.descriptionError && <FormFeedback invalid>Description is required!</FormFeedback>}
                </FormGroup>
              </Col>
            </Form>
          </ModalBody>
          <ModalFooter>
            <div className="w-100">
              <div className="d-grid d-sm-block gap-2 text-end">
                <Button color="primary" size="lg" onClick={this.add}>ADD</Button>
              </div>
            </div>
          </ModalFooter>
        </Modal>
        {this.state.isLoading && 
          <div className="spinner-bg"> <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} /></div>}
      </>
    )
  }
}

export default AddPost;