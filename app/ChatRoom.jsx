import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../context/GlobalProvider";
import useAppwrite from "../lib/useAppwrite";
import { useLocalSearchParams } from "expo-router";
import { getAllMessages, getRoomId, sendMsg } from "../lib/appwrite";

const ChatRoom = () => {
  const item = useLocalSearchParams();

  const { user } = useGlobalContext();
  const [message, setMessage] = useState("");

  const [Roommsgs, setRoomMsgs] = useState([]);
  const [RoomMessages, setRoomMessages] = useState([]);

  const [messageOfCurrentUser, setMessageOfCurrentUser] = useState([]);
  const [messagesOfItemUser, setMessagesOfItemUser] = useState([]);
  const [roomId, setRoomId] = useState("");

  const {
    data: msgs,
    isLoading,
    refetch,
  } = useAppwrite(() => getAllMessages());

  //Create Room Id
  useEffect(() => {
    const roomID = getRoomId(user.$id, item.userId);
    setRoomId(roomID);
  }, [user.$id, item.userId]);

  useEffect(() => {
    const Roomessages = msgs.filter((msg) => msg.roomId === roomId);

    setRoomMsgs(Roomessages);
  }, [msgs, roomId]);

  useEffect(() => {
    if (Roommsgs) {
      // Filter messages sent by the current user
      const currentUserMessages = Roommsgs.filter(
        (msg) => msg.users.$id === user.$id
      );
      setMessageOfCurrentUser(currentUserMessages);

      // Filter messages sent by the item's user
      const itemUserMessages = Roommsgs.filter(
        (msg) => msg.users.$id === item.userId
      );
      setMessagesOfItemUser(itemUserMessages);
    }
  }, [Roommsgs, user.$id, item.userId]);

  //Making Room messages to get stored according to there $updatedAt
  useEffect(() => {
    const msgList = [...messagesOfItemUser, ...messageOfCurrentUser];
    //Now sort them according to there $updatedAt property
    msgList.sort((a, b) => {
      return new Date(a.$updatedAt) - new Date(b.$updatedAt);
    });
    setRoomMessages(msgList);
  }, [messagesOfItemUser, messageOfCurrentUser]);

  const handleSend = () => {
    if (!message.trim()) {
      Alert.alert("Message cannot be empty");
      return;
    }

    const newMessage = {
      roomId: roomId,
      Msgbody: message,
      userId: user.$id,
    };

    sendMsg(newMessage);

    setMessage("");

    refetch();
  };

  return (
    <SafeAreaView className="bg-primary" style={{ flex: 1, padding: 16 }}>
      <View style={{ flex: 1 }}>
        <View className="flex flex-col gap-[-8px]">
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 16,
            }}
          >
            Chat Room
          </Text>
          <View className="flex flex-row gap-2 bg-black rounded-xl p-2 mb-4">
            <Image
              source={{ uri: item.avatar }}
              style={{ width: 36, height: 36, borderRadius: 23 }}
              className="rounded-full"
              alt="user"
              title="user"
              resizeMode="cover"
            />
            <Text
              style={{ color: "white", fontSize: 14 }}
              className="text-xl font-monospace"
            >
              {item.name}
            </Text>
          </View>
        </View>

        <ScrollView style={{ flex: 1 }}>
          {RoomMessages.map((msg, index) => (
            <View
              key={index}
              style={{
                flexDirection:
                  msg.users.$id === user.$id ? "row-reverse" : "row",
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  maxWidth: "90%",
                  padding: 12,
                  borderRadius: 8,
                  backgroundColor:
                    msg.users.$id === user.$id ? "#DDDDDD" : "#4CAF50",
                }}
              >
                <Text
                  style={{
                    color: msg.users.$id === user.$id ? "black" : "white",
                    fontSize: 16,
                  }}
                >
                  {msg.Msgbody}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}
        >
          <TextInput
            style={{
              flex: 1,
              backgroundColor: "#333333",
              borderRadius: 8,
              padding: 12,
              color: "white",
              marginRight: 8,
            }}
            placeholder="Type a message..."
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <TouchableOpacity
            onPress={handleSend}
            style={{ backgroundColor: "#2196F3", padding: 12, borderRadius: 8 }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatRoom;
