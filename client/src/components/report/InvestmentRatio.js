import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getinvestorRatioAction } from '../../actions';
import _ from 'lodash';
import { numberWithCommas } from '../../utils/format'

import { Chart, Axis, Series, Tooltip, Pie } from "react-charts";

import Spinner from '../../components/reactComponent/Spinner';

class InvestmentRatio extends Component{

    constructor() {
        super();
    
        this.state = {
          isLoading: true
        };
    
      }

    componentDidMount() {
        this.setState({ isLoading: true }, () => {
            this.props.getinvestorRatioAction(() => {
              this.setState({ isLoading: false });
            });
          });
    }
    
    rendersumValue() {
        return (
            <tr>
            <td className="indigo-text darken-4">
                <div className="left">
                    รวม:
                </div>
                <div className="right">
                    {`${numberWithCommas(_.sumBy(this.props.report.investorRatio,'value'))} บาท`}
                </div>
                </td>
            </tr>
        );
    }

    renderInvestor() {
        let index = 0;
        if(this.props.report.investorRatio)
            return _.map(this.props.report.investorRatio, (data) => {
                index++;
                return (
                    <tr key={index}>
                        <td>
                            <div className="left left-align">
                                {data.name}
                            </div>
                            <div className="right right-align">
                                {`${numberWithCommas(data.value)} บาท`}
                            </div>
                        </td>
                    </tr>
                );
        });

    }

    renderPieChart = () => {
        const { investorRatio } = this.props.report
        if(investorRatio){               
                        
            const data = [{
                label: "ลงทุน",
                data: _.map(investorRatio, (data) => {
                    return ({
                        'x' : data.name,
                        'y' : data.value
                    })       
                })  
            }]
                 
            return (
                <div style={{width: '100%', height:'300px'}}>
                    <Chart data={data}>
                        <Axis type="pie" />
                        <Series type={Pie} showPoints={false} />
                        <Tooltip />
                    </Chart>
                </div>
            )   
        }

        return  ''     
            
    }

    render() {
        const boxStyle = {
            border: '1px solid #80808020',
            margin: '10px -10px 10px 0px',
            background: '#faf8f8',
            color: '#545454'
        }
        
        const { isLoading } = this.state;

        if (isLoading) return <Spinner />;
        
        return (
            <div>
            <div style={boxStyle}>                
                <div className="right-align red-text">  
                    {this.props.report.errorMessage && <strong>{this.props.report.errorMessage}</strong>}
                </div> 
                <table>
                    <thead>
                        <tr>
                            <th className="indigo-text darken-4 center-align">
                                <h5>สัดส่วนการลงทุน</h5>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderInvestor() }                    
                        { this.rendersumValue() }              
                    </tbody>
                </table>    
                <div className="center-align">
                    {/*this.renderPieChart()*/}
                </div>                                           
            </div>
            <div className="right red-text">*นับเฉพาะรายการที่อยู่ระหว่างทำสัญญาเท่านั้น</div> 
            </div>
        )
    }
}

function mapStateToProps({ report }){
    return { report };
}

export default 
compose(
    connect(mapStateToProps, { getinvestorRatioAction })
) (InvestmentRatio);