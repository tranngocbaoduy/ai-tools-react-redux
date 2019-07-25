import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Image,NavDropdown,Nav,Navbar,Button } from 'react-bootstrap';
import '../assets/css/header.css';
import '../assets/css/general.css';
import { domain } from '../_services'

class Header extends Component {

    constructor(props) {
        super(props);
        // this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            // show: false,
            loggedIn: false,
            user: {}
        };
    }
 
    handleClose() {
      this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() { 
        const { loggedIn,user } = this.props; 
        return ( 
            <div className="header"> 
                <Navbar className='my-nav' expand="lg">
                    <Navbar.Brand href="/" className='logo'>
                        <Image width='40px' src='./images/icon.png'/>
                        <span className="logo-name" > IMAGINE</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    
                    <Nav className="my-nav-filter">
                        <Nav.Link className="path-filter" href="/">SPY FACEBOOK</Nav.Link>
                        <Nav.Link className="path-filter" href="/">SPY ESTY</Nav.Link>
                        <Nav.Link className="path-filter" href="/">POST BY SAVED PAGES</Nav.Link>
                        <Nav.Link className="path-filter" href="/payment">PAYMENT</Nav.Link>
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown"> */}
                        {/* <NavDropdown.Item href="#action/3.1">Spy Facebook</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Spy Esty</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3"></NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                        {/* </NavDropdown> */}
                    </Nav>
                    {!loggedIn  && 
                        <Nav className="btn-navbar"> 
                            <Button className="btn-header" variant="inline-success" href='/login'>Sign In</Button>
                        </Nav>
                    }
                     {loggedIn  && user &&
                        <Nav >  
                            <Image src={ domain + 'static/profile_pics/'+ user.image_file} alt="" width="35px" height="30px" style={{borderRadius:'50%', marginRight:'-20px'}}   />
                            <NavDropdown title={user.username}  className="path-filter" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/info">Info</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Cart</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>  
                    }
               

                    <Nav className="mr-auto my-nav-filter-large" >
                        <Nav.Link className="path-filter" href="/">SPY FACEBOOK</Nav.Link>
                        <Nav.Link className="path-filter" href="/">SPY ESTY</Nav.Link>
                        <Nav.Link className="path-filter" href="/">POST BY SAVED PAGES</Nav.Link>
                        <Nav.Link className="path-filter" href="/payment">PAYMENT</Nav.Link>
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown"> */}
                        {/* <NavDropdown.Item href="#action/3.1">Spy Facebook</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Spy Esty</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3"></NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                        {/* </NavDropdown> */}
                    </Nav>
                    </Navbar.Collapse>  
                </Navbar>

                {/* <Modal className='modal-signinup' show={this.state.show} onHide={this.handleClose}>
                    <SignInUp></SignInUp>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><SignInUp></SignInUp></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                        Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                        Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal> */}
            </div>  
        );
    } 
}

// function mapStateToProps(store) {
//     const { loggedIn,user } = store.authentication; 

//     console.log(store.authentication)
//     return {
//         loggedIn:loggedIn,
//         user:user
//     };
// }

const mapStateToProps = (store) => {  
    const { loggedIn,user } = store.authentication; 
    return {
        loggedIn,
        user
    }
} 
 
export default  withRouter(connect(mapStateToProps)(Header)); 