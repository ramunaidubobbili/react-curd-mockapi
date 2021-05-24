import React from "react";
import { Container, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from 'reactstrap';
import DataList from "./components/DataList";

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      collapsed: false
    }
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render(){
    return (
      <div className="App">
        <Navbar color="primary faded" fixed='top' expand="md" dark>
          <Container>
            <NavbarBrand href="/" className="mr-auto">React Posts</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} />
            <Collapse isOpen={this.state.collapsed} navbar className="justify-content-end row">
              <Col sm="12" md={5}>
                <Nav navbar className="position-relative">
                  
                </Nav>
              </Col>
            </Collapse>
          </Container>
        </Navbar>
        <Container className="pt-4 pt-md-5 mt-5">
          <DataList/>
        </Container>
      </div>
    );
  }
}

export default App;
