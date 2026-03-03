import { MantineProvider } from '@mantine/core';
import { CartProvider } from './context/CartContext';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';

function App() {
  return (
    <MantineProvider>
      <CartProvider>
        <Header />
        <ProductList />
      </CartProvider>
    </MantineProvider>
  );
}

export default App;