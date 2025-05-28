import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Category } from '../data/types';

interface Props {
  category: Category;
  onPress: (category: Category) => void;
}

const CategoryButton = ({ category, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => onPress(category)}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={category.icon as any} size={22} color="#3B82F6" />
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 70,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 12,
    color: '#4B5563',
    textAlign: 'center',
  },
});

export default CategoryButton;
