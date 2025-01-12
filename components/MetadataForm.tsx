import React, { useState, useEffect } from "react";
import { View, TextInput } from "react-native";
import CustomButton from "@/components/CustomButton";
import * as yup from "yup";

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
  const [isValid, setIsValid] = useState(false);

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
  });

  useEffect(() => {
    validationSchema
      .isValid({ name, description })
      .then((valid) => setIsValid(valid));
  }, [name, description]);

  const handleSubmit = () => {
    if (isValid) {
      onSubmit(name, description);
    }
  };

  return (
    <View className={`gap-4 ${className}`}>
      <TextInput
        className="border border-dashed border-white/30 p-2 rounded dark:text-white"
        placeholder="Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="border border-dashed border-white/30 p-2  min-h-16 rounded dark:text-white flex-grow"
        placeholder="Add a video description"
        placeholderTextColor="#888"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <CustomButton
        onPress={handleSubmit}
        iconName="checkmark"
        className=""
        title="Save"
        disabled={!isValid}
      />
    </View>
  );
};

export default MetadataForm;
