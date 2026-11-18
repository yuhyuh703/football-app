import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#404040", // Color for active tab icons
        tabBarInactiveTintColor: "#757575", // Color for inactive tab icons
        tabBarLabelStyle: {
          fontSize: 12, // Font size for tab labels
          fontWeight: "bold", // Font weight for tab labels
        },
        tabBarStyle: {
          backgroundColor: "#f8f9fa", // Background color of the tab bar
        },
      }}
    >
      <Tabs.Screen
        name="matches"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="football" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="transfers"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="swap-horizontal-outline" size={size} color={color as string} />
          ),
        }}
      />
    </Tabs>
  );
}