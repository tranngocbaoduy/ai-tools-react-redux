import React, { Component } from 'react';
import '../App.css'; 
import { Row,Col ,ListGroup} from 'react-bootstrap';  
import '../assets/css/footer.css'; 
// import { MDBIcon } from "mdbreact";

class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
        content: [],
    }
  }
  buildContent() {
    let _content = [];
    return _content;
  }

  componentDidMount() {  
    function showExtend(){ 
      let _widthWindow =  window.jQuery(window).width();
      if( _widthWindow < 768){   
          window.jQuery('#list-first').hide() ;
          window.jQuery('#list-second').hide();
          window.jQuery('#list-third').hide();
          window.jQuery('#list-fourth').hide();
          let check1 = false;
          let check2 = false;
          let check3 = false;
          let check4= false;

          window.jQuery('#btn-first').click(function(){  
            if(!check1){ 
              window.jQuery('#rotate-first').addClass('rotateBackward'); 
              window.jQuery('#rotate-first').removeClass('rotateForward');
              window.jQuery('#list-first').slideToggle(); 
              check1 = true;   
            }else{ 
              window.jQuery('#rotate-first').addClass('rotateForward');
              window.jQuery('#rotate-first').removeClass('rotateBackward');
              window.jQuery('#list-first').slideToggle();   
              check1 = false;
            }
          }); 
          window.jQuery('#btn-second').click(function(){
            if(!check2){ 
              window.jQuery('#rotate-second').addClass('rotateBackward'); 
              window.jQuery('#rotate-second').removeClass('rotateForward');
              window.jQuery('#list-second').slideToggle(); 
              check2 = true;   
            }else{ 
              window.jQuery('#rotate-second').addClass('rotateForward');
              window.jQuery('#rotate-second').removeClass('rotateBackward');
              window.jQuery('#list-second').slideToggle();   
              check2 = false;
            }
          });
          window.jQuery('#btn-third').click(function(){
            if(!check3){ 
              window.jQuery('#rotate-third').addClass('rotateBackward'); 
              window.jQuery('#rotate-third').removeClass('rotateForward');
              window.jQuery('#list-third').slideToggle(); 
              check3 = true;   
            }else{ 
              window.jQuery('#rotate-third').addClass('rotateForward');
              window.jQuery('#rotate-third').removeClass('rotateBackward');
              window.jQuery('#list-third').slideToggle();   
              check3 = false;
            }
          });
          window.jQuery('#btn-fourth').click(function(){
            if(!check4){ 
              window.jQuery('#rotate-fourth').addClass('rotateBackward'); 
              window.jQuery('#rotate-fourth').removeClass('rotateForward');
              window.jQuery('#list-fourth').slideToggle(); 
              check4 = true;   
            }else{ 
              window.jQuery('#rotate-fourth').addClass('rotateForward');
              window.jQuery('#rotate-fourth').removeClass('rotateBackward');
              window.jQuery('#list-fourth').slideToggle();   
              check4 = false;
            }
          });
        }else{
          window.jQuery('#btn-first').click(function(e) {
            return false;
          }); 
          window.jQuery('#btn-second').click(function(e) {
            return false;
          }); 
          window.jQuery('#btn-third').click(function(e) {
            return false;
          }); 
          window.jQuery('#btn-fourth').click(function(e) {
            return false;
          }); 
          window.jQuery('#list-first').show();
          window.jQuery('#rotate-first').hide();
          window.jQuery('#list-second').show();
          window.jQuery('#rotate-second').hide();
          window.jQuery('#list-third').show();
          window.jQuery('#rotate-third').hide();
          window.jQuery('#list-fourth').show();
          window.jQuery('#rotate-fourth').hide();
        }
    }
    
    showExtend();
   
  } 
 

  render() {
    return (
      <div className="footer">
    
        <Row>
          <Col lg={4} md={5} sm={12} xs={12} className="footer-left">
              Contact us via any of the following methods during our business hours<br/>
              Monday - Fridat 8:30 AM - 5:30 PM 	Pacific Time <br/>
              Services@gamingzone.com<br/>
              Phone:1-(626)-854-9338 op. 4
          </Col>
          <Col lg={8} md={7} sm={12} xs={12}>
          
            <Row>
              <Col lg={3} md={3} sm={6} xs={12}>
              <ul className="footer-navigation">
                  <li id='btn-first'><b>Brands</b> 
                    {/* <MDBIcon id="rotate-first" className='extend-icon' icon="angle-left" /> */}
                  </li><br/><br/>
                  <ListGroup className="extend-footer" id="list-first"> 
                    <ListGroup.Item>Contact us via a</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  </ListGroup> 
               </ul>
              </Col>
              <Col lg={3} md={3} sm={6} xs={12}>
                <ul className="footer-navigation">
                  <li id='btn-second'><b>Brands</b>
                   {/* <MDBIcon id="rotate-second"  className='extend-icon' icon="angle-left" /> */}
                   </li><br/><br/>
                  <ListGroup className="extend-footer" id="list-second"> 
                    <ListGroup.Item>Contact us via a</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  </ListGroup> 
               </ul>
              </Col>
              <Col lg={3} md={3} sm={6} xs={12}>
                <ul className="footer-navigation">
                  <li id="btn-third"><b>Contact </b>
                   {/* <MDBIcon id="rotate-third" className='extend-icon' icon="angle-left" /> */}
                   </li><br/><br/>
                  <ListGroup className="extend-footer" id="list-third"> 
                    <ListGroup.Item>Contact us via a</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  </ListGroup> 
                </ul>
              </Col>
              <Col lg={3} md={3} sm={6} xs={12}>
                <ul className="footer-navigation">
                  <li id="btn-fourth"><b>Videos</b> 
                  {/* <MDBIcon id="rotate-fourth" className='extend-icon' icon="angle-left" />  */}
                  </li><br/><br/>
                  <ListGroup className="extend-footer" id="list-fourth"> 
                    <ListGroup.Item>Contact us via a</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  </ListGroup> 
                </ul>
              </Col>
            </Row>
          </Col>
          
        </Row> 
        
      </div>
    );
  }
}

export default Footer;
