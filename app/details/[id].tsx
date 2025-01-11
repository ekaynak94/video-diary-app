import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const defaultThumbnail = require("@/assets/images/icon.png");

export default function DetailsScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  return (
    <View className="flex-1 py-safe dark:bg-grey">
      <View className="relative">
        <Image
          source={
            params.thumbnail ? { uri: params.thumbnail } : defaultThumbnail
          }
          className="w-full h-64 aspect-video"
        />
        <TouchableOpacity
          className="absolute top-4 left-4 bg-black/30  p-2 rounded-full"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View className="p-4">
        <Text className="text-2xl font-bold dark:text-white">
          {params.title}
        </Text>
        <Text className="mt-2 text-lg dark:text-white">
          {params.description}
        </Text>
      </View>
    </View>
  );
}
