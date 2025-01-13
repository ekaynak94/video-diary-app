import React, { useState } from "react";
import { Dimensions, Text, View, ScrollView } from "react-native";
import { Image } from "expo-image";
import { VideoThumbnail, VideoPlayer as VideoPlayerType } from "expo-video";
import { useEventListener } from "expo";
import CustomButton from "@/components/CustomButton";

const SCREEN_WIDTH = Dimensions.get("screen").width;
export const FRAME_PER_SEC = 1;
export const FRAME_WIDTH = 80;
const TILE_HEIGHT = 80;
const TILE_WIDTH = FRAME_WIDTH / 2; // to get a 2x resolution

const DURATION_WINDOW_DURATION = 5;
const DURATION_WINDOW_BORDER_WIDTH = 4;
const DURATION_WINDOW_WIDTH =
  DURATION_WINDOW_DURATION * FRAME_PER_SEC * TILE_WIDTH;
const POPLINE_POSITION = "50%";

const FRAME_STATUS = Object.freeze({
  LOADING: { name: Symbol("LOADING") },
  READY: { name: Symbol("READY") },
});

const getLeftLinePlayTime = (offset: number) => {
  return offset / (FRAME_PER_SEC * TILE_WIDTH);
};
const getRightLinePlayTime = (offset: number) => {
  return (offset + DURATION_WINDOW_WIDTH) / (FRAME_PER_SEC * TILE_WIDTH);
};
const getPopLinePlayTime = (offset: number) => {
  return (
    (offset + (DURATION_WINDOW_WIDTH * parseFloat(POPLINE_POSITION)) / 100) /
    (FRAME_PER_SEC * TILE_WIDTH)
  );
};

interface Frame {
  status?: string;
  thumbnail?: VideoThumbnail;
}

interface VideoScrubberProps {
  player: VideoPlayerType;
  onCrop: (segmentStart: number, segmentEnd: number) => void;
  className?: string;
}

const VideoScrubber: React.FC<VideoScrubberProps> = ({
  player,
  onCrop,
  className = "",
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [frames, setFrames] = useState<Frame[]>([]);
  const [framesLineOffset, setFramesLineOffset] = useState(0);

  const handleCrop = () => {
    onCrop(
      getLeftLinePlayTime(framesLineOffset),
      getRightLinePlayTime(framesLineOffset)
    );
  };

  const handleOnTouchStart = () => {
    player.pause();
  };
  const handleOnTouchEnd = () => {
    player.play();
  };

  const handleOnProgress = ({ currentTime }: { currentTime: number }) => {
    if (currentTime >= getRightLinePlayTime(framesLineOffset)) {
      player.currentTime = getLeftLinePlayTime(framesLineOffset);
    }
  };

  const handleOnScroll = ({ nativeEvent }: { nativeEvent: any }) => {
    const playbackTime = getPopLinePlayTime(nativeEvent.contentOffset.x);
    player.currentTime = playbackTime;
    setFramesLineOffset(nativeEvent.contentOffset.x);
  };

  useEventListener(player, "timeUpdate", handleOnProgress);

  useEventListener(player, "statusChange", ({ oldStatus, status }) => {
    if (oldStatus === "loading" && status === "readyToPlay") {
      setVideoLoaded((prev) => {
        if (prev === true) return true;
        const numberOfFrames = Math.ceil(player.duration);
        const idleFrames = Array(numberOfFrames).fill({
          status: FRAME_STATUS.LOADING.name.description,
        });
        setFrames(idleFrames);
        player
          .generateThumbnailsAsync(
            idleFrames.map(
              (_frame, index) => (index / numberOfFrames) * player.duration
            )
          )
          .then((thumbnails) => {
            console.log("thumbnails", thumbnails);
            setFrames(
              thumbnails.map((thumbnail) => ({
                thumbnail,
                status: FRAME_STATUS.READY.name.description,
              }))
            );
          })
          .catch((error) => {
            console.error(error);
          });
        return true;
      });
    }
  });

  const renderFrame = (frame: Frame, index: React.Key | null | undefined) => {
    if (frame.status === FRAME_STATUS.LOADING.name.description) {
      return (
        <View
          className="bg-black/5 border-black/10 border-1"
          style={{
            width: TILE_WIDTH,
            height: TILE_HEIGHT,
          }}
          key={index}
        />
      );
    } else {
      return (
        <Image
          key={index}
          source={frame.thumbnail}
          style={{
            width: TILE_WIDTH,
            height: TILE_HEIGHT,
            zIndex: 10,
          }}
        />
      );
    }
  };

  return (
    <View className={`gap-4 justify-between ${className}`}>
      {frames && (
        <View
          className="justify-center z-10"
          style={{
            top: -DURATION_WINDOW_BORDER_WIDTH,
            width: SCREEN_WIDTH,
            height: TILE_HEIGHT + DURATION_WINDOW_BORDER_WIDTH * 2,
          }}
        >
          <View
            className="border-yellow rounded-md self-center"
            style={{
              width: DURATION_WINDOW_WIDTH,
              borderWidth: DURATION_WINDOW_BORDER_WIDTH,
              height: TILE_HEIGHT + DURATION_WINDOW_BORDER_WIDTH * 2,
            }}
          >
            <View className="bg-yellow rounded-tl-md rounded-tr-md self-center py-2 px-4 top-[-28px]">
              <Text className="font-bold text-black">
                {DURATION_WINDOW_DURATION} sec.
              </Text>
            </View>
          </View>
          <View className="absolute self-center z-20">
            <View
              className="bg-yellow"
              style={{
                width: 3,
                height: TILE_HEIGHT,
              }}
            />
          </View>
          <View
            className="absolute self-center z-20 bg-yellow rounded-tl-md rounded-tr-md"
            style={{
              width: DURATION_WINDOW_BORDER_WIDTH,
              height: TILE_HEIGHT + DURATION_WINDOW_BORDER_WIDTH * 2,
              left: SCREEN_WIDTH / 2 - DURATION_WINDOW_WIDTH / 2,
            }}
          />
          <View
            className="absolute self-center z-20 bg-yellow rounded-tl-md rounded-tr-md"
            style={{
              width: DURATION_WINDOW_BORDER_WIDTH,
              right:
                SCREEN_WIDTH - SCREEN_WIDTH / 2 - DURATION_WINDOW_WIDTH / 2,
              height: TILE_HEIGHT + DURATION_WINDOW_BORDER_WIDTH * 2,
            }}
          />
          <ScrollView
            className="absolute"
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{
              width: SCREEN_WIDTH,
            }}
            alwaysBounceHorizontal={true}
            scrollEventThrottle={1}
            onScroll={handleOnScroll}
            onTouchStart={handleOnTouchStart}
            onTouchEnd={handleOnTouchEnd}
            onMomentumScrollEnd={handleOnTouchEnd}
          >
            <View
              style={{
                width: SCREEN_WIDTH / 2 - DURATION_WINDOW_WIDTH / 2,
              }}
            />
            {frames.map((frame, index) => renderFrame(frame, index))}
            <View
              style={{
                width: SCREEN_WIDTH / 2 - DURATION_WINDOW_WIDTH / 2,
              }}
            />
          </ScrollView>
        </View>
      )}
      <CustomButton onPress={handleCrop} iconName={"cut"} title={"Crop"} />
    </View>
  );
};

export default VideoScrubber;
