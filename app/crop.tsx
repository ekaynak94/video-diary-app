import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { useVideoPlayer } from "expo-video";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import MetadataForm from "@/components/MetadataForm";
import VideoPlayer from "@/components/VideoPlayer";
import VideoScrubber from "@/components/VideoScrubber";

export default function CropModal() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [isCropping, setIsCropping] = useState(true);
  const player = useVideoPlayer(params.videoUri, (player) => {
    player.play();
  });

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
          <VideoPlayer player={player} />
          <TouchableOpacity
            className="absolute top-4 left-4 bg-black/30 p-2 rounded-full"
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          {isCropping ? (
            <VideoScrubber className="p-4 h-72" onCrop={handleCrop} />
          ) : (
            <MetadataForm className="p-4 h-72" onSubmit={handleSubmit} />
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
