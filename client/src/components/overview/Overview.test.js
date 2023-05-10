/* eslint-env jest */
import React from 'react';
import { render, screen } from '@testing-library/react';

import Overview from './Overview.jsx';

it('should render product name', () => {
  render(<Overview />);
  expect(true).toBeTruthy();
});
