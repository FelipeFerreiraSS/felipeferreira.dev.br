import { Link } from 'expo-router'
import { View, Text, StyleSheet } from 'react-native'
import { DrawerToggleButton } from "@react-navigation/drawer"

export default function Index() {
  return (
    <View style={styles.container}>
      <DrawerToggleButton />
      <Text style={styles.text}>Home</Text>
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