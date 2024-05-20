import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  RefreshControl,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, PostCard } from "../../components";
import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, updatePost } from "../../lib/appwrite";

const Home = () => {
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  // const [postsData, setPostsData] = useState([]);
  const { data: posts, isLoading, refetch } = useAppwrite(() => getAllPosts());

  useEffect(() => {
    setRefreshing(isLoading);
  }, [isLoading]);

  // useEffect(() => {
  //   if (posts) {
  //     const updatedPostsData = posts.map((post) => ({
  //       ...post,
  //       likesCount: post?.likes?.length || 0,
  //     }));
  //     setPostsData(updatedPostsData);
  //   }
  // }, [posts]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleLike = async (postId) => {
    updatePost(postId, user.$id);
    refetch();
  };

  const renderPost = ({ item }) => (
    <PostCard
      title={item.title}
      image={item.photo}
      creator={item.users.username}
      avatar={item.users.avatar}
      likes={item.likes.length}
      isLiked={item.likes.includes(user?.$id)}
      onLike={() => handleLike(item.$id)}
    />
  );

  const renderHeader = () => (
    <View style={{ marginHorizontal: 20, marginTop: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View className="flex-1 mt-4">
          <Text
            style={{ fontSize: 18, fontWeight: "normal", color: "#FFFFFF" }}
            className=""
          >
            Welcome Back
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#FFFFFF",
              marginLeft: 8,
            }}
          >
            {user?.username}
          </Text>
        </View>
        <Image
          source={images.logoSmall}
          style={{ width: 32, height: 32, marginLeft: 8 }}
        />
      </View>
      <View style={{ marginTop: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFFFFF" }}>
          Latest Photos
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0B1626" }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={renderPost}
        ListEmptyComponent={
          <EmptyState
            title="No Photos Found"
            subtitle="No photos uploaded yet. Be the first to share a photo!"
          />
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
};

export default Home;
