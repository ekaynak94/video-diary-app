import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  className?: string;
  iconName?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  title,
  className = "",
  iconName,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-purple rounded-lg p-4 flex-row items-center justify-center gap-4 ${className}`}
    >
      {iconName ? (
        <Ionicons name={iconName} size={24} color="white" className="mr-2" />
      ) : null}
      <Text className="text-white text-lg">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
