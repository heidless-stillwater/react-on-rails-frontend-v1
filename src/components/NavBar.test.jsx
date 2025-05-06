import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder
// @ts-expect-error
global.TextDecoder = TextDecoder

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';

describe('NavBar component', () => {
  const renderNavBar = () => {
    render(<NavBar />, { wrapper: MemoryRouter });
  }
  test('renders both links', () => {
    // render the NavBar component
    renderNavBar();
    expect(screen.getByText(/Posts List/i)).toBeInTheDocument();
    expect(screen.getByText(/Create New Post/i)).toBeInTheDocument();

    // export the links to be there

  });
});

