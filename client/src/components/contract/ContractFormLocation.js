import React, { Component } from 'react';
import { Field, getFormValues } from 'redux-form';
import TextInput from '../reduxFormComponent/TextInput';
import { connect } from 'react-redux';
import { updateContractLocationAction } from '../../actions';

class ContractFormLocation extends Component {
   
    getCurrentLocation({updateContractLocationAction}) {
        navigator.geolocation.getCurrentPosition((position) => {
            const googleMapLink = 
            `https://www.google.com/maps/@${position.coords.latitude},${position.coords.longitude},17z`;
            updateContractLocationAction(googleMapLink);
        });
    }

    openGoogleMap(e){
        e.preventDefault();
        if(this.props.contractForm.contractLocation)
            window.open(this.props.contractForm.contractLocation.url, '_blank');
    }

    render() {
        return (
            <div>
                <div className="row blue-grey white-text text-darken-2 valign-wrapper"
                    style={{height:'36px', marginTop: '10px'}}>                     
                    <div className="col s1 right-align">
                        <i className="material-icons valign-wrapper">place</i> 
                    </div>  
                    <div className="col s11 left-align"><h6> ตำแหน่ง </h6></div>     
                </div> 
                <div className="row v-wrapper">
                    <div className="col s7">
                        <Field type="text" 
                            name="url" 
                            component={TextInput} 
                            placeholder="Google maps link"
                        />
                    </div> 
                    <div className="col s5 left-align">
                        <div className="row" style={{lineHeight: '55px'}}>      
                            <div className="left">                    
                                <button className="btn-flat deep-orange lighten-2 white-text"
                                            name="btnSearchLocation"
                                            type="button"
                                            title="ค้นหาตำแหน่ง"
                                            style={{padding: '0px 15px 0px 15px',
                                                    marginRight:'10px'}}
                                            onClick={() => this.getCurrentLocation(this.props)} 
                                            disabled={true}                               
                                        >
                                        <i className="material-icons center-align">location_searching</i>   
                                            
                                </button>  
                            </div>
                            <div className="left">  
                                <button className="btn-flat green lighten-2 white-text center-align" 
                                    name="btnMapsLink"
                                    title="เปิดบน Google"
                                    style={{padding: '0px 15px 0px 15px'}}
                                    onClick={(e) => this.openGoogleMap(e)} 
                                >
                                    <i className="material-icons">map</i>                            
                                </button> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        contractForm: getFormValues('contract')(state)
    };
}

export default connect( mapStateToProps, {updateContractLocationAction})(ContractFormLocation);