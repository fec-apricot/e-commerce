/* eslint-env jest */
import React from 'react';
import axios from 'axios';
import {
waitFor,
  render,
  screen,
  fireEvent,
  within,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Overview from './Overview.jsx';
import { OverviewContextProvider } from './OverviewContext.jsx';
import { GlobalContext } from '../GlobalContext.jsx';
import { mockProduct, mockStyles } from './mockProductData';

jest.mock('axios');
axios.get.mockImplementation((url) => {
  if (url === '/products/40450') {
    return Promise.resolve({
      data: mockProduct,
    });
  }
  if (url === '/products/40450/styles') {
    return Promise.resolve({
      data: mockStyles,
    });
  }
  return Promise.reject(new Error('Mock axios GET failed'));
});

axios.post.mockImplementation((url) => {
  if (url === '/cart') {
    return Promise.resolve();
  }
  return Promise.reject(new Error('Mock axios POST failed'));
});

describe('Overview component', () => {
  beforeEach(async () => {
    const mockProductID = 40450;
    const mockSetProductID = jest.fn();

    render(
      <GlobalContext.Provider value={
        { productID: mockProductID, setProductID: mockSetProductID, product: mockProduct }
      }
      >
        <OverviewContextProvider>
          <Overview />
        </OverviewContextProvider>
      </GlobalContext.Provider>,
    );
  });

  afterEach(cleanup);

  it('should render product general information correctly', () => {
    expect(screen.getByText('Slacks')).toBeInTheDocument();
    expect(screen.getByText('Alivia Slacks')).toBeInTheDocument();
    expect(screen.getByText('873.00')).toBeInTheDocument();
    expect(screen.getByText('Voluptas maiores et dolores harum.')).toBeInTheDocument();
    expect(screen.getByText('Voluptas nam voluptas non qui. Dolore mollitia qui rerum illo. Tempore sed et assumenda fuga voluptates officiis explicabo inventore. Aut voluptatibus doloribus.')).toBeInTheDocument();
    expect(screen.getByText('Cut: \'Straight\'')).toBeInTheDocument();
  });

  it('should have one selected style at all times', () => {
    expect(screen.queryByText('SELECTED STYLE')).toBeNull();
  });

  it('should render name of current style above the list of styles', async () => {
    const styleTitleElement = await screen.findByText('Purple');
    expect(styleTitleElement).toBeInTheDocument();
  });

  it('should show a list of styles', async () => {
    const styleListElement = await screen.findAllByTestId(/style-item-/i);
    expect(styleListElement).toHaveLength(2);
  });

  it('should show a checkmark on selected style', async () => {
    const selectedStyleElement = await screen.findByTestId('style-item-0');
    expect(within(selectedStyleElement).getByTestId('checkmark')).toBeInTheDocument();
  });

  it('should not show a checkmark on unselected style', async () => {
    const unselectedStyleElement = await screen.findByTestId('style-item-1');
    expect(within(unselectedStyleElement).queryByTestId('checkmark')).toBeNull();
  });

  it('should be able to select a different style', async () => {
    const anotherStyleElement = await screen.findByTestId('style-item-1');
    fireEvent.click(anotherStyleElement);
    expect(screen.getByText('Pink')).toBeInTheDocument();
  });

  it('should be able to expand the dropdown button of size selector on click', async () => {
    expect(screen.queryByTestId('size-dropdown-list')).not.toBeInTheDocument();
    fireEvent.click(await screen.findByTestId('size-dropdown-btn'));
    expect(screen.getByTestId('size-dropdown-list')).toBeInTheDocument();
  });

  it('should collapse the size dropdown list on mouse leave', async () => {
    fireEvent.click(await screen.findByTestId('size-dropdown-btn'));
    expect(screen.getByTestId('size-dropdown-list')).toBeInTheDocument();
    fireEvent.mouseLeave(screen.getByTestId('size-dropdown-list'));
    expect(screen.queryByTestId('size-dropdown-list')).not.toBeInTheDocument();
  });

  it('should only be able to click the dropdown button of quantity selector when size is selected', async () => {
    expect(screen.getByTestId('qty-dropdown-btn')).toBeDisabled();

    fireEvent.click(await screen.findByTestId('size-dropdown-btn'));
    fireEvent.click(screen.getByTestId('size-item-1397050'));
    expect(screen.getByTestId('qty-dropdown-btn')).not.toBeDisabled();
  });

  it('should render the dropdown list of quantity selector correctly', async () => {
    fireEvent.click(await screen.findByTestId('size-dropdown-btn'));
    fireEvent.click(screen.getByTestId('size-item-1397049'));
    fireEvent.click(screen.getByTestId('qty-dropdown-btn'));
    expect(screen.getAllByTestId(/qty-item-/i)).toHaveLength(10);
    fireEvent.click(screen.getByTestId('size-dropdown-btn'));
    fireEvent.click(screen.getByTestId('size-item-1397050'));
    expect(screen.getAllByTestId(/qty-item-/i)).toHaveLength(15);
  });

  it('should collapse the quantity dropdown list on mouse leave', async () => {
    fireEvent.click(await screen.findByTestId('size-dropdown-btn'));
    fireEvent.click(screen.getByTestId('size-item-1397049'));
    fireEvent.click(screen.getByTestId('qty-dropdown-btn'));
    expect(screen.getByTestId('qty-dropdown-list')).toBeInTheDocument();
    fireEvent.mouseLeave(screen.getByTestId('qty-dropdown-list'));
    expect(screen.queryByTestId('qty-dropdown-list')).not.toBeInTheDocument();
  });

  it('should be able to select quantity', async () => {
    fireEvent.click(await screen.findByTestId('size-dropdown-btn'));
    fireEvent.click(screen.getByTestId('size-item-1397049'));
    fireEvent.click(screen.getByTestId('qty-dropdown-btn'));
    fireEvent.click(screen.getByTestId('qty-item-3'));
    expect(screen.queryByTestId('qty-dropdown-list')).not.toBeInTheDocument();
  });

  it('should not be able to add to cart without selected size', () => {
    fireEvent.click(screen.getByTestId('add-to-cart-btn'));
    expect(screen.getByText('Please select size')).toBeInTheDocument();
  });

  it('should be able to add to cart with selected size', async () => {
    fireEvent.click(await screen.findByTestId('size-dropdown-btn'));
    fireEvent.click(screen.getByTestId('size-item-1397049'));
    fireEvent.click(screen.getByTestId('qty-dropdown-btn'));
    fireEvent.click(screen.getByTestId('qty-item-3'));
    fireEvent.click(screen.getByTestId('add-to-cart-btn'));
    expect(await screen.findByText('Added to cart!')).toBeInTheDocument();
  });
});
