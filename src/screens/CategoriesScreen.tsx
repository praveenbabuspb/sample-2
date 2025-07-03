import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import {DataService} from '../services/DataService';
import {useSuperSaver} from '../store/SuperSaverContext';
import {NavItem} from '../types';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import SuperSaverToggle from '../components/SuperSaverToggle';

const CategoriesScreen = () => {
  const navigation = useNavigation();
  const {isSuperSaver} = useSuperSaver();
  const [categories, setCategories] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const cats = isSuperSaver
          ? await DataService.getSuperSaverCategories()
          : await DataService.getCategories();
        setCategories(cats);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [isSuperSaver]);

  const renderCategoryItem = ({item}: {item: NavItem}) => (
    <View style={styles.categoryItem}>
      <CategoryCard
        category={item}
        onPress={() => navigation.navigate('Shops', {category: item.name})}
      />
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.loadingContainer}>
          <Text>Loading categories...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <SuperSaverToggle />
        <Text style={styles.title}>
          {isSuperSaver ? 'Super Saver Categories' : 'All Categories'}
        </Text>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.name}
          numColumns={2}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        />
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
    marginBottom: 20,
    color: '#000',
  },
  grid: {
    paddingBottom: 20,
  },
  categoryItem: {
    flex: 1,
    margin: 8,
  },
});

export default CategoriesScreen;