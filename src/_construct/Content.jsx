import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap'
import '../App.css';

class Content extends Component {

  scrollToTopBtn(){
    function scrolling(){
      if(window.scrollY> 0){
        setTimeout(function(){
          window.scrollTo(0, window.scrollY - window.innerHeight*15/100);
          scrolling();
        },6)
      } 
    }  
    scrolling()
  }
     
  render() {
    return (
      <div>
          <Button id="scrollToTopBtn" variant="light" onClick={this.scrollToTopBtn}>
            <Image alt="" src="./images/icons/up-arrow.svg" style={{width:'12px', height:'12px'}}/>
          </Button>
          {this.props.content}
      </div>
    )
  }
}

export default Content;
