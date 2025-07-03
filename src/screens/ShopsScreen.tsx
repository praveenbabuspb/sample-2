import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';

import {DataService} from '../services/DataService';
import {Shop} from '../types';
import Header from '../components/Header';
import ShopCard from '../components/ShopCard';

const ShopsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {category} = route.params as {category: string};
  
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      try {
        const fetchedShops = await DataService.getShopsByCategory(category);
        setShops(fetchedShops);
      } catch (error) {
        console.error('Error fetching shops:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, [category]);

  const renderShopItem = ({item}: {item: Shop}) => (
    <View style={styles.shopItem}>
      <ShopCard
        shop={item}
        onPress={() => navigation.navigate('ShopDetail', {shop: item})}
      />
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.loadingContainer}>
          <Text>Loading shops...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>{category} Shops</Text>
        <Text style={styles.subtitle}>Select a shop to start your order</Text>
        
        {shops.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No shops found in this category</Text>
          </View>
        ) : (
          <FlatList
            data={shops}
            renderItem={renderShopItem}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.grid}
            showsVerticalScrollIndicator={false}
          />
        )}
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
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  grid: {
    paddingBottom: 20,
  },
  shopItem: {
    flex: 1,
    margin: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default ShopsScreen;