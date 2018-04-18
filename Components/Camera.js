import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Camera, Permissions, ImagePicker, MailComposer, Location } from "expo";
const { emailCreds } = require("./Email");

class CameraComponent extends Component {
  state = {
    takenImage: null,
    located: {
      locationLongitude: null,
      locationLatitude: null
    }
  };

  _launchCameraAsync = async () => {
    let { status } = await Expo.Permissions.askAsync(Expo.Permissions.CAMERA);
    if (status !== "granted") {
      console.log("Camera perms not granted");
      return;
    }
    let img = await Expo.ImagePicker.launchCameraAsync({});
    this.setState({ takenImage: img });
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

  _launchGetCurrentLocation = async () => {
    let { status } = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
    if (status !== "granted") {
      console.log("Location perms not granted");
      return;
    }
    let locale = await Expo.Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });
    // Using spread operator to make copy of located object in state
    let located = { ...this.state.located };
    this.setState(prevState => ({
      // using spread operator again to update the state of the object 'Located' :)
      located: {
        ...prevState.located,
        locationLongitude: locale.coords.longitude,
        locationLatitude: locale.coords.latitude
      }
    }));
    // this.setState({
    //   ...this.state.located,
    //   locationLongitude: locale.coords.longitude
    // });
    // this.setState({
    //   ...this.state.located,
    //   locationLatitude: locale.coords.latitude
    // });
    console.log("location in getCurrentLocation", this.state.located);
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this._launchCameraAsync().then(() => {
              this._launchGetCurrentLocation();
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
