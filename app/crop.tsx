import React, { useState, useRef } from "react";
import {
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Text,
  Animated,
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

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handlePlayPause = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        delay: 800,
        useNativeDriver: true,
      }),
    ]).start();
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
            <Pressable className="absolute inset-0" onPress={handlePlayPause}>
              <VideoView
                player={player}
                style={{ height: "100%", width: "auto", maxWidth: "100%" }}
                nativeControls={false}
              />
              <Animated.View
                className=" bg-black/30 p-2 rounded-full"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: [{ translateX: -12 }, { translateY: -12 }],
                  opacity: fadeAnim,
                }}
              >
                <Ionicons
                  name={isPlaying ? "pause" : "play"}
                  size={24}
                  color="white"
                />
              </Animated.View>
            </Pressable>
            <TouchableOpacity
              className="absolute top-4 left-4 bg-black/30 p-2 rounded-full"
              onPress={() => router.back()}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          {isCropping ? (
            <View className="p-4">
              <View className="border border-dashed border-white/30 rounded-lg my-4 h-32 flex-row items-center justify-center">
                <Text className="dark:text-white text-lg">
                  This is my scrubber
                </Text>
              </View>
              <CustomButton
                onPress={handleCrop}
                iconName={"cut"}
                title={"Crop"}
              />
            </View>
          ) : (
            <MetadataForm className="p-4" onSubmit={handleSubmit} />
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
