import React from "react";
import {
  SafeAreaView,
  Image,
  View,
  Text,
  FlatList,
  Button,
} from "react-native";

const defaultThumbnail = require("@/assets/images/icon.png");

const projectsList = [
  {
    id: "myVideo 1",
    title: "My Video 1",
    description: "This is a video.",
    createdAt: "2021-01-01T00:00:00Z",
    uri: "",
    thumbnail: "",
  },
  {
    id: "myVideo 2",
    title: "My Video 2",
    description: "This is a video.",
    createdAt: "2021-01-01T00:00:00Z",
    uri: "",
    thumbnail: "",
  },
  {
    id: "myVideo 3",
    title: "My Video 3",
    description: "This is a video.",
    createdAt: "2021-01-01T00:00:00Z",
    uri: "",
    thumbnail: "",
  },
  {
    id: "myVideo 4",
    title: "My Video 4",
    description: "This is a video.",
    createdAt: "2021-01-01T00:00:00Z",
    uri: "",
    thumbnail: "",
  },
];

export default function HomeScreen() {
  const renderItem = ({ item }) => {
    return (
      <View className="flex-1 m-2 items-center p-2 rounded-md ">
        <Image
          source={item.thumbnail ? { uri: item.thumbnail } : defaultThumbnail}
          className="w-24 h-24 bg-gray-300"
        />
        <Text className="mt-2 text-lg font-bold">{item.title}</Text>
        <Text className="text-sm text-gray-600">
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">My projects</Text>
      <FlatList
        data={projectsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      <Button
        title="Create Project"
        onPress={() => {
          /* Handle create project */
        }}
      />
    </SafeAreaView>
  );
}
