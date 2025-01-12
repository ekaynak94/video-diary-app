import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import VideoPlayer from "@/components/VideoPlayer";
import { useVideoPlayer } from "expo-video";

export default function DetailsScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const player = useVideoPlayer(params.uri, (player) => {
    player.play();
    player.loop = true;
  });

  return (
    <View className="flex-1 py-safe dark:bg-grey">
      <View className="relative w-full flex-1">
        <VideoPlayer player={player} />
        <TouchableOpacity
          className="absolute top-4 left-4 bg-black/30 p-2 rounded-full"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View className="my-12 p-4 gap-4">
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
