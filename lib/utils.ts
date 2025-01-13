import { randomUUID } from "expo-crypto";
import { FFmpegKit } from "ffmpeg-kit-react-native";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";

export interface GenerateClipParams {
  title: string;
  description: string;
  videoUri: string;
  segmentStart: number;
  segmentEnd: number;
}

export const generateClip = async ({
  title,
  description,
  videoUri,
  segmentStart,
  segmentEnd,
}: GenerateClipParams) => {
  const id = randomUUID();
  const createdAt = new Date().toISOString();

  const clipUri = `${FileSystem.documentDirectory}${id}.mp4`;
  const thumbnailUri = `${FileSystem.documentDirectory}${id}.jpg`;
  const command = `-i ${videoUri} -ss ${segmentStart} -to ${segmentEnd} -c copy ${clipUri} -ss ${segmentStart} -vframes 1 ${thumbnailUri}`;
  const session = await FFmpegKit.execute(command);
  const returnCode = await session.getReturnCode();

  if (!returnCode.isValueSuccess())
    throw new Error("Failed to generate clip and thumbnail");

  return {
    id,
    title,
    description,
    createdAt,
    clipUri,
    thumbnailUri,
  };
};

export const selectVideo = async (): Promise<string | null> => {
  const result = await DocumentPicker.getDocumentAsync({
    type: "video/*",
    multiple: false,
  });

  if (result.assets && result.assets.length > 0) {
    return result.assets[0].uri;
  }

  return null;
};
