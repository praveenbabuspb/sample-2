import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Product} from '../types';
import {useCart} from '../store/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({product}: ProductCardProps) => {
  const {state, addItem, updateQuantity} = useCart();
  const {carts} = state;
  
  const itemInCart = carts[product.shopName]?.items.find(item => item.id === product.id);
  const quantity = itemInCart ? itemInCart.quantity : 0;

  const originalPrice = product.price * 1.25;
  const discount = Math.round((1 - product.price / originalPrice) * 100);

  const handleAddItem = () => {
    addItem(product);
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    updateQuantity(product.id, product.shopName, newQuantity);
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{uri: product.image}} style={styles.image} />
        {!product.inStock && (
          <View style={styles.outOfStockOverlay}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <View style={styles.deliveryBadge}>
          <Icon name="access-time" size={10} color="#000" />
          <Text style={styles.deliveryText}>15 mins</Text>
        </View>
        
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.unit}>{product.unit}</Text>
        
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <Text style={styles.originalPrice}>${originalPrice.toFixed(2)}</Text>
            {discount > 0 && (
              <Text style={styles.discount}>{discount}% OFF</Text>
            )}
          </View>
          
          <View style={styles.addToCartContainer}>
            {quantity > 0 ? (
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleUpdateQuantity(quantity - 1)}>
                  <Icon
                    name={quantity === 1 ? 'delete' : 'remove'}
                    size={16}
                    color="#dc3545"
                  />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleUpdateQuantity(quantity + 1)}
                  disabled={!product.inStock}>
                  <Icon name="add" size={16} color="#000" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.addButton, !product.inStock && styles.disabledButton]}
                onPress={handleAddItem}
                disabled={!product.inStock}>
                <Text style={styles.addButtonText}>ADD</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: 12,
    width: 150,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  content: {
    padding: 8,
  },
  deliveryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  deliveryText: {
    fontSize: 8,
    fontWeight: 'bold',
    marginLeft: 2,
    color: '#000',
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
    height: 32,
  },
  unit: {
    fontSize: 10,
    color: '#666',
    marginBottom: 8,
  },
  footer: {
    gap: 8,
  },
  priceContainer: {
    alignItems: 'flex-start',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  originalPrice: {
    fontSize: 10,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  discount: {
    fontSize: 10,
    color: '#28a745',
    fontWeight: '600',
  },
  addToCartContainer: {
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 50,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  addButtonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    overflow: 'hidden',
  },
  quantityButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: '#f8f9fa',
  },
  quantityText: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: 'white',
  },
});

export default ProductCard;