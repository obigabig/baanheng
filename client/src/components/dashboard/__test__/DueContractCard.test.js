import React from 'react';
import moment from 'moment';
import { shallow, mount } from 'enzyme';

import { DueContractCard } from '../DueContractCard';


describe('Render', () => {
  let wrapper;
  const index = 0;
  const contract = {
    no: 100,
    title: 'testdata',
    actions: [
      {
        type: "นัดต่อสัญญา"
        , description: ""
        , dueDate: moment().format('DD/MM/YYYY')
      }
    ],

  };

  beforeEach(() => {
    // create a mock function
    const markAsCompleteMock = jest.fn();

    // set up component, with a props
    wrapper = shallow(
      <DueContractCard
        index={index}
        contract={contract}
        markAsComplete={markAsCompleteMock}
      />
    );
    //console.log(wrapper.debug())
  });

  afterEach(() => {});

  it('render without error', () => {
    const component = wrapper.find(`[data-test="component-dueContarctCard"]`)
    expect(component.length).toBe(1);
  });

  it('render no', () => {
    const node = wrapper.find(`[data-test="contract-no"]`)
    expect(node.text()).toContain('100');
  });
  
  it('render title', () => {
    const node = wrapper.find(`[data-test="contract-title"]`)
    expect(node.text()).toContain('testdata');
  });

  it('render actions type', () => {
    const node = wrapper.find(`[data-test="contract-action-type"]`).text()
    expect(node).toContain('นัดต่อสัญญา');
    expect(node).toContain(moment().format('DD/MM/YYYY'));    
  });

  it('render upcoming day', () => {
    const node = wrapper.find(`[data-test="contract-upcoming-day"]`)
    expect(node.text()).toContain('0');
  });

  it('render upcoming day in [red]', () => {
    const node = wrapper.find(`[data-test="contract-upcoming-day"]`)
    expect(node.hasClass('red-text')).toBeTruthy();
  });

  it('render mark as complete', () => {
    const node = wrapper.find(`[data-test="contract-mark-as-complete"]`)
    expect(node.length).toBe(1);
  });

});
