import React from "react";
import { View, Text } from "react-native";
import CustomButton from "@/components/CustomButton";

interface VideoScrubberProps {
  onCrop: () => void;
  className?: string;
}

const VideoScrubber: React.FC<VideoScrubberProps> = ({
  onCrop,
  className = "",
}) => {
  return (
    <View className={`gap-4 ${className}`}>
      <View className="border border-dashed border-white/30 rounded-lg flex-grow p-2 flex-row items-center justify-center">
        <Text className="dark:text-white text-lg">This is my scrubber</Text>
      </View>
      <CustomButton onPress={onCrop} iconName={"cut"} title={"Crop"} />
    </View>
  );
};

export default VideoScrubber;
