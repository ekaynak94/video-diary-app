import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useVideoPlayer } from "expo-video";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import MetadataForm from "@/components/MetadataForm";
import VideoPlayer from "@/components/VideoPlayer";
import VideoScrubber from "@/components/VideoScrubber";
import useProjectStore from "@/stores/useProjectStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateClip, GenerateClipParams } from "@/lib/utils";
import { Project } from "@/types";

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

  const queryClient = useQueryClient();
  const mutation = useMutation<Project, Error, GenerateClipParams>({
    mutationFn: generateClip,
    onSuccess: (project) => {
      addProject(project);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      handleClose();
    },
    onError: (error) => {
      Alert.alert("Error", error.message, [
        { text: "OK", onPress: handleClose },
      ]);
    },
  });

  const handleFormSubmit = (title: string, description: string) => {
    mutation.mutate({
      title,
      description,
      videoUri: params.videoUri,
      segmentStart: segment[0],
      segmentEnd: segment[1],
    });
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
          onSubmit={handleFormSubmit}
          isSubmitting={mutation.isPending}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
