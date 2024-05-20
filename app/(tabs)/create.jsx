// // import { useState } from "react";
// // import { router } from "expo-router";
// // import { ResizeMode, Video } from "expo-av";
// // import * as DocumentPicker from "expo-document-picker";
// // import { SafeAreaView } from "react-native-safe-area-context";
// // import {
// //   View,
// //   Text,
// //   Alert,
// //   Image,
// //   TouchableOpacity,
// //   ScrollView,
// // } from "react-native";

// // import { icons } from "../../constants";
// // import { createVideoPost } from "../../lib/appwrite";
// // import { CustomButton, FormField } from "../../components";
// // import { useGlobalContext } from "../../context/GlobalProvider";

// // const Create = () => {
// const { user } = useGlobalContext();
// const [uploading, setUploading] = useState(false);
// //   const [form, setForm] = useState({
// //     title: "",
// //     video: null,
// //     thumbnail: null,
// //     prompt: "",
// //   });

// //   const openPicker = async (selectType) => {
// //     const result = await DocumentPicker.getDocumentAsync({
// //       type:
// //         selectType === "image"
// //           ? ["image/png", "image/jpg"]
// //           : ["video/mp4", "video/gif"],
// //     });

// //     if (!result.canceled) {
// //       if (selectType === "image") {
// //         setForm({
// //           ...form,
// //           thumbnail: result.assets[0],
// //         });
// //       }

// //       if (selectType === "video") {
// //         setForm({
// //           ...form,
// //           video: result.assets[0],
// //         });
// //       }
// //     } else {
// //       setTimeout(() => {
// //         Alert.alert("Document picked", JSON.stringify(result, null, 2));
// //       }, 100);
// //     }
// //   };

// //   const submit = async () => {
// if (
//   (form.prompt === "") |
//   (form.title === "") |
//   !form.thumbnail |
//   !form.video
// ) {
//   return Alert.alert("Please provide all fields");
// }

// setUploading(true);
// try {
//   await createVideoPost({
//     ...form,
//     userId: user.$id,
//   });

//   Alert.alert("Success", "Post uploaded successfully");
//   router.push("/home");
// } catch (error) {
//   Alert.alert("Error", error.message);
// } finally {
//   setForm({
//     title: "",
//     video: null,
//     thumbnail: null,
//     prompt: "",
//   });

//   setUploading(false);
// }
// //   };

// //   return (
// //     <SafeAreaView className="bg-primary h-full">
// //       <ScrollView className="px-4 my-6">
// //         <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

// //         <FormField
// //           title="Video Title"
// //           value={form.title}
// //           placeholder="Give your video a catchy title..."
// //           handleChangeText={(e) => setForm({ ...form, title: e })}
// //           otherStyles="mt-10"
// //         />

// //         <View className="mt-7 space-y-2">
// //           <Text className="text-base text-gray-100 font-pmedium">
// //             Upload Video
// //           </Text>

// //           <TouchableOpacity onPress={() => openPicker("video")}>
// //             {form.video ? (
// //               <Video
// //                 source={{ uri: form.video.uri }}
// //                 className="w-full h-64 rounded-2xl"
// //                 useNativeControls
// //                 resizeMode={ResizeMode.COVER}
// //                 isLooping
// //               />
// //             ) : (
// //               <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
// //                 <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
// //                   <Image
// //                     source={icons.upload}
// //                     resizeMode="contain"
// //                     alt="upload"
// //                     className="w-1/2 h-1/2"
// //                   />
// //                 </View>
// //               </View>
// //             )}
// //           </TouchableOpacity>
// //         </View>

// //         <View className="mt-7 space-y-2">
// //           <Text className="text-base text-gray-100 font-pmedium">
// //             Thumbnail Image
// //           </Text>

// //           <TouchableOpacity onPress={() => openPicker("image")}>
// //             {form.thumbnail ? (
// //               <Image
// //                 source={{ uri: form.thumbnail.uri }}
// //                 resizeMode="cover"
// //                 className="w-full h-64 rounded-2xl"
// //               />
// //             ) : (
// //               <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
// //                 <Image
// //                   source={icons.upload}
// //                   resizeMode="contain"
// //                   alt="upload"
// //                   className="w-5 h-5"
// //                 />
// //                 <Text className="text-sm text-gray-100 font-pmedium">
// //                   Choose a file
// //                 </Text>
// //               </View>
// //             )}
// //           </TouchableOpacity>
// //         </View>

// //         <FormField
// //           title="AI Prompt"
// //           value={form.prompt}
// //           placeholder="The AI prompt of your video...."
// //           handleChangeText={(e) => setForm({ ...form, prompt: e })}
// //           otherStyles="mt-7"
// //         />

// //         <CustomButton
// //           title="Submit & Publish"
// //           handlePress={submit}
// //           containerStyles="mt-7"
// //           isLoading={uploading}
// //         />
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // };

// // export default Create;

// import { StyleSheet, Text, View } from "react-native";
// import React from "react";

// const create = () => {
//   return (
//     <View>
//       <Text>create</Text>
//     </View>
//   );
// };

// export default create;

// const styles = StyleSheet.create({});
import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import { CustomButton } from "../../components";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { createPost } from "../../lib/appwrite";

const CreatePost = ({ navigation }) => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    photo: null,
  });

  const handleImagePicker = async () => {
    // Implement image picking logic here using DocumentPicker or ImagePicker
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg", "image/jpeg", "image/svg"],
    });

    if (!result.canceled) {
      setForm({
        ...form,
        photo: result.assets[0],
      });
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
    // Set the selected image URI to state (imageUri)
  };

  const handleSubmit = async () => {
    if (!form.title || !form.photo) {
      Alert.alert("Please provide all fields");
      return;
    } else {
      try {
        const send = await createPost({
          ...form,
          userId: user.$id,
        });
        console.log("send:", send);
        setUploading(true);
        Alert.alert("Success", "Post uploaded successfully");
        router.push("/home");
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setForm({
          title: "",
          photo: null,
        });

        setUploading(false);
      }
    }
  };

  return (
    <SafeAreaView className="bg-primary flex-1 p-4">
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-2xl font-bold mb-4">
          Create a New Post
        </Text>

        <TouchableOpacity
          className="w-full h-48 mb-4 rounded-lg bg-gray-800 justify-center items-center"
          onPress={handleImagePicker}
        >
          {form?.photo ? (
            <Image
              source={{ uri: form?.photo.uri }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          ) : (
            <View className="flex items-center">
              <Image
                source={icons.upload}
                className="w-12 h-12 mb-2"
                resizeMode="contain"
              />
              <Text className="text-gray-400">Upload Image</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          className="w-full h-12 bg-gray-100 rounded-lg  px-4 text-white mb-4"
          placeholder="Enter Post Title"
          value={form.title}
          onChangeText={(e) => setForm({ ...form, title: e })}
        />

        <CustomButton
          title="Submit"
          handlePress={handleSubmit}
          containerStyles="w-full"
          isLoading={uploading}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreatePost;
