import React from 'react'; 
import { connect } from 'react-redux'; 
import '../../assets/css/general.css'   
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
// import LabelComponent from "./LabelComponent";

class PieChart extends React.Component {
    constructor(props) {
        super(props); 
        
        this.state = {
            useCanvas: true
        }; 
        this.afterChartCreated = this.afterChartCreated.bind(this);
        this.transData = this.transData.bind(this);
    }  

    afterChartCreated(chart) {
      this.internalChart = chart;
      this.forceUpdate();
    }

    componentWillMount(){  
        this.transData()
    }

    transData(){ 
      // check data is exist
      let data = this.props.data!=='region_data'?JSON.parse(this.props.data):[] 
      return data.map((val) => { 
        return [val.region, val.reach];
      }); 
    }
  
    render(){ 
        const options = {
          title: {
            text: 'Region Chart'
          },
          series: [{ 
            data: this.transData(),
            type: 'pie'
          }]
        } 
        // const chart = this.internalChart,
        //         customLabels = [];
         
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
            {/* {customLabels} */}
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

const connectedPieChart = connect(mapStateToProps)(PieChart);
export { connectedPieChart as PieChart }; 
 