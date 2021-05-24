import React from "react";
import {Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormFeedback, Label, Input, Spinner} from 'reactstrap';

import ServiceRequest from "../services/Service";

class UpdatePost extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      item: {
        id: null,
        name: "",
        price: "",
        description: "",
      },
      isLoading: false,

      nameError: false,
      priceError: false,
      descriptionError: false
    }
  }

  componentDidMount(){
    this.getData(this.props.id)
  }

  getData = (id) => {
    ServiceRequest.get(id)
      .then(response => {
        this.setState({
          item: response.data
        });
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  onChangeName = (e) => {
    let nameError = this.state.nameError && e.target.value === "";
    this.setState(function(prevState) {
      return {
        item: {
          ...prevState.item,
          name: e.target.value,
          nameError: nameError
        }
      };
    });
  }

  onChangePrice = (e) => {
    let priceError = this.state.priceError && e.target.value === "";
    this.setState(function(prevState) {
      return {
        item: {
          ...prevState.item,
          price: e.target.value,
          priceError: priceError
        }
      };
    });
  }

  onChangeDescription = (e) => {
    let descriptionError = this.state.descriptionError && e.target.value === "";
    this.setState(function(prevState) {
      return {
        item: {
          ...prevState.item,
          description: e.target.value,
          descriptionError: descriptionError
        }
      };
    });
  }

  update = () => {
    let isEmptyName = this.state.item.name !== "";
    let isEmptyPrice = this.state.item.price !== "";
    let isEmptyDescription = this.state.item.description !== "";

    if(isEmptyName && isEmptyPrice && isEmptyDescription){
      var data = {
        id: this.state.item.id,
        name: this.state.item.name,
        price: this.state.item.price,
        description: this.state.item.description
      };
      
      this.setState({
        isLoading: true
      })
      setTimeout(() => {
        ServiceRequest.update(this.state.item.id, data)
        .then(response => {
          this.setState(prevState => ({
            item: {
              ...prevState.item
            },
            isLoading: false
          }));
          //console.log(response.data);
          this.props.handleClose()
          this.props.fetchData()
          this.props.alertCallback(true, {
            message: "Updated Successfully!",
            type: "success"
          })
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
    const {item} = this.state;
    return(
      <>
        <Modal fade centered isOpen={this.props.open} toggle={this.props.handleClose}>
          <ModalHeader toggle={this.props.handleClose}>Update Post</ModalHeader>
          <ModalBody>
            <Form className="row">
              <Col md={6}>
                <FormGroup className="mb-3">
                  <Label for="name" size="lg">Name</Label>
                  <Input type="text" name="name" bsSize="lg" id="name" placeholder="Name"  value={item.name} onChange={this.onChangeName} invalid={this.state.nameError}/>
                  {this.state.nameError && <FormFeedback invalid>Name is required!</FormFeedback>}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className="mb-3">
                  <Label for="price" size="lg">Price</Label>
                  <Input type="number" name="price" bsSize="lg" id="price" placeholder="Price"  value={item.price} onChange={this.onChangePrice} invalid={this.state.priceError}/>
                  {this.state.priceError && <FormFeedback invalid>Price is required!</FormFeedback>}
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup className="mb-3">
                  <Label for="description" size="lg">Description</Label>
                  <Input type="textarea" name="description" bsSize="lg" id="description" placeholder="Description" value={item.description} onChange={this.onChangeDescription} invalid={this.state.descriptionError}/>
                  {this.state.descriptionError && <FormFeedback invalid>Description is required!</FormFeedback>}
                </FormGroup>
              </Col>
            </Form>
          </ModalBody>
          <ModalFooter>
            <div className="w-100">
              <div className="d-grid d-sm-block gap-2 text-end">
                <Button color="primary" size="lg" onClick={this.update}>UPDATE</Button>
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

export default UpdatePost;