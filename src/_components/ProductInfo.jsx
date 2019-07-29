import React from 'react';
import { connect } from 'react-redux'; 
import { productActions } from '../_actions' 
import { Spinner, Col,Card, Jumbotron, Badge, Row } from 'react-bootstrap'
import { history } from '../_helpers' 
import { VerticalBarSeries} from 'react-vis';
import  {LineChart, PieChart}  from './charts'
class ProductInfo extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            item:this.props.item, 
            hoveredNode: false,
            treemapData: _getRandomData(20),
            useCirclePacking: false,
            useCanvas: false
        };

        this.loadProduct = this.loadProduct.bind(this);
    }

    componentDidMount(){ 
        this.loadProduct()
    }

    loadProduct(props){ 
        const { dispatch } = this.props;  
        let user = JSON.parse(localStorage.getItem('user')); 
        const { pathname } = history.location  
        const id = pathname.split("/")[2] 
        if(user && id){ 
          dispatch(productActions.getById(id, user.token));
        } 
    }

    buildAgeData(){
        const { item } = this.props; 
        let _content = [];
        try{
            const age_data = item.age_data?JSON.parse(item.age_data):'';
            if(age_data!==''){  
                let i =0;  
                for (let ele of age_data){   
                    _content.push( 
                        <VerticalBarSeries key={i++}
                            data={[ 
                                { x: 'male', y: ele.female *100  },
                                { x: 'female', y: ele.female *100 }
                            ]}
                        />
                        
                    )
                } 
            }
        }
        catch{ } 
        return _content;
    }

    buildTag(){
        const { item } = this.props;
        const variant = [
            'primary',
            'secondary',
            'success',
            'danger',
            'warning',
            'info'
            ];

        let _content = [];
        if (item && item.tags){
            item.tags.forEach(element => {  
                _content.push(
                    <Badge key={item._id+element} variant={variant[Math.floor(Math.random() * 5)]}>{element}</Badge>
                )
            });
        }
        return _content;
    }

    buildLocationData(){
        const { item } = this.props; 
        let _content = [];
        try{
            const region_data = item.region_data?JSON.parse(item.region_data):'';
            if(region_data!==''){  
                let i =0;   
                for (let item of region_data){   
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
        catch{ } 
        return _content;
    }
     
    render() {
        const { item, loadingProduct} = this.props; 
        const started_date   = new Date(parseInt(item?item.start_date:0)*1000).toLocaleDateString("en-US")
        const started_time   = new Date(parseInt(item?item.start_date:0)*1000).toLocaleTimeString("en-US") 
        
        return ( 
            <div> 
                {loadingProduct && 
                    <Spinner as="span" size="sm" animation="grow" variant="danger" style={{float:'right',margin:'3px'}} /> 
                }  
                {item  && 
                    <Jumbotron>
                        <Row border="primary" key={item._id+'in'} >   
                            <Card style={{ margin:'1vw'}}> 
                                <Card.Header>
                                    <h5 className="product-item">
                                        <img src={item.snap_shot.page_profile_picture_url} alt="" style={{width:'30px', height:'30px', borderRadius:'100%'}} /> 
                                        <b>{item.snap_shot.page_name} </b>|| 
                                        <i className="product-item"> {started_date+' '+started_time}</i>
                                    </h5>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>
                                        {item.snap_shot.title !=='title' &&
                                            <h3 className="product-item"><strong>{item.snap_shot.title}</strong></h3> 
                                        }
                                        {item.tags && this.buildTag()}
                                    </Card.Title>
                                    <Card.Text>
                                        {item.snap_shot.link_description !== 'link_description' && item.snap_shot.link_description}<br/>  
                                    </Card.Text> 
                                    <Row className="show-grid">
                                        <Col lg={6} xs={6}>
                                            <h5>View</h5>
                                            <hr></hr>
                                            <span>{item.view}</span>
                                        </Col>
                                        <Col lg={6} xs={6}>
                                            <h5>Money</h5>
                                            <hr></hr>
                                            <span>{item.price + ' '+item.currency}</span>
                                        </Col>
                                    </Row>
                                    <Row className='mt-3'>
                                        <Col lg={6} xs={6}>
                                            <h5>Image</h5>
                                            <hr></hr>
                                            <Row>
                                                <Col lg={6} xs={6}>
                                                    <Card.Img variant="top" className='m-1'  src={ item.snap_shot.original_image_url} alt="" />
                                                </Col>
                                                <Col lg={6} xs={6}>
                                                    <Card.Img variant="bottom" className='m-1'  src={ item.snap_shot.resize_image_url} alt="" />
                                                </Col> 
                                            </Row>
                                        </Col>
                                        <Col lg={6} xs={6}>
                                            <h5>Info</h5>
                                            <hr></hr>
                                            link url:{item.snap_shot.link_url !=='url_page' && <a className="product-item" href={item.snap_shot.link_url}> {item.snap_shot.link_url}</a>}<br></br>
                                            page profile uri:{item.snap_shot.page_profile_uri !=='page_profile_uri' && <a className="product-item" href={item.snap_shot.page_profile_uri}> {item.snap_shot.page_profile_uri}</a>}<br></br>
                                            page id:{item.snap_shot.page_id !=='page_id' && <span> {item.snap_shot.page_id}</span>}<br></br>
                                            page name: {item.snap_shot.page_name !=='page_id' && <span> {item.snap_shot.page_name}</span>}<br></br>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            
                            </Card>
                        </Row> 
                        <Row>
                            <Col lg={12}> 
                                <LineChart id={item._id['$oid']+'line-chart'} data={item.age_data}></LineChart>
                            </Col>
                            <Col lg={12}> 
                                <PieChart id={item._id['$oid']+'pie-chart'} data={item.region_data}></PieChart>
                            </Col>
                            
                            {/* <Col lg={6}>
                                <XYPlot margin={{top:30, bottom: 30}} xType="ordinal" width={300} height={300}>
                                    <VerticalGridLines />
                                    <HorizontalGridLines />
                                    <XAxis tickLabelAngle={0} />
                                    <YAxis />
                                    {item && item.region_data ? 
                                        this.buildLocationData() 
                                    :
                                        <div>no data location</div>
                                    }
                                </XYPlot>
                            </Col> */}
                            
                        </Row>   
                    </Jumbotron>
                } 
            </div>
        );
    }
} 

const mapStateToProps = (store) => {  
    const { item, loadingProduct } = store.product; 
    return {
        item,
        loadingProduct, 
    };
}

const connectedProductInfo = connect(mapStateToProps)(ProductInfo);
export { connectedProductInfo as ProductInfo }; 


function _getRandomData(total) {
    const totalLeaves = total || Math.random() * 20;
    const leaves = [];
    for (let i = 0; i < totalLeaves; i++) {
      leaves.push({
        name: total ? total : String(Math.random()).slice(0, 3),
        size: Math.random() * 1000,
        color: Math.random(),
        style: {
          border: 'thin solid red'
        }
      });
    }
    return {
      title: '',
      color: 1,
      children: leaves
    };
}