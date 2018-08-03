import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getinvestorRatioAction } from '../../actions';
import _ from 'lodash';
import { numberWithCommas } from '../../utils/format'

class InvestorRatio extends Component{

    componentDidMount() {
        this.props.getinvestorRatioAction();  
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
                            <div className="Truncation">
                                {data.name}
                            </div>
                            <div className="right-align">
                                {`${numberWithCommas(data.value)} บาท`}
                            </div>
                        </td>
                    </tr>
                );
        });

    }

    render() {
        const boxStyle = {
            border: '1px solid #80808020',
            margin: '10px -10px 10px 0px',
            background: '#faf8f8',
            color: '#545454'
        }
        
        return (
            <div style={boxStyle}>                
                <div className="right-align red-text">  
                    {this.props.report.errorMessage && <strong>{this.props.report.errorMessage}</strong>}
                </div> 
                <table>
                    <thead>
                        <tr>
                            <th className="indigo-text darken-4">สัดส่วนการลงทุน</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderInvestor() }                    
                        { this.rendersumValue() }              
                    </tbody>
                </table>               
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
) (InvestorRatio);