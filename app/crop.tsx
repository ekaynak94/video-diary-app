import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomButton from "../components/CustomButton";

export default function CropModal() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const player = useVideoPlayer(params.videoUri);

  const handlePlayPause = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleFullscreen = () => {};

  return (
    <View className="flex-1 pb-safe dark:bg-grey">
      <View className="relative w-full flex-1">
        <VideoView
          player={player}
          style={{ height: "100%", width: "auto", maxWidth: "100%" }}
          nativeControls={false}
        />
        <TouchableOpacity
          className="absolute top-4 left-4 bg-black/30 p-2 rounded-full"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View className="absolute bottom-4 left-4 right-4 flex-row justify-between">
          <TouchableOpacity
            className="p-4 bg-black/30 rounded-full"
            onPress={handlePlayPause}
          >
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="p-4 bg-black/30 rounded-full"
            onPress={handleFullscreen}
          >
            <Ionicons name="expand" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="p-4">
        <CustomButton onPress={() => {}} title="Crop" />
      </View>
    </View>
  );
}
