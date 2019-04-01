import React from 'react'
import { mount } from 'enzyme'
import { reducer as formReducer } from 'redux-form'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import { ContractForm } from '../ContractForm'

describe('Edit mode', ()=>{

    let store
    let wrapper
    
    let updateContractActionMock;
    let updateContractSubInvestorFormActionMock;
    let initContractFormActionMock;
    let getContractActionMock;
    let deleteContractActionMock;
    let clearErrorMessageActionMock;
    let handleSubmitMock;
    let touched, error, handleSubmit;

    beforeEach(() => {
		store = createStore(combineReducers({ form: formReducer }))

        updateContractActionMock = jest.fn();
        updateContractSubInvestorFormActionMock = jest.fn();
        initContractFormActionMock = jest.fn();
        getContractActionMock = jest.fn();
        deleteContractActionMock = jest.fn();
        clearErrorMessageActionMock = jest.fn();
        handleSubmitMock = jest.fn();
		touched = false;
        error = null;

		const props = {
            mode:'edit',
            id : "",            
        }
        
		wrapper = mount(
			<Provider store={store}>
				<ContractForm {...props} handleSubmit/>
			</Provider>
		)
    })
    //-------------------------------------------------------------------------------------
    
    it('xxx', () => {        
        
    })

})
