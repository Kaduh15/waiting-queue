import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import '@testing-library/jest-dom';
import Home from './page';

describe('Home', () => {
  it('should hello world render in screen', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /Hello World/i
    });

    expect(heading).toBeInTheDocument();
  });
});
