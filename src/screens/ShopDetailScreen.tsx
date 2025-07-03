import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {DataService} from '../services/DataService';
import {Shop, ShopCategory, Product} from '../types';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';

const ShopDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {shop} = route.params as {shop: Shop};
  
  const [shopCategories, setShopCategories] = useState<ShopCategory[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopData = async () => {
      setLoading(true);
      try {
        const categories = await DataService.getShopCategories(shop.name);
        setShopCategories(categories);
        
        if (categories.length > 0) {
          const products = await DataService.getProducts(shop.name, categories[0].name);
          setFeaturedProducts(products.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching shop data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, [shop.name]);

  const renderCategoryItem = ({item}: {item: ShopCategory}) => (
    <CategoryCard
      category={{name: item.name, icon: item.icon}}
      onPress={() => navigation.navigate('CategoryProducts', {
        shopName: shop.name,
        categoryName: item.name
      })}
    />
  );

  const renderProductItem = ({item}: {item: Product}) => (
    <ProductCard product={item} />
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.loadingContainer}>
          <Text>Loading shop details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.shopInfo}>
              <Text style={styles.shopEmoji}>{shop.image}</Text>
              <View style={styles.shopDetails}>
                <Text style={styles.shopName}>{shop.name}</Text>
                <Text style={styles.shopDescription}>{shop.description}</Text>
                <View style={styles.shopMeta}>
                  <View style={styles.rating}>
                    <Icon name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>{shop.rating}</Text>
                  </View>
                  <Text style={styles.deliveryTime}>{shop.deliveryTime}</Text>
                </View>
              </View>
            </View>

            {/* Banner */}
            <View style={styles.banner}>
              <Text style={styles.bannerText}>Special Offers Available!</Text>
            </View>

            {/* Categories */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Shop by Category</Text>
              <FlatList
                data={shopCategories}
                renderItem={renderCategoryItem}
                keyExtractor={item => item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              />
            </View>

            {/* Featured Products */}
            {featuredProducts.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Featured Products</Text>
              </View>
            )}
          </View>
        }
        data={featuredProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.productGrid}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
  },
  shopInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  shopEmoji: {
    fontSize: 48,
    marginRight: 16,
  },
  shopDetails: {
    flex: 1,
  },
  shopName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  shopDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  shopMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  deliveryTime: {
    fontSize: 14,
    color: '#666',
  },
  banner: {
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  bannerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  horizontalList: {
    paddingRight: 16,
  },
  productGrid: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});

export default ShopDetailScreen;