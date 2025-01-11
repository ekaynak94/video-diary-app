import React from "react";
import { Image, View, TouchableOpacity, Text, FlatList } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Link, useRouter } from "expo-router";

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
  const router = useRouter();

  const selectVideo = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "video/*",
      multiple: false,
    });

    if (result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      router.push({
        pathname: "/modal",
        params: { videoUri: uri },
      });
    }
  };

  const renderItem = ({ item }) => {
    return (
      <Link
        href={{
          pathname: "/details/[id]",
          params: { ...item },
        }}
        asChild
      >
        <TouchableOpacity className="flex-1 m-2 gap-1">
          <Image
            source={item.thumbnail ? { uri: item.thumbnail } : defaultThumbnail}
            className="w-48 h-48"
          />
          <Text className="text-lg font-bold dark:text-white">
            {item.title}
          </Text>
          <Text className="text-sm opacity-30 dark:text-white">
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </TouchableOpacity>
      </Link>
    );
  };

  const renderHeader = () => (
    <Text className="text-2xl font-bold mx-2 mb-4 dark:text-white">
      My projects
    </Text>
  );

  const renderEmptyComponent = () => (
    <View className="flex-1 items-center justify-center">
      <Image
        source={require("@/assets/images/no-projects.png")}
        style={{ width: 200, height: 200 }}
      />
      <Text className="mt-4 text-lg opacity-30 dark:text-white">
        You have no projects
      </Text>
    </View>
  );

  return (
    <View className="flex-1 py-safe p-2 dark:bg-grey">
      <FlatList
        data={projectsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        ListHeaderComponentClassName={projectsList.length > 0 ? "" : "hidden"}
        ListEmptyComponent={renderEmptyComponent}
      />
      <TouchableOpacity
        onPress={selectVideo}
        className="bg-purple rounded-lg m-2 p-4 text-center text-white text-lg"
      >
        <Text className="text-white">+ Create Project</Text>
      </TouchableOpacity>
    </View>
  );
}
