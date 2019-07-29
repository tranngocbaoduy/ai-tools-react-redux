import React from 'react'; 
import { connect } from 'react-redux'; 
import '../../assets/css/general.css'   
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official' 

class LineChart extends React.Component {
    constructor(props) {
        super(props); 
        
        this.state = {
            data: this.props.data!=='age_data'?JSON.parse(this.props.data):[]
        }; 
        this.afterChartCreated = this.afterChartCreated.bind(this);
        this.transData = this.transData.bind(this);
    }  

    afterChartCreated(chart) {
      this.internalChart = chart;
      this.forceUpdate();
    } 
    
    transData(type){ 
      // check data is exist
      const { data } = this.state
      return data.map((val) => { 
        return Math.round(val[type]*100);
      }); 
    }
  
    buildxAxis(){
      const { data } = this.state 
      return data.map((val) => {
        return val.age_range;
      })
    }

    render(){ 
        const options = {
          title: {
            text: 'Age Chart'
          },
          xAxis: [{
              categories: this.buildxAxis()
          }],
          yAxis: {
            title: {
                text: 'Age Percentage'
            }
          },
          series: [{
            name:'Female',
            data: this.transData('female'),
            type: 'areaspline'
          },
          {
            name:'Male',
            data: this.transData('male'),
            type: 'areaspline',
          }]
        }  
        return (
          <div>
            <HighchartsReact 
              key={this.props.id}
              highcharts={Highcharts}
              options={options}
              callback={this.afterChartCreated} 
            />  
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
 