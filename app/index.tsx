import { Link } from "expo-router";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Link
        href={{
          pathname: "/details/[id]",
          params: { id: "myVideo" },
        }}
      >
        Details
      </Link>
      <Link href="/modal">Modal</Link>
    </View>
  );
}
