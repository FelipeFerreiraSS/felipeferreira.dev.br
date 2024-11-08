import { Link } from 'expo-router'
import { View, Text, StyleSheet } from 'react-native'

export default function Posts() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Posts</Text>
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
