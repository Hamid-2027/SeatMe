import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  TouchableOpacity 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Deal } from '../data/types';

interface Props {
  deal: Deal;
  onPress: (deal: Deal) => void;
}

const DealCard = ({ deal, onPress }: Props) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={0.9}
      onPress={() => onPress(deal)}
    >
      <ImageBackground 
        source={deal.image} 
        style={styles.background}
        imageStyle={styles.image}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        >
          <View style={styles.discountTag}>
            <Text style={styles.discountText}>{deal.discount} OFF</Text>
          </View>
          
          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={2}>{deal.title}</Text>
            <Text style={styles.description} numberOfLines={2}>{deal.description}</Text>
            
            <View style={styles.footer}>
              <View style={styles.codeContainer}>
                <Text style={styles.codeLabel}>Use Code:</Text>
                <Text style={styles.code}>{deal.code}</Text>
              </View>
              
              <Text style={styles.expiry}>Expires {formatDate(deal.expiry)}</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  image: {
    borderRadius: 12,
  },
  gradient: {
    width: '100%',
    height: '100%',
    padding: 12,
  },
  discountTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF4757',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  codeContainer: {},
  codeLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
  },
  code: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  expiry: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
  },
});

export default DealCard;
