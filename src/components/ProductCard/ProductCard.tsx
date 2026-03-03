import React, { useState } from 'react';
import { Card, Image, Text, Group, Button, ActionIcon } from '@mantine/core';
import { IconPlus, IconMinus, IconShoppingCart } from '@tabler/icons-react';
import type { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import classes from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1);
  };

  // Helper to split product name and unit (if present)
  // Assumes product.name ends with a unit like "kg", "g", "lb", etc.
  // You can adjust this logic based on your actual data structure
  const renderProductName = () => {
    const nameParts = product.name.trim().split(/(\d+)\s*(kg|g|lb|oz)/i);
    if (nameParts.length > 1) {
      return (
        <>
          <span>{nameParts[0]}</span>
          <Text component="span" c="dimmed" fw={400}>
            {nameParts[1]}{nameParts[2] && ` ${nameParts[2]}`}
          </Text>
        </>
      );
    }
    return product.name;
  };

  return (
    <Card withBorder shadow="sm" radius="md" className={classes.card}>
      <Card.Section>
        <Image src={product.image} height={480} alt={product.name} />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{renderProductName()}</Text>
        <Group gap="xs">
          <ActionIcon
            size="lg"
            color="#DEE2E6"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <IconMinus color="#212529" size={16} />
          </ActionIcon>
          <Text size="sm" w={20} ta="center">
            {quantity}
          </Text>
          <ActionIcon
            size="lg"
            color="#DEE2E6"
            onClick={() => setQuantity(quantity + 1)}
          >
            <IconPlus color="#212529" size={16} />
          </ActionIcon>
        </Group>
      </Group>


     <Group>
        <Text fw={700}>${product.price}</Text>
        <Button
          color="#E7FAEB"
          style={{ color: '#3B944E', flex: 1 }}
          onClick={handleAddToCart}
          rightSection={<IconShoppingCart size={20} />}
        >
          Add to cart
        </Button>
      </Group>
    </Card>
  );
};

export default ProductCard;