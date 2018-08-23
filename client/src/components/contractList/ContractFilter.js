import React, { Component } from 'react'
import { ContractStatus, ContractType, PropertyType } from '../../const'
import _ from 'lodash'

class ContractFilter extends Component{
    constructor() {
        super();
        this.timeout =  0;
        this.state = {
            no: '',
            title: '',
            chkStatusCount: 4,
            chkStatus_0: true,
            chkStatus_1 : true,
            chkStatus_2 : true,
            chkStatus_3 : true,
            chkPactCount: 3,
            chkPact_0: true,
            chkPact_1 : true,
            chkPact_2 : true,
            chkPropTypeCount: 10,
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
            selectedValue : "0"
        }

        this.callUpdateContractList = this.callUpdateContractList.bind(this)
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this)
        this.handleRadioChange = this.handleRadioChange.bind(this)
        this.handleNumberSearch = this.handleNumberSearch.bind(this)
        this.handleTitleSearch = this.handleTitleSearch.bind(this)        
    }

    callUpdateContractList() {
        let status = []
        let pact = []
        let propType = []

        //Set status condition
        for(let i=0; i<=this.state.chkStatusCount-1 ; i++){
            if(this.state['chkStatus_'+i])
                status.push(i)
        }      
        

        //Set pact condition
        for(let i=0; i<=this.state.chkPactCount-1 ; i++){
            if(this.state['chkPact_'+i])
                pact.push(i)
        }  

        //Set prop type condition
        for(let i=0; i<=this.state.chkPropTypeCount-1 ; i++){
            if(this.state['chkPropType_'+i])
                propType.push(i)
        } 

        this.props.updateContractList(
            this.state.no,
            this.state.title,
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

    handleNumberSearch(event) {
        const searchText = event.target.value; // this is the search text
        if(this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            //search function
            this.setState({
                no: searchText
            }, () => {
                this.callUpdateContractList()
            });
        }, 500);
    }

    handleTitleSearch(event) {
        const searchText = event.target.value; // this is the search text
        if(this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            //search function
            this.setState({
                title: searchText
            }, () => {
                this.callUpdateContractList()
            });
        }, 500);
    }

    renderSelectAll(stateType) {
        const setTrue = () => {
            const allState = {}
            for(let i=0; i<= this.state[stateType + 'Count'] ; i++){
                allState[[stateType + '_' + i]] = true 
            } 
            this.setState(allState, () => {
                this.callUpdateContractList()
            })               
        }
        
        return (  
            <div>
                <div className="right" >       
                    <a className="valign-wrapper" href="#!" onClick={setTrue} style={{fontSize:'small'}}>
                        เลือกทั้งหมด
                        <i className="tiny material-icons">select_all</i> 
                    </a>
                </div>
                <div style={{clear:'both'}}></div>
            </div>
        )
    }

    renderDeSelectAll(stateType) {
        const setFalse = () => {
            const allState = {}
            for(let i=0; i<= this.state[stateType + 'Count'] ; i++){
                allState[[stateType + '_' + i]] = false 
            } 
            this.setState(allState, () => {
                this.callUpdateContractList()
            })               
        }
        
        return (    
            <div>
                <div className="right" >       
                    <a className="valign-wrapper" href="#!" onClick={setFalse} style={{fontSize:'small'}}>
                        ลบทั้งหมด 
                        <i className="tiny material-icons">delete_sweep</i> 
                    </a>
                </div>
                <div style={{clear:'both'}}></div>
            </div>
        )
    }

    renderBulkSelection(stateType){
        return (
            <div>
                {this.renderSelectAll(stateType)}
                {this.renderDeSelectAll(stateType)}
            </div>
        )
    }

    render(){
        return(
            <div> 
                <ul className="collection">
                    <li className="collection-item">ค้นหา </li>
                    <li className="collection-item">
                        <div>                    
                            <label>เลขที่: </label>
                            <input
                                name="no"
                                type= "text"
                                placeholder="เลขที่"    
                                onChange={this.handleNumberSearch}                                             
                                />
                        </div>
                    </li>
                    <li className="collection-item">
                        <div>                    
                            <label>ชื่อสัญญา: </label>
                            <input
                                name="title"
                                type= "text"
                                placeholder="ชื่อสัญญา" 
                                onChange={this.handleTitleSearch}             
                                />
                        </div>
                    </li>
                    <li className="collection-item">     
                        {this.renderBulkSelection('chkStatus')}
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
                        {this.renderBulkSelection('chkPact')}
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
                        {this.renderBulkSelection('chkPropType')}
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
