import React from 'react';
import { Badge, Modal, Container, Row, Col, Button } from 'react-bootstrap' 
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries, VerticalGridLines} from 'react-vis';

class Product extends React.Component {
    constructor(props) {
        super(props); 

        this.state = { 
            modalShow: false
        }; 
    }
 

    buildTag(){
        const { data } = this.props;
        const variant = [
            'primary',
            'secondary',
            'success',
            'danger',
            'warning',
            'info'
            ];

        let _content = [];
        if (data.tags){
            data.tags.forEach(element => {  
                _content.push(
                    <Badge key={data.id} variant={variant[Math.floor(Math.random() * 5)]}>{element}</Badge>
                )
            });
        }
        return _content;
    }

    buildAgeData(){
        const { data } = this.props; 
        let _content = [];
        try{
            const age_data = data.age_data?JSON.parse(data.age_data):'';
            if(age_data!==''){  
                let i =0; 
                // const ITEMS = [
                //     'Options',
                //     'Buttons',
                //     'Select boxes',
                //     'Date inputs',
                //     'Password inputs',
                //     'Forms',
                //     'Other'
                //   ];
                  
                for (let item of age_data){  
                    // _content.push(<DiscreteColorLegend key={i++}
                    //     items={ITEMS}>
                    // </DiscreteColorLegend>)
                    _content.push( 
                        <VerticalBarSeries key={i++}
                            data={[ 
                                { x: 'male', y: item.female *100  },
                                { x: 'female', y: item.female *100 }
                            ]}
                        />
                        
                    )
                } 
            }
        }
        catch{

        }
       
        return _content;
    }
    
    render() {
        const { data } = this.props;
        let {modalShow} = this.state;   
        return (
            <div key={data.id} onClick={() => this.setState({modalShow:true})}>   
                <h5 className="product-item"><img src={data.image_author} alt="" style={{width:'30px', height:'30px', borderRadius:'100%'}} /> <i>{data.author}</i></h5>
                {data.tags && 
                   this.buildTag()
                } 
                {
                    !data.tags && 
                    <div>no</div>
                }
                <hr></hr>
                {data.title !=='title'?
                    <h3 className="product-item"><strong>{data.title}</strong></h3>
                :
                    <span></span>
                }
                <i className="product-item">{data.date_posted}</i>
                <img className="product-item" src={ data.url_image} alt="" /> 
                <hr></hr>
                <p className='product-item'>{data.description.substring(0,300)} <a href={'/ads/'+data.id}> read more ...</a><br/></p>  
                {/* <span className="product-item">{data.like} {data.brand}</span><br/> */}
                <hr></hr>
                {data.url_page !=='url_page'?
                <span>
                    <a className="product-item" href={data.url_page}>{data.url_page}</a><br/>
                </span>
                :
                <span></span>
                }  
                {/* <Button className='product-item' variant='info'>Detail Item</Button>  */} 

                 <Modal  show={modalShow} onHide={() => this.setState({modalShow:false})} aria-labelledby="contained-modal-title-vcenter" size="lg">
                    <Modal.Header closeButton={() => this.setState({modalShow:false})} >
                    <Modal.Title id="contained-modal-title-vcenter">
                    <h5 className="product-item"><img src={data.image_author} alt="" style={{textAlign:'center',width:'30px', height:'30px', borderRadius:'100%'}} /> <i>{data.author}</i></h5>
                        {data.title !=='title'?
                            <h3 className="product-item"><strong>{data.title}</strong></h3>
                        :
                            <span></span>
                        }
                        {data.tags && 
                            this.buildTag()
                        } 
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container> 
                            { data.view !== 'view' && data.currency !== 'currency' &&
                            <Row className="show-grid">
                                <Col lg={6} xs={6}>
                                    <h5>View</h5>
                                    <hr></hr>
                                    <span>{data.view}</span>
                                </Col>
                                <Col lg={6} xs={6}>
                                    <h5>Money</h5>
                                    <hr></hr>
                                    <span>{data.price + data.currency}</span>
                                </Col>
                            </Row>
                            } 
                            <hr></hr>
                            <Row className="show-grid">
                                <Col xs={4} md={5}> 
                                    <img className="product-item" src={ data.url_image} alt="" /> 
                                </Col>
                                <Col xs={8} md={7}>
                                    <i className="product-item">{data.date_posted}</i>
                                    <XYPlot margin={{top:30, bottom: 30}} xType="ordinal" width={300} height={300}>
                                        <VerticalGridLines />
                                        <HorizontalGridLines />
                                        <XAxis tickLabelAngle={0} />
                                        <YAxis />
                                        {data && data.age_data && 
                                            this.buildAgeData()
                                        }
                                        {/* <VerticalBarSeries
                                            data={[
                                                {x: 'Apples', y: 10},
                                                {x: 'Bananas', y: 5},
                                                {x: 'Cranberries', y: 15}
                                            ]}
                                        />
                                        <VerticalBarSeries
                                            data={[
                                                {x: 'Apples', y: 12},
                                                {x: 'Bananas', y: 2},
                                                {x: 'Cranberries', y: 11}
                                            ]}
                                        /> */}
                                    </XYPlot>
                                </Col>
                            </Row>
                            <hr></hr>
                            <Row className="show-grid"> 
                                {data.description.substring(0,300)}   
                            </Row>
                            
                            <Row className="show-grid">
                                {data.url_page !=='url_page'?
                                    <span>
                                        <a className="product-item" href={data.url_page}>{data.url_page}</a><br/>
                                    </span>
                                    :
                                    <span></span>
                                }  
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({modalShow:false})}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            
        );
    }
}

export default Product;
