import React, { Component } from 'react'
import { ContractStatus, ContractType, PropertyType } from '../../const'
import _ from 'lodash'

class ContractFilter extends Component{
    constructor() {
        super();
        this.state = {
            chkStatus_0: false,
            chkStatus_1 : true,
            chkStatus_2 : false,
            chkStatus_3 : false,
            chkPact_0: true,
            chkPact_1 : true,
            chkPact_2 : true,
            chkPropType_0: true,
            chkPropType_1 : true,
            chkPropType_2 : true,
            chkPropType_3 : true,
            chkPropType_4 : true,
            chkPropType_5 : true,
            chkPropType_6 : true,
            chkPropType_7 : true,
            chkPropType_8 : true,
            chkPropType_9 : true,
            chkPropType_10 : true,
            selectedValue : "0"
        }

        this.callUpdateContractList = this.callUpdateContractList.bind(this)
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this)
        this.handleRadioChange = this.handleRadioChange.bind(this)
    }

    callUpdateContractList() {
        let status = []
        let pact = []
        let propType = []

        //Set status condition
        for(let i=0; i<=3 ; i++){
            if(this.state['chkStatus_'+i])
                status.push(i)
        }      

        //Set pact condition
        for(let i=0; i<=2 ; i++){
            if(this.state['chkPact_'+i])
                pact.push(i)
        }  

        //Set prop type condition
        for(let i=0; i<=9 ; i++){
            if(this.state['chkPropType_'+i])
                propType.push(i)
        } 

        this.props.updateContractList(
            status.toString(),
            pact.toString(),
            propType.toString(),
            this.state.selectedValue
        )    
    }

    handleCheckBoxChange(event) {
        this.setState({ [event.target.id]: !this.state[event.target.id] }, () => {
            this.callUpdateContractList()
        })
    }

    handleRadioChange(event) {
        this.setState({
            selectedValue: event.target.value
        }, () => {
            this.callUpdateContractList()
        });
    }


    render(){
        return(
            <div> 
                <ul className="collection">
                    <li className="collection-item">ค้นหา: </li>
                    <li className="collection-item">     
                        <div>                  
                            {                                 
                                _.map(ContractStatus, ({ label, value }, index) => {
                                    return (
                                        <div key={index}>
                                        <label>
                                            <input id={`chkStatus_${index}`}
                                                checked={this.state[`chkStatus_${index}`]}
                                                type="checkbox" 
                                                className="filled-in" 
                                                onChange={this.handleCheckBoxChange}
                                            />
                                            <span>{label}</span>
                                        </label>
                                        </div>
                                    )
                                })                                
                            }  
                        </div>                                        
                    </li>
                    <li className="collection-item">
                        <div>
                            {                                
                                _.map(ContractType, ({ label, value }, index) => {
                                    return (
                                        <div key={index}>
                                            <label>
                                                <input id={`chkPact_${index}`}
                                                    checked={this.state[`chkPact_${index}`]}
                                                    type="checkbox" 
                                                    className="filled-in" 
                                                    onChange={this.handleCheckBoxChange}
                                                />
                                                <span>{label}</span>
                                            </label>
                                        </div>
                                    )
                                })                                  
                            }  
                        </div>                                          
                    </li>
                    <li className="collection-item">
                    <div>
                            {                                
                                _.map(PropertyType, ({ label, value }, index) => {
                                    return (
                                        <div key={index}>
                                            <label>
                                                <input id={`chkPropType_${index}`}
                                                    checked={this.state[`chkPropType_${index}`]}
                                                    type="checkbox" 
                                                    className="filled-in" 
                                                    onChange={this.handleCheckBoxChange}
                                                />
                                                <span>{label}</span>
                                            </label>
                                        </div>
                                    )
                                })                                  
                            }  
                        </div>
                    </li>
                    <li className="collection-item">                        
                        <div >
                            <label>
                            <input id="radValue0"
                                checked={this.state.selectedValue === '0'}
                                value="0"
                                name="groupValue"
                                type="radio" 
                                className="with-gap"
                                onChange={this.handleRadioChange}
                             />
                            <span>ทั้งหมด</span>
                            </label>
                        </div>
                        <div >
                            <label>
                            <input id="radValue1"
                                checked={this.state.selectedValue === '1'}
                                value="1"
                                name="groupValue"
                                type="radio" 
                                className="with-gap"
                                onChange={this.handleRadioChange}
                             />
                            <span>0-5 แสนบาท</span>
                            </label>
                        </div>
                        <div >
                            <label>
                            <input id="radValue1"
                                checked={this.state.selectedValue === '2'}
                                value="2"
                                name="groupValue"
                                type="radio" 
                                className="with-gap"
                                onChange={this.handleRadioChange}
                             />
                            <span>0.5-1 ล้านบาท</span>
                            </label>
                        </div>
                        <div >
                            <label>
                            <input id="radValue1"
                                checked={this.state.selectedValue === '3'}
                                value="3"
                                name="groupValue"
                                type="radio" 
                                className="with-gap"
                                onChange={this.handleRadioChange}
                             />
                            <span>1-2 ล้านบาท</span>
                            </label>
                        </div>
                        <div >
                            <label>
                            <input id="radValue1"
                                checked={this.state.selectedValue === '4'}
                                value="4"
                                name="groupValue"
                                type="radio" 
                                className="with-gap"
                                onChange={this.handleRadioChange}
                             />
                            <span>>2 ล้านบาท</span>
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default (ContractFilter);
