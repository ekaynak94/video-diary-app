import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  className?: string;
  iconName?: string;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  title,
  className = "",
  iconName,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-purple rounded-lg p-4 flex-row items-center justify-center gap-4 ${className} ${
        disabled ? "opacity-50" : ""
      }`}
      disabled={disabled}
    >
      {iconName && (
        <Ionicons
          name={iconName as any}
          size={24}
          color="white"
          className="mr-2"
        />
      )}
      <Text className="text-white text-lg">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
