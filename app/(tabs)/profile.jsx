import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import { EmptyState, InfoBox, PostCard, VideoCard } from "../../components";
import { getUserPosts, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: posts,
    isLoading,
    refetch,
  } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    // Implement your logout logic here
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#0B1626", flex: 1 }}>
      {!user ? (
        <View>
          <Text className="font-psemibold text-2xl text-black">
            No Logged In User
          </Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id.toString()}
          renderItem={({ item }) => (
            <PostCard
              title={item.title}
              image={item.photo}
              creator={item.users.username}
              avatar={item.users.avatar}
            />
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Activity Yet"
              subtitle="No posts to show, try creating your first one"
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={() => (
            // Render header conditionally based on user existence

            <View
              style={{ alignItems: "center", marginTop: 30, marginBottom: 20 }}
            >
              <TouchableOpacity
                onPress={logout}
                style={{
                  width: "100%",
                  alignItems: "flex-end",
                  marginBottom: 10,
                }}
              >
                <Image
                  source={icons.logout}
                  style={{ width: 24, height: 24 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  overflow: "hidden",
                  marginBottom: 10,
                }}
              >
                <Image
                  source={{ uri: user?.avatar }}
                  style={{ width: "100%", height: "100%", borderRadius: 40 }}
                  resizeMode="cover"
                />
              </View>

              <InfoBox
                title={user.username}
                containerStyles={{ marginTop: 10 }}
                titleStyles={{ fontSize: 20 }}
              />

              <View
                style={{ flexDirection: "row", marginTop: 10 }}
                className="justify-evenly w-full flex-row "
              >
                <InfoBox
                  title={posts.length || 0}
                  subtitle="Posts"
                  titleStyles={{ fontSize: 24 }}
                  containerStyles={{ marginRight: 20 }}
                />
                <InfoBox
                  title="1.2k"
                  subtitle="Followers"
                  titleStyles={{ fontSize: 24 }}
                />
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Profile;
