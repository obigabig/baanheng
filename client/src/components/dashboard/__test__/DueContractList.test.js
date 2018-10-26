import React from 'react';
import { shallow, mount } from 'enzyme';

import { DueContractList } from '../DueContractList';
import mockDueContractList from '../../../mocks/dueContractList';

// create a mock function
const getDueContractListsActionMock = jest.fn();
let wrapper;

beforeEach(() => {
  // set up Input, with guessWordMock as a prop
  wrapper = shallow(
    <DueContractList
      dueContractList={mockDueContractList}
      getDueContractListsAction={getDueContractListsActionMock}
    />
  );
  
  wrapper.setState({ isLoading: false})
  
  // run lifecycle method
  wrapper.instance().componentDidMount();

});

afterEach(() => {});

describe('Render', () => {
  
  test('render without error', () => {
    const componet = wrapper.find('[data-test="component-due-contract-lists"]')
    expect(componet.length).toBe(1)
  });

  test('render component-due-contract-box', () => {
    const componet = wrapper.find('[data-test="component-due-contract-box"')
    expect(componet.length).toBe(2)
  });
  //
});

test('`getDueContractListsAction` was called', () => {
  // check to see if mock ran
  const getDueContractListsActionCallCount =
    getDueContractListsActionMock.mock.calls.length;

  expect(getDueContractListsActionCallCount).toBe(1);
});


