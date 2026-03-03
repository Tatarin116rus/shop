import React from 'react';
import { MantineProvider } from '@mantine/core';
import { CartProvider } from '../context/CartContext';

export const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </MantineProvider>
  );
};