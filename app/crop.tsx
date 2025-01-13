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
import useProjectStore from "@/stores/useProjectStore";
import { FFmpegKit } from "ffmpeg-kit-react-native";
import * as FileSystem from "expo-file-system";

export default function CropModal() {
  const params = useLocalSearchParams<{ videoUri: string }>();
  const router = useRouter();
  const [isCropping, setIsCropping] = useState(true);
  const [segment, setSegment] = useState<[start: number, end: number]>([0, 0]);
  const player = useVideoPlayer(params.videoUri, (player) => {
    player.play();
    player.timeUpdateEventInterval = 0.1;
  });

  const addProject = useProjectStore((state) => state.addProject);

  const handleClose = () => {
    player.pause();
    router.back();
  };

  const handleCrop = (start: number, end: number) => {
    setSegment(() => [start, end]);
    setIsCropping(false);
  };

  const handleSubmit = async (title: string, description: string) => {
    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const videoUri = params.videoUri;
    const { uri: thumbnailUri } = await getThumbnailAsync(videoUri, {
      time: 1000,
    });

    const clipUri = `${FileSystem.documentDirectory}${id}.mp4`;
    const command = `-i ${videoUri} -ss ${segment[0]} -to ${segment[1]} -c copy ${clipUri}`;
    const session = await FFmpegKit.execute(command);
    const returnCode = await session.getReturnCode();

    if (!returnCode.isValueSuccess()) return;

    const project = {
      id,
      title,
      description,
      createdAt,
      clipUri,
      thumbnailUri,
    };

    addProject(project);
    handleClose();
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
          onPress={handleClose}
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
        <VideoScrubber
          className={`p-4 h-72 ${isCropping ? "" : "hidden"}`}
          player={player}
          onCrop={handleCrop}
        />
        <MetadataForm
          className={`p-4 h-72 ${isCropping ? "hidden" : ""}`}
          onSubmit={handleSubmit}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
