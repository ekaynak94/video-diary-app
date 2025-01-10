import React from "react";
import { Image, View, Text, FlatList } from "react-native";
import { Link } from "expo-router";

const defaultThumbnail = require("@/assets/images/icon.png");

const projectsList = [
  // {
  //   id: "myVideo 1",
  //   title: "My Video 1",
  //   description: "This is a video.",
  //   createdAt: "2021-01-01T00:00:00Z",
  //   uri: "",
  //   thumbnail: "",
  // },
  // {
  //   id: "myVideo 2",
  //   title: "My Video 2",
  //   description: "This is a video.",
  //   createdAt: "2021-01-01T00:00:00Z",
  //   uri: "",
  //   thumbnail: "",
  // },
  // {
  //   id: "myVideo 3",
  //   title: "My Video 3",
  //   description: "This is a video.",
  //   createdAt: "2021-01-01T00:00:00Z",
  //   uri: "",
  //   thumbnail: "",
  // },
  // {
  //   id: "myVideo 4",
  //   title: "My Video 4",
  //   description: "This is a video.",
  //   createdAt: "2021-01-01T00:00:00Z",
  //   uri: "",
  //   thumbnail: "",
  // },
];

export default function HomeScreen() {
  const renderItem = ({ item }) => {
    return (
      <View className="flex-1 m-2 gap-1">
        <Image
          source={item.thumbnail ? { uri: item.thumbnail } : defaultThumbnail}
          className="w-full h-48"
        />
        <Text className="text-lg font-bold">{item.title}</Text>
        <Text className="text-sm text-gray-600">
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
    );
  };

  const renderHeader = () => (
    <Text className="text-2xl font-bold mx-2 mb-4">My projects</Text>
  );

  const renderEmptyComponent = () => (
    <View className="flex-1 items-center justify-center">
      <Image
        source={require("@/assets/images/no-projects.png")}
        style={{ width: 200, height: 200 }}
      />
      <Text className="mt-4 text-lg">You have no projects</Text>
    </View>
  );

  return (
    <View className="flex-1 py-safe p-2">
      <FlatList
        data={projectsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        ListHeaderComponentClassName={projectsList.length > 0 ? "" : "hidden"}
        ListEmptyComponent={renderEmptyComponent}
      />
      <Link
        href="/modal"
        className="bg-purple rounded-lg m-2 p-4 text-center text-white text-lg"
      >
        + Create Project
      </Link>
    </View>
  );
}
