import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "../../lib/useAppwrite";
import { getAllUsers } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";

// Custom separator component for FlatList
const Separator = () => (
  <View
    style={{
      height: 1,
      backgroundColor: "#E5E5E5",
      marginVertical: 4,
    }}
  />
);

const Chat = () => {
  const { user } = useGlobalContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [friendsData, setFriendsData] = useState([]);

  const { data: users, isLoading, refetch } = useAppwrite(() => getAllUsers());

  useEffect(() => {
    if (users) {
      const updatedFriendsData = users
        .filter((user) => user.$id !== currentUser.$id) // Filter out the logged-in user
        .map((user) => ({
          name: user.username,
          avatar: user.avatar,
          userId: user.$id,
        }));
      setFriendsData(updatedFriendsData);
    }
  }, [users]);

  const currentUser = user || {}; // Current logged-in user

  const handleSearch = (query) => {
    const filtered = friendsData.filter((friend) =>
      friend.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFriends(filtered);
    setSearchQuery(query);
  };

  const renderFriendItem = ({ item }) => {
    if (item.userId === currentUser.$id) {
      // Skip rendering the logged-in user
      return null;
    }

    return (
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", padding: 12 }}
        onPress={() => router.push({ pathname: "/ChatRoom", params: item })}
      >
        <Image
          source={{ uri: item.avatar }}
          style={{ width: 48, height: 48, borderRadius: 24, marginRight: 12 }}
        />
        <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1F2D" }}>
      <View style={{ padding: 16 }}>
        <TextInput
          placeholder="Search..."
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 24,
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredFriends.length > 0 ? filteredFriends : friendsData}
        keyExtractor={(item) => item.userId}
        renderItem={renderFriendItem}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={
          <Text
            style={{ textAlign: "center", marginTop: 24, color: "#FFFFFF" }}
          >
            No friends found
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default Chat;
