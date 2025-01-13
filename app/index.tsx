import React from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import useProjectStore from "@/stores/useProjectStore";
import { Project } from "@/types";
import { selectVideo } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

export default function HomeScreen() {
  const router = useRouter();
  const projects = useProjectStore((state) => state.projects);

  const mutation = useMutation<string | null, Error>({
    mutationFn: selectVideo,
    onSuccess: (uri) => {
      if (uri) {
        router.push({
          pathname: "/crop",
          params: { videoUri: uri },
        });
      }
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const handleSelectVideo = () => {
    mutation.mutate();
  };

  const renderItem = ({ item }: { item: Project }) => {
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
            source={{ uri: item.thumbnailUri }}
            className="w-48 h-48 rounded-lg"
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
        data={projects}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        ListHeaderComponentClassName={projects.length > 0 ? "" : "hidden"}
        ListEmptyComponent={renderEmptyComponent}
      />

      <CustomButton
        className="m-2"
        onPress={handleSelectVideo}
        iconName="add"
        title="Create Project"
      />
    </View>
  );
}
