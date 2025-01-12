import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import MetadataForm from "@/components/MetadataForm";

export default function CropModal() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCropping, setIsCropping] = useState(true);
  const player = useVideoPlayer(params.videoUri, (player) => {
    player.play();
  });

  const handlePlayPause = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleCrop = () => {
    setIsCropping(false);
  };

  const handleSubmit = (name: string, description: string) => {
    // Handle submit action with name and description
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              className="absolute top-4 right-4 bg-black/30 p-2 rounded-full"
              onPress={handlePlayPause}
            >
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
          {!isCropping && (
            <MetadataForm className="p-4" onSubmit={handleSubmit} />
          )}
          {isCropping && (
            <CustomButton
              onPress={handleCrop}
              iconName={"cut"}
              className="m-4"
              title={"Crop"}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
