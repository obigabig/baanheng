import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { markActionAsComplete } from '../../actions';
import '../../css/dueContractCard.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { ContractStatusValue } from '../../const';

class DueContractCard extends Component {

    constructor() {
        super();
        this.state = {
        }

        this.markAsComplete = this.markAsComplete.bind(this)
    }

    markAsComplete(event, actionId){
        const { contract } = this.props

        confirmAlert({
            title: '',
            message: 'ทำการปิดการแจ้งเตือน ?',
            buttons: [
              {
                label: 'ตกลง',
                onClick: () => this.props.markActionAsComplete(contract._id, actionId)
              },
              {
                label: 'ยกเลิก',
                onClick: () => {}
              }
            ]
          })
        
        event.preventDefault()
    }

    renderCardAction (action){
        const upComingDay = moment(action.dueDate,"DD/MM/YYYY").diff(moment(), 'days');
        const upComingTextColor = (upComingDay) => {
            if(upComingDay <= 10)
                return "red-text darken-4";
            else if(upComingDay <= 20)
                return "orange-text darken-4";
        
            return "green-text darken-4";
        }
        return (
            <div className="card-action dueContractCard-action">  
                <span style={{color:'#4d4d4d'}}>
                    { action.type &&  
                    `${action.description} : ` +
                    `${action.dueDate}`}
                </span>              
                <span 
                    className={`${upComingTextColor(upComingDay)}`}
                    style={{marginRight:'0px'}}
                >                    
                    {action.type && 
                    ` (${upComingDay} วัน)`  
                    }                      
                </span>
                <a className="right"
                    href=""
                    style={{marginRight: '0px', color:'#4d4d4d'}}
                    onClick={(event) => this.markAsComplete(event, action._id)}
                >                   
                    <i className="left Tiny material-icons">check_box_outline_blank</i>
                    <span style={{lineHeight: '25px'}}>เสร็จ</span>                   
                </a>
            </div>
        );        
    }

    render() {
        const {contract} = this.props;
        const cardStyle = (contract) => {
            if(contract.status === ContractStatusValue.new)
                return "color-new"
            else if(contract.status === ContractStatusValue.ongoing)
                return "color-ongoing"
            else if(contract.status === ContractStatusValue.break)
                return "color-break"
             
            //End
            return "color-end";
        }

        return (
            <div className="row">
                <div className="col s12">
                    <div className={`card hoverable dueContractCard ${cardStyle(contract)}`}>
                        <Link to={`/Contract/${contract.no}`}>
                            <div className="dueContractcard-content">
                                <div className="card-title dueContractCard-title"> 
                                    <div className="row">
                                        <div className="col s11 truncate" >
                                            <span>{`#${contract.no} : `} </span> 
                                            <span> {`${contract.title} (${contract.type})`} </span>   
                                        </div>
                                        <div className="col s1 blue-grey-text darken-4">
                                            <i className="material-icons right">edit</i>
                                        </div>   
                                    </div>                    
                                </div>                            
                            </div>
                        </Link>
                        {this.renderCardAction(contract.actions[0])}                          
                        
                    </div>
                </div>             
            </div>
        );
    }
}

export default 
compose(
    connect(null, { markActionAsComplete }),
    withRouter
) (DueContractCard);
