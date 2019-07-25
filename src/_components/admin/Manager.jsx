import React from 'react'; 
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import {Table, Col, Row, Button} from 'react-bootstrap'
import '../../assets/css/general.css'    
import {history} from '../../_helpers'
import { CustomerInfo } from './CustomerInfo';
import { domain } from '../../_services'

class Manager extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            contentCustomerInfo: []
        }

        this.handleCustomerInfo = this.handleCustomerInfo.bind(this);  
        this.buildContent = this.buildContent.bind(this);  
        this.handleEffect = this.handleEffect.bind(this);
    } 

    handleCustomerInfo(e){ 
        let _content = []
        if(e){
            _content.push(<CustomerInfo key={e.target.name} email={e.target.name}></CustomerInfo>) 
        }   
        this.setState({
            contentCustomerInfo: _content
        })
    }

    handleEffect(){
        window.jQuery('#dashboard').animate({width:'toggle'},500);
    }
 
    buildContent(){
        const { items } = this.props; 
        let _content = []
        let __content = []
       
        if (items){  
            items.users.forEach(element => {  
                _content.push(
                    <tr key={element.email}>
                        <td >{element.username}</td> 
                        <td >{element.email}</td> 
                        <td ><img src={domain + 'static/profile_pics/'+element.image_file} alt="" width="100px" height="100px" /></td> 
                        <td >{element.role}</td>     
                        <td >{element.type}</td> 
                        <td><Button variant='outline-info' name={element.email} onClick={this.handleCustomerInfo}>See</Button></td>
                    </tr>)
            }); 
        }  
        __content.push(<Row key="info-customer" style={{margin:0, width:'100%'}}><Table key="table-info-customer" style={{margin:0, width:'100%'}} striped bordered hover variant="light">
        <thead>
            <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Profile Picture</th>
                <th>Authorization</th>
                <th>Type</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>{_content}</tbody></Table></Row>) 
        return __content;
    }



    componentDidMount(){ 
        const { dispatch } = this.props;
        let user = JSON.parse(localStorage.getItem('user'));
        if(user){
            dispatch(userActions.getAll(user.token)); 
        }   
    }
     

    render() {  
        const { loggedIn} = this.props;    

        if(!loggedIn){ 
            history.push('/admin')
        }  
        return (
            <div>   
                <Row style={{ width:'100%'}}>
                    <Col lg={10} md={10} ><h1 className='title-dash-board' style={{float:'left',fontSize:'35px !important'}}><Button variant="outline-light" onClick={this.handleEffect} style={{margin:'5px 10px 10px 0px'}}><img width='20px'  alt="back-icon" src="./images/icons/menu.png"/></Button>Manager Account</h1></Col>
                    <Col lg={2} md={2} ><Button style={{marginTop:'20px', marginLeft:'50%'}} variant="outline-danger"href="/logout">Logout</Button></Col>
                </Row>  
                {this.state.contentCustomerInfo}
                {this.buildContent()}
            </div>
        );
    }
}
 
function mapStateToProps(store) {
    const { loggedIn,error } = store.authentication;  
    const { loading, items } = store.users 
    return { 
        loading,
        loggedIn,
        items,
        error,  
    };
}

const connectedManager = connect(mapStateToProps)(Manager);
export { connectedManager as Manager }; 