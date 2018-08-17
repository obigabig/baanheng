import React, {Component} from 'react';
import moment from 'moment';
import '../../css/popup.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import NumberFormat from 'react-number-format';

//Const
import { ActionsType, ActionsTypeValue } from '../../const';

//When Click this form all props will be assign to Contractform
class AddActionsPopup extends Component {
    state = {
        selectedActionTypeOption: '',
        description: '',
        period: '',
        dueDate: '',
        errorMessage: ''
    }

    handleAddAction = (event) => {
        const {selectedActionTypeOption, description, period, dueDate} = this.state;
        let savedDescription;
        if(selectedActionTypeOption.value === 'อื่นๆ')
            savedDescription = description
        else
            savedDescription = selectedActionTypeOption.value

        if(this.validateAddAction()){
            this.props.addActionToForm(selectedActionTypeOption.value, savedDescription, period, dueDate);
        }
    }

    validateAddAction = () => {
        const {selectedActionTypeOption, description, dueDate, period} = this.state;
        this.setState({ errorMessage: '' });

        if(selectedActionTypeOption.value === 'อื่นๆ' && description === ''){
            this.setState({ errorMessage: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
            return false;
        }            
        if(selectedActionTypeOption && dueDate && period){
            return true;
        }
        this.setState({ errorMessage: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
        return false;
    }

    handleActionTypeChange = (event) => {
        if(event === ActionsTypeValue.other){
            this.setState({ 
                selectedActionTypeOption: event
            })
        }
        else{
            this.setState({ 
                selectedActionTypeOption: event,
                description : ''
            })
        }
    }

    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value});
    }

    handlePeriodChange = (event) => {
        this.setState({period: event.target.value});
    }
    
    handleActionDateChange = (date) => {
        this.setState({ dueDate: moment(date).format('DD/MM/YYYY') });
    }

    renderDescription = () => {
        const { selectedActionTypeOption } = this.state;
        if(selectedActionTypeOption.value === ActionsTypeValue.other){
            return (                
                <div>                    
                    <label>เพิ่มเติม :</label>
                     <input
                        name="description"
                        type= "text"
                        placeholder="เพิ่มเติม"    
                        onChange={this.handleDescriptionChange}             
                        />
                </div>
            )
        }
        return ''
    }

    render() {

    const {closePopup} = this.props;
    const { selectedActionTypeOption } = this.state;
    const selectedActionValue = selectedActionTypeOption && selectedActionTypeOption.value;

      return (
        <div className='popup'>
          <div className='popup_inner popupNew'>
            <div className="right-align"> 
                <button type="button" onClick={closePopup} className="btn-flat"><i className="material-icons">close</i></button>
            </div>
            <div className="container">                  
                <div className="row valign-wrapper">   
                    <div className="col s1 right ">
                        <i className="material-icons valign-wrapper">alarm_on</i> 
                    </div>  
                    <div className="col s11"><h5> {this.props.actionId? 'แก้ไขรายการ' : 'เพิ่มรายการ'} </h5></div>            
                </div>    
                <div>
                    <label>รายการ:</label>
                    <Select
                        name="actionType"
                        value={selectedActionValue}
                        onChange={this.handleActionTypeChange}
                        options={ActionsType}
                        placeholder = "รายการ"
                    />
                </div>  
                {this.renderDescription()} 
                <div className="row">
                    <div className="col s4">
                        <label>ระยะเวลา:</label>                      
                        <NumberFormat   
                            name="period"                 
                            placeholder="ระยะเวลา"
                            value={this.state.period} 
                            onChange={this.handlePeriodChange}
                        />   
                    </div> 
                    <div className="col s8">    
                        <label>
                            วันครบกำหนด:
                        </label>
                        <DatePicker
                            placeholder="วันที่แจ้งเตือน"
                            dateFormat="DD/MM/YYYY"
                            selected={this.state.dueDate ? moment(this.state.dueDate, 'DD/MM/YYYY') : null}
                            onChange={this.handleActionDateChange}
                        />  
                    </div> 
                </div>
                <div>
                                  
                </div>               
                <div className="right-align">
                    { this.state.errorMessage && <span className="red-text">{this.state.errorMessage}</span> }
                </div>
                <div className="right-align" style={{ margin: '10px 0 30px 0'}}>       
                    <button type="button" 
                        onClick={this.handleAddAction} 
                        className="waves-effect waves-light btn"
                        style={{ zIndex: '0'}}
                    >บันทึก</button>  
                </div>  
             
            </div>                  
          </div>
        </div>
      );
    }
}

export default (AddActionsPopup);