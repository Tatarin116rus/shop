import React, { useEffect, useState } from 'react';
import { SimpleGrid, Loader, Center } from '@mantine/core';
import ProductCard from '../ProductCard/ProductCard';
import type { Product } from '../../types/product';

const API_URL = 'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('ошибка fetch', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Center style={{ minHeight: '400px' }}>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg" p="md">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </SimpleGrid>
  );
};

export default ProductList;