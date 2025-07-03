import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import ShopsScreen from './src/screens/ShopsScreen';
import ShopDetailScreen from './src/screens/ShopDetailScreen';
import CategoryProductsScreen from './src/screens/CategoryProductsScreen';
import CartScreen from './src/screens/CartScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import AboutScreen from './src/screens/AboutScreen';
import ContactScreen from './src/screens/ContactScreen';

// Components
import {CartProvider} from './src/store/CartContext';
import {SuperSaverProvider} from './src/store/SuperSaverContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = 'home';

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Categories') {
            iconName = 'category';
          } else if (route.name === 'Cart') {
            iconName = 'shopping-cart';
          } else if (route.name === 'About') {
            iconName = 'info';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <SuperSaverProvider>
          <CartProvider>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="MainTabs"
                  component={MainTabs}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Shops"
                  component={ShopsScreen}
                  options={{title: 'Shops'}}
                />
                <Stack.Screen
                  name="ShopDetail"
                  component={ShopDetailScreen}
                  options={{title: 'Shop Details'}}
                />
                <Stack.Screen
                  name="CategoryProducts"
                  component={CategoryProductsScreen}
                  options={{title: 'Products'}}
                />
                <Stack.Screen
                  name="Checkout"
                  component={CheckoutScreen}
                  options={{title: 'Checkout'}}
                />
                <Stack.Screen
                  name="Contact"
                  component={ContactScreen}
                  options={{title: 'Contact Us'}}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </CartProvider>
        </SuperSaverProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;