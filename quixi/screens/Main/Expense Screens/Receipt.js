import React, { useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Receipt = ({ navigation, route }) => {
  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const setReceipt = route.params.setReceipt;

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  const handleCapturePhoto = async () => {
    console.log("Taking photo");
    console.log(isCameraReady);
    if (isCameraReady) {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        console.log("Photo:", photo);
        setReceipt(photo.uri);
        navigation.goBack();
      }
    }
  };

  const handleChooseFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log("Gallery Result:", result);
      if (!result.canceled) {
        setReceipt(result.uri);
        navigation.goBack();
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={cameraRef}
        onCameraReady={handleCameraReady}
      />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          marginTop: 30,
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          style={styles.captureButton}
          onPress={handleCapturePhoto}
          disabled={isCameraReady}
        >
          <Ionicons name={"camera-outline"} size={20} color={"#fff"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.galleryButton}
          onPress={handleChooseFromGallery}
        >
          <Ionicons name={"images-outline"} size={20} color={"#fff"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
    backgroundColor: "transparent",
  },
  backButtonText: {
    fontSize: 18,
    color: "black",
  },
  camera: {
    width: "90%",
    height: 500,
  },
  captureButton: {
    backgroundColor: "black",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  captureButtonText: {
    fontSize: 12,
    color: "white",
  },
  galleryButton: {
    backgroundColor: "black",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  galleryButtonText: {
    fontSize: 12,
    color: "white",
  },
});

export default Receipt;
