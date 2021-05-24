import React from "react";
import {Row, Col, Table, Form, FormGroup, Button, Input, Label, Spinner, Alert} from 'reactstrap';
import ServiceRequest from "../services/Service";
import UpdatePost from "./UpdatePost";
import AddPost from "./AddPost";

class DataList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      searchName: "",
      id: null,
      isLoading: false,
      alert: false,
      messageObj: {
        message: "",
        type: ""
      },
      showAddModal: false,
      showUpdateModal: false
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  alertCallback = (alert, messageObj) => {
    debugger;
    this.setState({
      alert: alert,
      messageObj: messageObj
    })
  } 

  fetchData = () => {
    this.setState({
      isLoading: true
    })
    setTimeout(() => {
      ServiceRequest.getData()
      .then(response => {
        this.setState({
          data: response.data,
          isLoading: false,
          alert: true
        });
        //console.log(response.data);
      })
      .catch((e) => {
        this.setState({
          isLoading: false,
          alert: true,
          messageObj: {
            message: "Request failed try again",
            type: "danger"
          }
        })
        console.log(e);
      });
    }, 1000); 
  }

  onChangeSearchName = (e) => {
    this.setState({
      searchName: e.target.value
    });
  }

  onEnterSearchName = (e) => {
    if(e.key === "Enter"){
      e.preventDefault();

      ServiceRequest.findByName(this.state.searchName)
        .then(response => {
          this.setState({
            data: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  deletePost = (id) => {  
    ServiceRequest.delete(id)
      .then(response => {
        this.setState({
          alert: true,
          messageObj: {
            message: "Post Deleted Successfully!",
            type: "success"
          }
        })
        console.log(response.data);
      })
      .catch(e => {
        this.setState({
          alert: true,
          messageObj: {
            message: "Request failed try again",
            type: "danger"
          }
        })
        console.log(e);
      });
      
      this.fetchData()
  }

  openUpdateModal = (id) => {
    this.setState({
      showUpdateModal: !this.state.showUpdateModal,
      id: id
    })
  }

  openAddModal = () => {
    this.setState({
      showAddModal: !this.state.showAddModal
    })
  }

  alertAutoClose = () => {
    setTimeout(() => {
      this.setState({alert: false})
    }, 5500)
  }

  render(){
    const { searchName, data, messageObj, alert } = this.state;

    return(
      <>
        <div className="position-relative d-flex justify-content-center alert-custom">
          <Alert color={messageObj.type} isOpen={alert} toggle={this.alertAutoClose()} className="position-absolute">
            {messageObj.message}
          </Alert>
        </div>
        <div className="alert alert-secondary p-2 mb-2">
          <Row className="flex-column-reverse flex-sm-row justify-content-sm-between">
            <Col sm="12" md="5" className="mt-2 mt-sm-0">
              <Form>
                <FormGroup className="mb-0">
                  <Label for="searchPhoto" className="visually-hidden">Search</Label>
                  <Input 
                    type="text" 
                    name="search" 
                    id="searchPhoto" 
                    onChange={this.onChangeSearchName}
                    onKeyPress={this.onEnterSearchName}
                    placeholder="Search by name and Enter" 
                    bsSize="lg"
                    autoComplete="off"
                    value={searchName}
                  />
                </FormGroup>
              </Form>
            </Col>
            <Col sm="12" md="3" lg="2">
              <div className="d-grid d-sm-block gap-2 text-end">
                <Button color="primary" className="btn-block" size="lg" onClick={this.openAddModal}>Add Post</Button>
              </div>
            </Col>
          </Row>
        </div>
        <Table striped responsive className="border">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {this.state.isLoading ?
            <tr>
              <td colSpan="5" className="text-center">
                <Spinner color="primary" type="grow" style={{ width: '3rem', height: '3rem' }} />
              </td>
            </tr>
          :
            data.length !== 0 ?
              data.map((item, index) => (
                <tr key={index}>
                  <th scope="row" className="align-middle" width="70">{item.id}</th>
                  <td className="align-middle" width="150">{item.name}</td>
                  <td className="align-middle" width="80">{"$" + item.price}</td>
                  <td className="align-middle" width="400">{item.description}</td>
                  <td className="align-middle" width="100">
                    <div className="d-flex">
                      <Button color="success" onClick={() => this.openUpdateModal(item.id)}> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                      </Button>
                      <Button color="danger" className="mx-2" onClick={() => {this.deletePost(item.id)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            :
              <tr><th scope="row" colSpan="5" className="p-3 text-center">No Data Available...</th></tr>
          }
          </tbody>
        </Table>
        {this.state.showUpdateModal && 
          <UpdatePost open={this.state.showUpdateModal} handleClose={this.openUpdateModal} id={this.state.id} fetchData={this.fetchData} alertCallback={this.alertCallback} />
        }
        {this.state.showAddModal && 
          <AddPost open={this.state.showAddModal} handleClose={this.openAddModal} fetchData={this.fetchData} alertCallback={this.alertCallback}/>}
      </>
    )
  }
}

export default DataList;