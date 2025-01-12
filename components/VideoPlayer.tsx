import React, { useRef, useState } from "react";
import { View, Pressable, Animated } from "react-native";
import { VideoView, VideoPlayer as VideoPlayerType } from "expo-video";
import { Ionicons } from "@expo/vector-icons";

interface VideoPlayerProps {
  player: VideoPlayerType;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ player }) => {
  const [isPlaying, setIsPlaying] = useState(true);
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

  return (
    <View className="relative w-full flex-1">
      <Pressable className="absolute inset-0" onPress={handlePlayPause}>
        <VideoView
          player={player}
          style={{ height: "100%", width: "auto", maxWidth: "100%" }}
          nativeControls={false}
        />
        <Animated.View
          className="bg-black/30 p-2 rounded-full"
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
    </View>
  );
};

export default VideoPlayer;
