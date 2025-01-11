import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Modal() {
  const params = useLocalSearchParams();

  useEffect(() => {
    console.log("Navigated to modal with videoUri:", params.videoUri);
  }, [params]);

  return (
    <View className="flex-1 py-safe dark:bg-grey">
      <Text className="text-white">Modal Page</Text>
      <Text className="text-white">Video URI: {params.videoUri}</Text>
    </View>
  );
}
