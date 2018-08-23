import React, { Component } from 'react'
import {Collapse} from 'react-collapse'

class ContractFilter extends Component{
    constructor() {
        super();
        this.timeout =  0;
        this.state = {
            isFilterOpen: false,
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
        this.handleNumberSearch = this.handleNumberSearch.bind(this)
        this.handleTitleSearch = this.handleTitleSearch.bind(this)        
        this.searchContact = this.searchContact.bind(this)    
        this.toogleFilterPanel = this.toogleFilterPanel.bind(this)
        
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

    handleNumberSearch(event) {
        const searchText = event.target.value; 
        this.setState({
                no: searchText
            });

    }

    handleTitleSearch(event) {
        const searchText = event.target.value; 
        this.setState({
            title: searchText
        });
    }

    toogleFilterPanel(event) {
   
        this.setState({
            isFilterOpen: !this.state.isFilterOpen
        });
    }

    searchContact(event){
        this.callUpdateContractList()
    }

    render(){
        return(
        <div className="collapseBox">
            <div className="collapseTitle">
                    <label>
                        <div className="row" onClick={this.toogleFilterPanel} >     
                            <div className="col s11">
                                <span className="valign-wrapper" style={{ fontSize: '20px'}}> 
                                    <i className={`Medium material-icons`}>
                                        search
                                    </i> 
                                    ค้นหา
                                </span>
                            </div>    
                            <div className="col s1"> 
                                <i className="Medium material-icons right"
                                    style={{paddingTop:'2px'}}>
                                    {this.state.isFilterOpen? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
                                    </i>
                            </div>              
                        </div>   
                </label>
            </div>
            <div>
                <Collapse isOpened={this.state.isFilterOpen}>
                    <div className="row">    
                        <div className="col s12">                
                                    <input
                                        name="no"
                                        type= "text"
                                        placeholder="เลขที่"    
                                        onChange={this.handleNumberSearch}                                             
                                        />                
                                        <input
                                            name="title"
                                            type= "text"
                                            placeholder="ชื่อสัญญา" 
                                            onChange={this.handleTitleSearch}             
                                        />   
                        </div>
                        <div className="col s12">
                                        <button type="submit" 
                                            className="right waves-effect waves-light btn"
                                            onClick={this.searchContact}    >
                                            ค้นหา
                                        </button>
                        </div>
                    </div>
                </Collapse>
            </div> 
        </div>
        )
    }
}

export default (ContractFilter);
