import { Link, router } from 'expo-router'
import { View, Text, StyleSheet, Button } from 'react-native'

export default function Products() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Produtos</Text>
      <Button 
        title='Produtos' 
        onPress={() => router.navigate("/product/20")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});