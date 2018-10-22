import React from 'react';
import { shallow, mount } from 'enzyme';

import { DueContractCard } from '../DueContractCard';
import mockDueContractList from '../../../mocks/dueContractList';

describe('Render', () => {
  // create a mock function
  const getDueContractListsActionMock = jest.fn();
  let wrapper;

  beforeEach(() => {
    // set up Input, with guessWordMock as a prop
    /*wrapper = shallow(
        <DueContractCard getDueContractListsAction={getDueContractListsActionMock} />
    );*/
  });

  afterEach(() => {});

  it('display DueContractCard', () => {});
});
