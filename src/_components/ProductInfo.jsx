import React from 'react';
import { connect } from 'react-redux'; 
import { productActions } from '../_actions' 
import { Spinner, Col, Jumbotron, Badge, Row, Button } from 'react-bootstrap'
import { history } from '../_helpers'
import {curveCatmullRom} from 'd3-shape';
import {XYPlot, XAxis, YAxis, ChartLabel,HorizontalGridLines,LineSeries,LineSeriesCanvas, VerticalBarSeries, VerticalGridLines} from 'react-vis';
import  {LineChart}  from './charts'
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
                // const ITEMS = [
                //     'Options',
                //     'Buttons',
                //     'Select boxes',
                //     'Date inputs',
                //     'Password inputs',
                //     'Forms',
                //     'Other'
                //   ];
                  
                for (let ele of age_data){  
                    console.log(ele)
                    // _content.push(<DiscreteColorLegend key={i++}
                    //     items={ITEMS}>
                    // </DiscreteColorLegend>)
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
                // const ITEMS = [
                //     'Options',
                //     'Buttons',
                //     'Select boxes',
                //     'Date inputs',
                //     'Password inputs',
                //     'Forms',
                //     'Other'
                //   ];
                  
                for (let item of region_data){  
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
        catch{ } 
        return _content;
    }
     
    render() {
        const { item, loadingProduct} = this.props; 
        const { started_date }  = new Date(parseInt(item?item.started_date:0)*1000)  
        const {useCanvas} = this.state;
        const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
        const Line = useCanvas ? LineSeriesCanvas : LineSeries;
        return ( 
            <div> 
                {loadingProduct && 
                    <Spinner as="span" size="sm" animation="grow" variant="danger" style={{float:'right',margin:'3px'}} /> 
                }  
                {item && 
                    <Row key={item._id+'in'} >   
                    <Jumbotron>
                            <h5 className="product-item"><img src={item.snap_shot.page_profile_picture_url} alt="" style={{width:'30px', height:'30px', borderRadius:'100%'}} /> <i>{item.snap_shot.page_name}</i></h5>
                            {item.tags && this.buildTag()}
                            <hr></hr>
                            {item.snap_shot.title !=='title'?
                                <h3 className="product-item"><strong>{item.snap_shot.title}</strong></h3>
                            :
                                <span></span>
                            }
                            <i className="product-item">{started_date}</i>
                            <img className="product-item" style={{width:'30vw', height:'30vh'}} src={ item.snap_shot.original_image_url} alt="" /> 
                            <hr></hr>
                            <p className='product-item'>{item.snap_shot.link_description} <a href={'/insight/'+item._id}> read more ...</a><br/></p>  
                            {/* <span className="product-item">{item.like} {item.brand}</span><br/> */}
                            <hr></hr>
                            {item.url_page !=='url_page'?
                                <span>
                                    <a className="product-item" href={item.url_page}>{item.url_page}</a><br/>
                                </span>
                                :
                                <span></span>
                            }  
                            <Row>
                                <Col lg={12}> 
                                    <LineChart id={item._id['$oid']+'line-chart'}></LineChart>
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
                    </Row>
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