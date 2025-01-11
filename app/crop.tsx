import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";

export default function CropModal() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCropping, setIsCropping] = useState(true);
  const [name, setName] = useState("My New Project");
  const [description, setDescription] = useState("");
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

  const handleDone = () => {
    // Handle done action
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
          <View className="p-4">
            {!isCropping ? (
              <View>
                <TextInput
                  className="border border-dashed border-white/30 p-2 rounded dark:text-white my-4"
                  placeholder="Name"
                  placeholderTextColor="#888"
                  value={name}
                  onChangeText={setName}
                />
                <TextInput
                  className="border border-dashed border-white/30 p-2 rounded dark:text-white"
                  placeholder="Add a video description"
                  placeholderTextColor="#888"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  style={{ height: 100 }}
                />
              </View>
            ) : null}
          </View>
          <CustomButton
            onPress={isCropping ? handleCrop : handleDone}
            iconName={isCropping ? "cut" : "checkmark"}
            className="m-4"
            title={isCropping ? "Crop" : "Done"}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
