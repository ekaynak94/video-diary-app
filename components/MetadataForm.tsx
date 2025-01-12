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
    <View className={`${className}`}>
      <TextInput
        className="border border-dashed border-white/30 p-2 rounded dark:text-white mb-4"
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
        disabled={!isValid}
      />
    </View>
  );
};

export default MetadataForm;
