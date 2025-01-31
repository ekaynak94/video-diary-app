import React, { useState, useEffect } from "react";
import { View, TextInput } from "react-native";
import CustomButton from "@/components/CustomButton";
import * as yup from "yup";

interface MetadataFormProps {
  onSubmit: (title: string, description: string) => void;
  className?: string;
  isSubmitting: boolean;
}

const MetadataForm: React.FC<MetadataFormProps> = ({
  onSubmit,
  className = "",
  isSubmitting,
}) => {
  const [title, setTitle] = useState("My New Project");
  const [description, setDescription] = useState("");
  const [isValid, setIsValid] = useState(false);

  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
  });

  useEffect(() => {
    validationSchema
      .isValid({ title, description })
      .then((valid) => setIsValid(valid));
  }, [title, description]);

  const handleSubmit = () => {
    if (isValid) {
      onSubmit(title, description);
    }
  };

  return (
    <View className={`gap-4 ${className}`}>
      <TextInput
        className="bg-grey/5 dark:bg-white/5 p-2 rounded dark:text-white"
        placeholder="Title"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        className="bg-grey/5 dark:bg-white/5 p-2 min-h-16 rounded dark:text-white flex-grow"
        style={{ textAlignVertical: "top" }}
        placeholder="Add a video description"
        placeholderTextColor="#888"
        value={description}
        onChangeText={setDescription}
        multiline
        submitBehavior="blurAndSubmit"
      />
      <CustomButton
        onPress={handleSubmit}
        iconName="checkmark"
        className=""
        title="Save"
        disabled={!isValid || isSubmitting}
      />
    </View>
  );
};

export default MetadataForm;
