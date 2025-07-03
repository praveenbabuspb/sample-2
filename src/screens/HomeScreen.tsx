import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

import {DataService} from '../services/DataService';
import {useSuperSaver} from '../store/SuperSaverContext';
import {NavItem, Shop, Product} from '../types';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import ShopCard from '../components/ShopCard';
import ProductCard from '../components/ProductCard';
import SuperSaverToggle from '../components/SuperSaverToggle';

const {width} = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const {isSuperSaver} = useSuperSaver();
  const [categories, setCategories] = useState<NavItem[]>([]);
  const [featuredShops, setFeaturedShops] = useState<Shop[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (isSuperSaver) {
          const cats = await DataService.getSuperSaverCategories();
          setCategories(cats);
          setFeaturedShops([]);
          setFeaturedProducts([]);
        } else {
          const cats = await DataService.getCategories();
          setCategories(cats);

          // Get featured shops
          const allShops = await DataService.getAllShops();
          setFeaturedShops(allShops.slice(0, 3));

          // Get featured products from FreshMart
          const products = await DataService.getProducts('FreshMart Supermarket', 'Grocery');
          setFeaturedProducts(products.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isSuperSaver]);

  const renderCategoryItem = ({item}: {item: NavItem}) => (
    <CategoryCard
      category={item}
      onPress={() => navigation.navigate('Shops', {category: item.name})}
    />
  );

  const renderShopItem = ({item}: {item: Shop}) => (
    <ShopCard
      shop={item}
      onPress={() => navigation.navigate('ShopDetail', {shop: item})}
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
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isSuperSaver) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <ScrollView style={styles.content}>
          <SuperSaverToggle />
          <View style={styles.superSaverContainer}>
            <Text style={styles.superSaverTitle}>Super Saver Mode!</Text>
            <Text style={styles.superSaverSubtitle}>
              Here is some completely different content.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <SuperSaverToggle />
        
        {/* Banner Section */}
        <View style={styles.bannerContainer}>
          <View style={styles.banner}>
            <Text style={styles.bannerText}>Special Offers!</Text>
            <Text style={styles.bannerSubtext}>Get the best deals today</Text>
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.name}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Featured Shops Section */}
        {featuredShops.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Shops</Text>
            <FlatList
              data={featuredShops}
              renderItem={renderShopItem}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </View>
        )}

        {/* Featured Products Section */}
        {featuredProducts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <FlatList
              data={featuredProducts}
              renderItem={renderProductItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </View>
        )}
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  superSaverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  superSaverTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  superSaverSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  bannerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  banner: {
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  bannerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bannerSubtext: {
    color: 'white',
    fontSize: 16,
    opacity: 0.8,
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingHorizontal: 16,
    color: '#000',
  },
  horizontalList: {
    paddingHorizontal: 16,
  },
});

export default HomeScreen;