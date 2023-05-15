/* eslint-env jest */
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { act } from 'react-test-renderer';
import '@testing-library/jest-dom';
import StyleSelector from './StyleSelector.jsx';
import { OverviewContextProvider } from './OverviewContext.jsx';
import { GlobalContext } from '../GlobalContext.jsx';

describe('StyleSelector', () => {
  beforeEach(() => {
  });

  afterEach(cleanup);

  describe('Product overview and description', () => {
    beforeEach(async () => {
      const mockProductID = 40450;
      await act(() => {
        render(
          <GlobalContext.Provider value={{ productID: mockProductID }}>
            <OverviewContextProvider>
              <Overview />
            </OverviewContextProvider>
          </GlobalContext.Provider>,
        );
      });
    });
    it('should render name of current style above the list of styles', () => {
      expect(screen.getByText('Slacks')).toBeInTheDocument();
    });

    it('should have one selected style at all times', () => {});

    it('should show a list of styles', () => {
      expect(screen.getByText('Alivia Slacks')).toBeInTheDocument();
    });

    it('should be able to select a style', () => {
      expect(screen.getByText('873.00')).toBeInTheDocument();
    });

    it('should render product slogan', () => {
      expect(screen.getByText('Voluptas maiores et dolores harum.')).toBeInTheDocument();
    });

    it('should render product description', () => {
      expect(screen.getByText('Voluptas nam voluptas non qui. Dolore mollitia qui rerum illo. Tempore sed et assumenda fuga voluptates officiis explicabo inventore. Aut voluptatibus doloribus.')).toBeInTheDocument();
    });

    it('should render product features', () => {
      expect(screen.getByText('Cut: \'Striaght\'')).toBeInTheDocument();
    });
  });
});
