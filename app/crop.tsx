import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useVideoPlayer } from "expo-video";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { randomUUID } from "expo-crypto";
import { getThumbnailAsync } from "expo-video-thumbnails";
import MetadataForm from "@/components/MetadataForm";
import VideoPlayer from "@/components/VideoPlayer";
import VideoScrubber from "@/components/VideoScrubber";
import useProjectStore from "@/store/useProjectStore";

export default function CropModal() {
  const params = useLocalSearchParams<{ videoUri: string }>();
  const router = useRouter();
  const [isCropping, setIsCropping] = useState(true);
  const player = useVideoPlayer(params.videoUri, (player) => {
    player.play();
    player.timeUpdateEventInterval = 0.1;
  });

  const addProject = useProjectStore((state) => state.addProject);

  const handleCrop = () => {
    setIsCropping(false);
  };

  const generateVideoThumbnail = async (uri: string) => {
    try {
      const { uri: thumbnailUri } = await getThumbnailAsync(uri, {
        time: 1000,
      });
      return thumbnailUri;
    } catch (e) {
      console.warn(e);
      return "";
    }
  };

  const handleSubmit = async (title: string, description: string) => {
    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const thumbnail = await generateVideoThumbnail(params.videoUri);

    const project = {
      id,
      title,
      description,
      createdAt,
      uri: params.videoUri,
      thumbnail,
    };

    addProject(project);
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View className="flex-1 pb-safe dark:bg-grey">
        <VideoPlayer player={player} />
        <TouchableOpacity
          className="absolute top-4 left-4 bg-black/30 p-2 rounded-full"
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
        {isCropping ? (
          <VideoScrubber
            className="p-4 h-72"
            player={player}
            onCrop={handleCrop}
          />
        ) : (
          <MetadataForm className="p-4 h-72" onSubmit={handleSubmit} />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
