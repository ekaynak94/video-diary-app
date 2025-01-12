import React, { useState } from "react";
import { View, TextInput } from "react-native";
import CustomButton from "@/components/CustomButton";

interface MetadataFormProps {
  onSubmit: (name: string, description: string) => void;
  className?: string;
}

const MetadataForm: React.FC<MetadataFormProps> = ({
  onSubmit,
  className = "",
}) => {
  const [name, setName] = useState("My New Project");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onSubmit(name, description);
  };

  return (
    <View className={`${className}`}>
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
      <CustomButton
        onPress={handleSubmit}
        iconName="checkmark"
        className="m-2"
        title="Save"
      />
    </View>
  );
};

export default MetadataForm;
