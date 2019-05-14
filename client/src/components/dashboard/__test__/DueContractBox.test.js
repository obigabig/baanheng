import React from 'react';
import { shallow, mount } from 'enzyme';
//import moxios from 'moxios';
import Root from '../../../Root';
import { BrowserRouter, withRouter } from 'react-router-dom';
//import * as actions from '../actions';

import DueContractBox from '../DueContractBox';
import DueContractCard from '../DueContractCard';
import mockDueContractList from '../../../mocks/dueContractList';

describe('Render DueContractBox', () => {
  let wrapped;
  beforeEach(() => {
    wrapped = shallow(
      <DueContractBox
        contractList={mockDueContractList}
        label="เลยกำหนด"
        icon="warning"
        iconClassname=" red-text accent-4"
      />
    );
  });

  afterEach(() => {});

  it('display DueContractCard', () => {
    expect(wrapped.find(DueContractCard).length).toEqual(
      mockDueContractList.length
    );
  });
});
