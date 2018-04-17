import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Camera, Permissions, ImagePicker, MailComposer } from "expo";
const { emailCreds } = require("./Email");

class CameraComponent extends Component {
  state = {
    chosenImage: null
    // takenImage: null
  };

  _launchCameraAsync = async () => {
    let { status } = await Expo.Permissions.askAsync(Expo.Permissions.CAMERA);
    if (status !== "granted") {
      console.log("Camera perms not granted");
      return;
    }
    let img = await Expo.ImagePicker.launchCameraAsync({});
    this.setState({ takenImage: img });
    console.log("takenImg", img);
  };
  _launchMailCompose = async () => {
    let timeStamp = Date(Date.now() / 1000).toLocaleString();
    let mail = await Expo.MailComposer.composeAsync({
      recipients: [emailCreds],
      subject: `${timeStamp}`,
      attachments: [this.state.takenImage.uri]
    }).then(data => {
      console.log("data", data);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this._launchCameraAsync().then(() => {
              if (this.state.takenImage.cancelled !== true) {
                this._launchMailCompose();
              } else {
                return;
              }
            });
          }}
        >
          <Text style={styles.buttonText}> Launch Camera </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CameraComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: "center"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 5,
    borderColor: "#fff",
    width: 200,
    height: 50,
    backgroundColor: "#d6d7da"
  },
  buttonText: {
    fontSize: 24
  }
});
