import React, { useState, useRef } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
} from "react-native";
import * as ImageManipulator from "expo-image-manipulator";

const CameraComponent = ({ onPictureTaken }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [image, setImage] = useState("");

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      const options = {
        quality: 8, // Adjust the image quality (between 0 and 1)
        base64: true, // Get the image in base64 format
        exif: true, // Include EXIF metadata
      };
      const picture = await cameraRef.current.takePictureAsync(options);

      // Convert the image to PNG
      const pngImage = await ImageManipulator.manipulateAsync(picture.uri, [], {
        format: ImageManipulator.SaveFormat.PNG,
      });

      setImage(pngImage.uri);
      onPictureTaken(pngImage.uri);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Valider</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            flex: 1,
            width: 100,
            height: 100,
            alignSelf: "flex-end",
            alignItems: "center",
            justifyContent: "center",
            resizeMode: "contain",
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#103B00",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default CameraComponent;
