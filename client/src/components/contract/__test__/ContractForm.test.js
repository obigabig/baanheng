import React from 'react'
import { shallow } from 'enzyme'

import { ContractForm } from '../ContractForm'


describe('submit click', ()=>{
    let wrapper;

    let createContractActionMock;
    let initContractFormActionMock;
    let clearErrorMessageActionMock;
    let handleSubmitMock;

    beforeEach(() => {
        createContractActionMock = jest.fn();
        initContractFormActionMock = jest.fn();
        clearErrorMessageActionMock = jest.fn();
        handleSubmitMock = jest.fn();

        wrapper = shallow(
            <ContractForm mode="new" id="" 
                contracts = { { no: ''} }
                initContractFormAction = { initContractFormActionMock }
                createContractAction = { createContractActionMock }
                clearErrorMessageAction = { clearErrorMessageActionMock }
                handleSubmit = { handleSubmitMock }
            />
        )

        wrapper.setState({ isLoading: false})
        wrapper.instance().componentDidMount();

        const submit = wrapper.find('[data-test="submit-button"]')
        submit.simulate('click', { preventDefault() {} });

    })

    it('render without error', () => {
        const component = wrapper.find('[data-test="component-contract-form"]')
        expect(component.length).toBe(1)
    })

    it('submit was called `handleSubmit`', () => {

        const handleSubmitMockCallCount = handleSubmitMock.mock.calls.length;
        expect(handleSubmitMockCallCount).toBe(2)
    })
})
/*
describe('Edit mode', ()=>{
    let wrapper;

    const contracts = {
        data: {
            no: '100',
            title: 'test',
            description: 'test desc',
        }
    }
    let updateContractActionMock;
    let updateContractSubInvestorFormActionMock;
    let initContractFormActionMock;
    let getContractActionMock;
    let deleteContractActionMock;
    let clearErrorMessageActionMock;
    let handleSubmitMock;

    beforeEach(() => {

        updateContractActionMock = jest.fn();
        updateContractSubInvestorFormActionMock = jest.fn();
        initContractFormActionMock = jest.fn();
        getContractActionMock = jest.fn();
        deleteContractActionMock = jest.fn();
        clearErrorMessageActionMock = jest.fn();
        handleSubmitMock = jest.fn();

        wrapper = shallow(
            <ContractForm mode="edit" id="" 
                contracts = { contracts }
                initContractFormAction = { initContractFormActionMock }
                updateContractAction = { updateContractActionMock }
                updateContractSubInvestorFormAction = { updateContractSubInvestorFormActionMock }
                getContractAction = { getContractActionMock }
                deleteContractAction = { deleteContractActionMock }
                clearErrorMessageAction = { clearErrorMessageActionMock }
                handleSubmit = { handleSubmitMock }
            />
        )

        wrapper.setState({ isLoading: false})
        wrapper.instance().componentDidMount();

    })

    it('delete button is render', () => {        
        const button = wrapper.find('[data-test="button-delete"]')
        expect(button.length).toBe(1)
    })

})*/
