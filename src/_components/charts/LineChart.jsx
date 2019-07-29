import React from 'react'; 
import { connect } from 'react-redux';
// import { userActions } from '../_actions';
import {Form,Button,Alert,FormControl,Image} from 'react-bootstrap'
import '../../assets/css/general.css'  
import {curveCatmullRom} from 'd3-shape'; 
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import LabelComponent from "./LabelComponent";

class LineChart extends React.Component {
    constructor(props) {
        super(props); 
        
        this.state = {
            useCanvas: true
        }; 
        this.afterChartCreated = this.afterChartCreated.bind(this);
    } 
    
    getRandomData() {
      const randomYData = [...new Array(20)].map(() =>
        Math.round(Math.random() * 40)
      );
      return randomYData.map((val, idx) => {
        return {x: idx, y: val};
      });
    }

    afterChartCreated(chart) {
      this.internalChart = chart;
      this.forceUpdate();
    }
  
    render(){ 
        const options = {
          title: {
            text: 'My chart'
          },
          series: [{
            data: [{x:1,y:1},{x:1,y:4},{x:1,y:6}]
          },
          {
            data: [{x:3,y:2},{x:6,y:2},{x:9,y:2}]
          }]
        } 
        const chart = this.internalChart,
        customLabels = [];
  
        // if (chart && chart.xAxis[0]) {
        //   Highcharts.objectEach(chart.xAxis[0].ticks, function(tick) {
        //     customLabels.push(<LabelComponent key={tick+chart.xAxis[0].ticks} tick={tick} />);
        //   });
        // }
        return (
          <div>
            <HighchartsReact 
              key={this.props.id}
              highcharts={Highcharts}
              options={options}
              callback={this.afterChartCreated}
            />
            {customLabels}
          </div>
        );
    }
}
 
function mapStateToProps(store) {
    const { user } = store.authentication; 
    return {
        user
    };
}

const connectedLineChart = connect(mapStateToProps)(LineChart);
export { connectedLineChart as LineChart }; 
 