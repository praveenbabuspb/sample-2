import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';

import {useCart} from '../store/CartContext';
import {CartItem} from '../types';
import Header from '../components/Header';
import CartItemCard from '../components/CartItemCard';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {shopName, global} = route.params as {shopName?: string; global?: boolean};
  
  const {state, clearCart, clearAllCarts} = useCart();
  const {carts} = state;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });

  let itemsToCheckout: CartItem[] = [];
  let checkoutTitle = 'Checkout';

  if (global) {
    itemsToCheckout = Object.values(carts).flatMap(cart => cart.items);
    checkoutTitle = 'Global Checkout';
  } else if (shopName && carts[shopName]) {
    itemsToCheckout = carts[shopName].items;
    checkoutTitle = `Checkout from ${shopName}`;
  }

  const subtotal = itemsToCheckout.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 0 ? 5.0 : 0;
  const total = subtotal + shippingFee;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const validateForm = () => {
    const {name, email, address, city, zip} = formData;
    
    if (!name.trim() || name.length < 2) {
      Alert.alert('Error', 'Name must be at least 2 characters.');
      return false;
    }
    
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return false;
    }
    
    if (!address.trim() || address.length < 10) {
      Alert.alert('Error', 'Address must be at least 10 characters.');
      return false;
    }
    
    if (!city.trim() || city.length < 2) {
      Alert.alert('Error', 'City must be at least 2 characters.');
      return false;
    }
    
    if (!zip.trim() || zip.length < 5 || !/^\d+$/.test(zip)) {
      Alert.alert('Error', 'ZIP code must be at least 5 digits.');
      return false;
    }
    
    return true;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) return;

    Alert.alert(
      'Order Placed!',
      'Your order has been successfully submitted.',
      [
        {
          text: 'OK',
          onPress: () => {
            if (global) {
              clearAllCarts();
            } else if (shopName) {
              clearCart(shopName);
            }
            navigation.navigate('Home');
          },
        },
      ],
    );
  };

  if (itemsToCheckout.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Looks like you haven't added anything to your cart yet.
          </Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.shopButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{checkoutTitle}</Text>

        {/* Shipping Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Information</Text>
          <Text style={styles.sectionSubtitle}>Enter your delivery details.</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={formData.name}
            onChangeText={value => handleInputChange('name', value)}
          />

          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={formData.email}
            onChangeText={value => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Street Address"
            value={formData.address}
            onChangeText={value => handleInputChange('address', value)}
          />

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.cityInput]}
              placeholder="City"
              value={formData.city}
              onChangeText={value => handleInputChange('city', value)}
            />
            <TextInput
              style={[styles.input, styles.zipInput]}
              placeholder="ZIP Code"
              value={formData.zip}
              onChangeText={value => handleInputChange('zip', value)}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          
          <FlatList
            data={itemsToCheckout}
            renderItem={({item}) => <CartItemCard item={item} />}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            style={styles.itemsList}
          />

          <View style={styles.totals}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Shipping</Text>
              <Text style={styles.totalValue}>${shippingFee.toFixed(2)}</Text>
            </View>
            <View style={[styles.totalRow, styles.grandTotalRow]}>
              <Text style={styles.grandTotalLabel}>Total</Text>
              <Text style={styles.grandTotalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </ScrollView>
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
    padding: 16,
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  cityInput: {
    flex: 2,
  },
  zipInput: {
    flex: 1,
  },
  itemsList: {
    maxHeight: 300,
    marginBottom: 16,
  },
  totals: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalValue: {
    fontSize: 14,
    color: '#000',
  },
  grandTotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
    marginTop: 8,
  },
  grandTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  grandTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  placeOrderButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  placeOrderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;