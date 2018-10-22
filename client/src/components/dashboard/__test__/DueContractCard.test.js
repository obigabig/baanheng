import React from 'react';
import moment from 'moment';
import { shallow, mount } from 'enzyme';

import { DueContractCard } from '../DueContractCard';

describe('Render', () => {

  let wrapper;
  const index = 0;
  const contract = {
    no: 0,
    title: 'testdata',
    actions: [
      { 
        type: 'นัดต่อสัญญา',
        dueDate: moment()        
      }
    ]
  }

  beforeEach(() => {
    // create a mock function
  const markAsCompleteMock = jest.fn();

    // set up component, with a props
    wrapper = shallow(
        <DueContractCard index={index} contract={contract} markAsComplete = {markAsCompleteMock} />
    );
    console.log(wrapper.debug())
  });

  afterEach(() => {});

  it('Render', () => {

  });
});
