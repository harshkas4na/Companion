import { StatusBar } from "expo-status-bar";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";
import { Redirect, router } from "expo-router";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView style={{ backgroundColor: "#0B1626", flex: 1 }}>
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <View className="flex-row items-center justify-center gap-[-15px]">
          <Image
            source={images.logoSmall}
            style={{ width: 100, height: 60 }}
            resizeMode="contain"
          />
          <Text className="text-4xl font-bold text-white">Companion</Text>
        </View>

        <Image
          source={images.cards}
          style={{ maxWidth: 380, width: "100%", height: 298 }}
          resizeMode="contain"
        />

        <View style={{ position: "relative", marginTop: 20 }}>
          <Text
            style={{
              fontSize: 30,
              color: "#FFFFFF",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Discover Endless{"\n"}
            Possibilities with{" "}
            <Text style={{ color: "#4CAF50" }}>Companion</Text>
          </Text>

          <Image
            source={images.path}
            style={{
              width: 136,
              height: 15,
              position: "absolute",
              bottom: -2,
              right: -8,
            }}
            resizeMode="contain"
          />
        </View>

        <Text
          style={{
            fontSize: 14,
            color: "#CCCCCC",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Where Connectivity Meets Simplicity: Join the World with Companion
        </Text>

        <CustomButton
          title="Continue with Email"
          handlePress={() => router.push("/sign-in")}
          containerStyles="w-full mt-7"
        />
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
