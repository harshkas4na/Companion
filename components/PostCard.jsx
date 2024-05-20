import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";
import { router } from "expo-router";

const PostCard = ({
  title,
  creator,
  avatar,
  image,
  likes,
  isLiked,
  onLike,
}) => {
  // const [liked, setLiked] = useState(isLiked);
  // const [likeCount, setLikeCount] = useState(likes);

  // useEffect(() => {
  //   setLiked(isLiked);
  //   setLikeCount(likes);
  // }, [isLiked, likes]);

  // const handleLike = () => {
  //   const newLikeCount = liked ? likeCount - 1 : likeCount + 1;
  //   setLiked(!liked);
  //   setLikeCount(newLikeCount);
  //   onLike(); // Trigger the like function passed from parent component
  // };

  const renderPostImage = () => {
    if (likes === undefined) {
      // Render a non-interactive image if likes are not passed
      return (
        <TouchableOpacity
          onPress={() => {}}
          activeOpacity={0.7}
          style={{ width: "100%", height: 200, marginTop: 10 }}
        >
          <Image
            source={{ uri: image }}
            style={{ flex: 1, borderRadius: 8 }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      );
    }

    // Render interactive image with like button and like count
    return (
      <>
        <TouchableOpacity
          onPress={onLike}
          activeOpacity={0.7}
          style={{ width: "100%", height: 200, marginTop: 10 }}
        >
          <Image
            source={{ uri: image }}
            style={{ flex: 1, borderRadius: 8 }}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <TouchableOpacity onPress={onLike} activeOpacity={0.7}>
            <Image
              source={isLiked ? icons.heartFilled : icons.heartOutline}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 14, color: "#CCCCCC" }}>{likes} Likes</Text>
        </View>
      </>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: 14,
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
      >
        <View
          style={{
            width: 46,
            height: 46,
            borderRadius: 23,
            borderWidth: 1,
            borderColor: "#CCCCCC",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: avatar }}
            style={{ width: 44, height: 44, borderRadius: 22 }}
            resizeMode="cover"
          />
        </View>

        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text
            style={{ fontSize: 16, fontWeight: "600", color: "#FFFFFF" }}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text style={{ fontSize: 14, color: "#CCCCCC" }} numberOfLines={1}>
            {creator}
          </Text>
        </View>
      </View>

      {renderPostImage()}
    </View>
  );
};

export default PostCard;
