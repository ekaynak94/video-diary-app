import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { VideoView, VideoPlayer as VideoPlayerType } from "expo-video";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withDelay,
} from "react-native-reanimated";

interface VideoPlayerProps {
  player: VideoPlayerType;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ player }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const fadeAnim = useSharedValue(0);

  const handlePlayPause = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
    fadeAnim.value = withSequence(
      withTiming(1, { duration: 200 }),
      withDelay(800, withTiming(0, { duration: 200 }))
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
    };
  });

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
          style={[
            {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: [{ translateX: -12 }, { translateY: -12 }],
            },
            animatedStyle,
          ]}
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
