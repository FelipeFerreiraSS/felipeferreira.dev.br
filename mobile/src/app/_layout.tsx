import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer"
import { MaterialIcons } from "@expo/vector-icons";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerActiveBackgroundColor: "black",
          drawerActiveTintColor: "white",
          headerShown: false
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
            drawerLabel: "Inicio",
          }}
        />

        <Drawer.Screen
          name="products"
          options={{
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="shopping-bag" size={size} color={color} />
            ),
            drawerLabel: "Produtos",
          }}
        />

        <Drawer.Screen
          name="product/[id]"
          options={{
            drawerItemStyle: {
              display: "none"
            }
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}