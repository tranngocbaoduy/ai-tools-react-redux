import React from 'react';
import { Badge, Modal, Media, Card, Image, Container, Row, Col, Button } from 'react-bootstrap' 
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries, VerticalGridLines} from 'react-vis';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
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
        let started_date = 0;
        if (data.post_id === "post_id"){
            started_date = data.start_date;
        }else{
            started_date   = new Date(parseInt(data.start_date)*1000).toLocaleDateString("en-US") 
        }
       
        return ( 
                <Card className="product" key={data._id['$oid']+'in'} style={{margin:0,padding:0,borderRadius:0}}> 
                    <Card.Body style={{padding:'0px'}}>
                        <Card.Img onClick={() => this.setState({modalShow:true})} style={{width:'100%',height:'35vh',borderRadius:'0%',marginTop:'0px'}} src={ data.image_url_product} alt="" /> 
                         
                        <Media>
                            <img
                                width={50}
                                height={50}
                                className="m-2"
                                src={data.image_url_profile}
                                alt={data.page_name}
                            />
                            <Media.Body className="m-2"> 
                                {/* { data.tags && this.buildTag() }  */}
                                <span>
                                    <Image alt="" src="./images/icons/link.svg" style={{width:'12px', height:'12px'}}/>
                                    <a style={{fontSize:'11px'}} href={data.link_url}>{data.link_url.length >= 25?data.link_url.slice(0, 20) + "…" + data.link_url.slice(-5):data.link_url }</a>  
                                </span><br/>
                                <span>
                                    <Image alt="" src="./images/icons/identification.svg" style={{width:'12px', height:'12px'}}/>
                                    <a style={{fontSize:'11px'}} href={data.image_url_profile}> {data.image_url_profile.length >= 25?data.image_url_profile.slice(0, 20) + "…" + data.image_url_profile.slice(-5):data.image_url_profile }</a>  
                                </span><br/>
                                <span>
                                    <Image alt="" src="./images/icons/more.svg" style={{width:'12px', height:'12px'}}/>
                                    <span style={{fontSize:'11px'}}> {data.page_id}</span>  
                                </span><br/> 
                                <span>
                                    <Image alt="" src="./images/icons/more.svg" style={{width:'12px', height:'12px'}}/>
                                    { data.post_id === 'post_id' ? 
                                        <span style={{fontSize:'11px'}}>Ad id: {data.ad_id}</span>   
                                    :
                                        <span style={{fontSize:'11px'}}>Post id: {data.post_id}</span> 
                                    }
                                </span> <br/>
                                <span>
                                    <Image alt="" src="./images/icons/pie-chart.svg" style={{width:'12px', height:'12px'}}/>
                                    <span style={{fontSize:'11px'}}> {started_date}</span>  
                                </span><br/>
                                <span>
                                    <Image alt="" src="./images/icons/enter.svg" style={{width:'12px', height:'12px'}}/>
                                    <span style={{fontSize:'11px'}}> Page Name: {data.page_name}</span>  
                                </span><br/>
                                <span>
                                    <Image alt="" src="./images/icons/enter.svg" style={{width:'12px', height:'12px'}}/>
                                    <span style={{fontSize:'11px'}}> <a  href={'/insight/'+ data._id['$oid']} target="_blank" rel="noopener noreferrer">More</a></span>  
                                </span><br/>
                            </Media.Body>
                           
                        </Media>     
                    </Card.Body>     
                    <Modal  show={modalShow} onHide={() => this.setState({modalShow:false})} aria-labelledby="contained-modal-title-vcenter" size="lg">
                        <Modal.Header closeButton={() => this.setState({modalShow:false})} >
                        <Modal.Title id="contained-modal-title-vcenter">
                        <h5><img src={data.image_url_mockup} alt="" style={{textAlign:'center',width:'30px', height:'30px', borderRadius:'100%'}} /> <i>{data.page_name}</i></h5>
                            {data.title !=='title'?
                                <h3><strong>{data.title}</strong></h3>
                            :
                                <span></span>
                            } 
                            <span className="social-icon-product p-1">
                                <Badge variant="success" >
                                    <Image alt="" src="./images/icons/like.svg"  className="tag-social"/>
                                    <span>{data.number_of_like}</span>
                                </Badge>
                                <Badge variant="success" >
                                    <Image alt="" src="./images/icons/comments.svg" className="tag-social" /> 
                                    <span>{data.number_of_comment}</span>
                                </Badge>
                                <Badge variant="success">
                                    <Image alt="" src="./images/icons/share.svg" className="tag-social" />
                                    <span>{data.number_of_share}</span>
                                </Badge>
                            </span>
                            
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container> 
                                <hr></hr>
                                { data.view !== 'view' && data.currency !== 'currency' ?
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
                                :    
                                    <Row className="show-grid"> - </Row>    
                                }  
                                <hr></hr>
                                <Row className="show-grid">
                                    <Col xs={4} md={5}> 
                                        <img src={ data.image_url_mockup} alt="" /> 
                                    </Col>
                                    <Col xs={8} md={7}>
                                        <i>{started_date}</i>
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
                                    {data.description.substring(0,300)}   
                                </Row>
                                
                                <Row className="show-grid">
                                    More Infomation: { data.link_url !=='link_url' && <a href={data.link_url}> {data.link_url} </a> }  
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
