import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons/';
import { Stack, Tabs } from 'expo-router'

export default function Layout() {
  return (
    <>
      {/* <Stack>
        <Stack.Screen name='index' options={{ title: "Home" }}/>
      </Stack> */}
      <Tabs 
        screenOptions={{
          tabBarLabelPosition: 'beside-icon',
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          headerShown: false
        }}
      >
        <Tabs.Screen 
          name='index' 
          options={{ 
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name='home' size={size} color={color}/>
            ),
            tabBarLabel: 'Home'
          }}
        />
        <Tabs.Screen 
          name='posts' 
          options={{ 
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons name='notebook' size={size} color={color} />
            ),
            tabBarLabel: 'Posts'
          }}
        />
      </Tabs>
    </>
  ) 
}