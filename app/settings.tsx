import { Stack } from "expo-router";
import { Text, View } from "tamagui";

export default function SettingsScreen() {
  return (
    <View flex={1} p="$4">
      <Stack.Screen
        options={{
          title: "Settings",
          headerBackTitle: "Back",
        }}
      />
      <Text>Settings</Text>
    </View>
  );
}
