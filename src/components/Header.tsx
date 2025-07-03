import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useCart} from '../store/CartContext';

const Header = () => {
  const {state, toggleCart} = useCart();
  const {carts} = state;
  
  const cartArray = Object.values(carts);
  const grandTotalItems = cartArray.reduce((sum, cart) => sum + cart.totalItems, 0);
  const grandTotalPrice = cartArray.reduce((sum, cart) => sum + cart.totalPrice, 0);

  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <Icon name="shopping-cart" size={24} color="#000" />
        <Text style={styles.logo}>React Nav</Text>
      </View>
      
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.locationButton}>
          <Icon name="location-on" size={16} color="#000" />
          <View style={styles.locationText}>
            <Text style={styles.deliveryText}>Delivery in 13 Mins</Text>
            <Text style={styles.addressText}>Periamet, Chennai...</Text>
          </View>
          <Icon name="keyboard-arrow-down" size={16} color="#000" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={20} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#000',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    alignItems: 'flex-start',
  },
  deliveryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  addressText: {
    fontSize: 10,
    color: '#666',
    maxWidth: 100,
  },
  searchButton: {
    padding: 8,
  },
});

export default Header;