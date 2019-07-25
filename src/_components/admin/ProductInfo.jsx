// import React from 'react'; 
// import { connect } from 'react-redux';
// import { userActions } from '../../_actions';
// import { Col, Row,FormGroup,FormControl,Form} from 'react-bootstrap'
// import '../../assets/css/general.css'    
// import {history} from '../../_helpers'

// class ProductInfo extends React.Component {
//     constructor(props) {
//         super(props); 
        
//         this.state = {
//             email: this.props.email
//         }; 

//         this.handleChange = this.handleChange.bind(this);   
//         this.removeProductInfo = this.removeProductInfo.bind(this); 
//     }

//     handleChange(e) {
//         const { name, value } = e.target; 
//         this.setState({ [name]: value }); 
//     }  
//     componentDidMount(){ 
//         const { dispatch } = this.props;
//         const { email } = this.state;
//         if(email){
//             dispatch(userActions.getByEmail(email));  
//         } 
//     } 

//     removeProductInfo(){
//         this.setState({
//             email:false
//         })
//     }

//     render() {  
//         const { loggedIn, item} = this.props;    
//         const { email } = this.state;

//         if(!loggedIn){ 
//             history.push('/admin')
//         }     
//         return (
//             <div>    
//                 {email &&
//                     <Form method="post" onSubmit={this.handleSubmit}>
                        
//                         <Row style={{backgroundColor:'#f1f1ff',padding:'20px'}}> 
//                             <span className="glyphicon glyphicon-remove" style={{fontSize:'30px',right:'5vw', position:'fixed', zIndex:'10'}} onClick={this.removeProductInfo}>x</span>
//                                 {item &&
//                                     <Row>
//                                         <Col lg={4}>
//                                             <FormGroup> 
//                                                 <img src={'http://127.0.0.1:5000/static/profile_pics/'+item.user.image_file} alt="" width="100px" height="100px" style={{borderRadius:"50%"}} className="product"/>
//                                             </FormGroup>
//                                         </Col>
//                                         <Col lg={8}>
//                                             <FormGroup>
//                                                 <Form.Label>Full Name </Form.Label>
//                                                 <Form.Control type="text" name="name" value={item.user.username} onChange={this.handleChange}/>
//                                             </FormGroup>
//                                             <FormGroup>
//                                                 <Form.Label>Your country </Form.Label>
//                                                 <FormControl type="text" name="country" value={item.user.country} onChange={this.handleChange}/>
//                                             </FormGroup>
//                                             <FormGroup >
//                                                 <Form.Label>Email address </Form.Label>
//                                                 <FormControl type="email" name="email" value={item.user.email} onChange={this.handleChange}/>
//                                             </FormGroup>
//                                             <FormGroup>
//                                                 <Form.Label>Phone number </Form.Label>
//                                                 <FormControl type="text" name="phone" value={item.user.phone} onChange={this.handleChange}/>
//                                             </FormGroup> 
//                                         </Col> 
//                                     </Row>
//                                 } 
//                         </Row>
//                     </Form>  
//                 }
//             </div>
//         );
//     }
// }
 
// function mapStateToProps(store) {
//     const { loggedIn,error } = store.authentication;  
//     const { loading, item } = store.user
//     return { 
//         loading,
//         loggedIn, 
//         item,
//         error,  
//     };
// }

// const connectedProductInfo = connect(mapStateToProps)(ProductInfo);
// export { connectedProductInfo as ProductInfo }; 