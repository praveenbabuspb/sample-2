import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useCart} from '../store/CartContext';
import {ShopCart} from '../types';
import Header from '../components/Header';
import CartItemCard from '../components/CartItemCard';

const CartScreen = () => {
  const navigation = useNavigation();
  const {state, clearAllCarts} = useCart();
  const {carts} = state;

  const cartArray = Object.values(carts);
  const grandTotalItems = cartArray.reduce((sum, cart) => sum + cart.totalItems, 0);
  const grandTotalPrice = cartArray.reduce((sum, cart) => sum + cart.totalPrice, 0);

  const handleClearAllCarts = () => {
    Alert.alert(
      'Clear All Carts',
      'Are you sure you want to clear all items from all carts?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Clear All', style: 'destructive', onPress: clearAllCarts},
      ],
    );
  };

  const handleShopCartPress = (shopCart: ShopCart) => {
    navigation.navigate('Checkout', {shopName: shopCart.shopName});
  };

  const handleGlobalCheckout = () => {
    navigation.navigate('Checkout', {global: true});
  };

  const renderShopCart = ({item}: {item: ShopCart}) => (
    <TouchableOpacity
      style={styles.shopCartCard}
      onPress={() => handleShopCartPress(item)}>
      <View style={styles.shopCartHeader}>
        <Text style={styles.shopCartName}>{item.shopName}</Text>
        <Icon name="chevron-right" size={24} color="#666" />
      </View>
      <Text style={styles.shopCartMeta}>
        {item.totalItems} {item.totalItems === 1 ? 'item' : 'items'} • $
        {item.totalPrice.toFixed(2)}
      </Text>
      
      <FlatList
        data={item.items.slice(0, 3)}
        renderItem={({item: cartItem}) => (
          <CartItemCard item={cartItem} compact />
        )}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />
      
      {item.items.length > 3 && (
        <Text style={styles.moreItemsText}>
          +{item.items.length - 3} more items
        </Text>
      )}
    </TouchableOpacity>
  );

  if (cartArray.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.emptyContainer}>
          <Icon name="shopping-cart" size={80} color="#ccc" />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Add some products to get started!
          </Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>My Carts</Text>
          <Text style={styles.subtitle}>
            {grandTotalItems > 0
              ? `${grandTotalItems} ${grandTotalItems === 1 ? 'item' : 'items'} in ${cartArray.length} ${cartArray.length === 1 ? 'shop' : 'shops'}`
              : 'Your cart is empty'}
          </Text>
        </View>

        <FlatList
          data={cartArray}
          renderItem={renderShopCart}
          keyExtractor={item => item.shopName}
          contentContainerStyle={styles.cartList}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.footer}>
          {cartArray.length > 1 && (
            <TouchableOpacity
              style={styles.globalCheckoutButton}
              onPress={handleGlobalCheckout}>
              <Text style={styles.globalCheckoutText}>
                Global Checkout (${grandTotalPrice.toFixed(2)})
              </Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearAllCarts}>
            <Text style={styles.clearButtonText}>Clear All Carts</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  shopButton: {
    backgroundColor: '#000',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  shopButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  cartList: {
    padding: 16,
  },
  shopCartCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  shopCartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  shopCartName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  shopCartMeta: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  moreItemsText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 8,
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  globalCheckoutButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  globalCheckoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CartScreen;