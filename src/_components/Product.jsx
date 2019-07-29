import React from 'react';
import { Badge, Modal, Media, Card, Image, Container, Row, Col, Button } from 'react-bootstrap' 
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
                    <Badge key={data._id['$oid']+element} variant={variant[Math.floor(Math.random() * 5)]}>{element}</Badge>
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
        const started_date   = new Date(parseInt(data?data.start_date:0)*1000).toLocaleDateString("en-US")
        const started_time   = new Date(parseInt(data?data.start_date:0)*1000).toLocaleTimeString("en-US") 
        return ( 
                <Card className="product" key={data._id['$oid']+'in'} style={{margin:0,padding:0,borderRadius:0}}> 
                    <Card.Body style={{padding:'0px'}}>
                        <Card.Img onClick={() => this.setState({modalShow:true})} style={{width:'100%',height:'35vh',borderRadius:'0%',marginTop:'0px'}} src={ data.snap_shot.original_image_url} alt="" /> 
                        {/* <Card.Title>
                            {data.snap_shot.title !=='title' &&
                                <h4  style={{fontSize:'10px'}}><strong>{data.snap_shot.title}</strong></h4> 
                            } 
                        </Card.Title>
                        
                        <Card.Text>  
                            
                        </Card.Text>  */}
                        <Media>
                            <img
                                width={50}
                                height={50}
                                className="m-2"
                                src={data.snap_shot.page_profile_picture_url}
                                alt={data.snap_shot.page_name}
                            />
                            <Media.Body className="m-2">
                                {/* <h5 style={{fontSize:'12px'}}> 
                                    <b>{data.snap_shot.page_name} </b><br/>
                                    <i > {started_date+' '+started_time}</i>
                                </h5>
                                { data.tags && this.buildTag() }  */}
                                <span>
                                    <Image alt="" src="./images/icons/link.svg" style={{width:'12px', height:'12px'}}/>
                                    <a style={{fontSize:'11px'}} href={data.snap_shot.link_url}> {data.snap_shot.link_url.substring(12,45)}</a>  
                                </span><br/>
                                <span>
                                    <Image alt="" src="./images/icons/identification.svg" style={{width:'12px', height:'12px'}}/>
                                    <a style={{fontSize:'11px'}} href={data.snap_shot.page_profile_uri}> {data.snap_shot.page_profile_uri.substring(12)}</a>  
                                </span><br/>
                                <span>
                                    <Image alt="" src="./images/icons/more.svg" style={{width:'12px', height:'12px'}}/>
                                    <span style={{fontSize:'11px'}}> {data.snap_shot.page_id}</span>  
                                </span><br/>
                                <span>
                                    <Image alt="" src="./images/icons/pie-chart.svg" style={{width:'12px', height:'12px'}}/>
                                    <span style={{fontSize:'11px'}}> {started_date+' '+started_time}</span>  
                                </span><br/>
                                <span>
                                    <Image alt="" src="./images/icons/enter.svg" style={{width:'12px', height:'12px'}}/>
                                    <span style={{fontSize:'11px'}}> <a href={'/insight/'+ data._id['$oid']}>More</a></span>  
                                </span><br/>
                            </Media.Body>
                           
                        </Media>     
                    </Card.Body>     
                    <Modal  show={modalShow} onHide={() => this.setState({modalShow:false})} aria-labelledby="contained-modal-title-vcenter" size="lg">
                        <Modal.Header closeButton={() => this.setState({modalShow:false})} >
                        <Modal.Title id="contained-modal-title-vcenter">
                        <h5 className="product-item"><img src={data.snap_shot.original_image_url} alt="" style={{textAlign:'center',width:'30px', height:'30px', borderRadius:'100%'}} /> <i>{data.snap_shot.page_name}</i></h5>
                            {data.snap_shot.title !=='title'?
                                <h3 className="product-item"><strong>{data.snap_shot.title}</strong></h3>
                            :
                                <span></span>
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
                                        <img className="product-item" src={ data.snap_shot.original_image_url} alt="" /> 
                                    </Col>
                                    <Col xs={8} md={7}>
                                        <i className="product-item">{started_date}</i>
                                        <XYPlot margin={{top:30, bottom: 30}} xType="ordinal" width={300} height={300}>
                                            <VerticalGridLines />
                                            <HorizontalGridLines />
                                            <XAxis tickLabelAngle={0} />
                                            <YAxis />
                                            {data && data.age_data && 
                                                this.buildAgeData()
                                            } 
                                        </XYPlot>
                                    </Col>
                                </Row>
                                <hr></hr>
                                <Row className="show-grid"> 
                                    {data.snap_shot.link_description.substring(0,300)}   
                                </Row>
                                
                                <Row className="show-grid">
                                    { data.snap_shot.link_url !=='link_url' && <a className="product-item" href={data.snap_shot.link_url}>{data.snap_shot.link_url}</a> }  
                                </Row>  
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => this.setState({modalShow:false})}>Close</Button>
                        </Modal.Footer>
                    </Modal> 
                </Card>  
        );
    }
}

export default Product;

