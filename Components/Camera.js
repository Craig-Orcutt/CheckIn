import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Camera, Permissions, ImagePicker, MailComposer, Location } from "expo";
const { emailCreds } = require("./Email");

class CameraComponent extends Component {
  state = {
    takenImage: null,
    located: {
      latitude: null,
      longitude: null
    },
    geoCodeData: {
      address: null,
      city: null,
      state: null
    }
  };

  componentWillMount = () => {
    this.getCurrentLocation();
    // this.launchCameraAsync();
  };
  getCurrentLocation = () =>
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log("position", position);

        let currentUserPosition = position.coords;
        alert(JSON.stringify(currentUserPosition));
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
        distanceFilter: 10
      }
    );

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
    }
    let geoLocationOption = {
      enableHighAccuracy: true
    };
    let locale = await Expo.Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });
    console.log("locale", locale);

    // Using spread operator to make copy of located object in state
    let located = { ...this.state.located };
    this.setState(prevState => ({
      // using spread operator again to update the state of the object 'Located' :)
      located: {
        ...prevState.located,
        longitude: locale.coords.longitude,
        latitude: locale.coords.latitude
      }
    }));

    console.log("location in getCurrentLocation", this.state.located);

    let geoCode = Expo.Location.reverseGeocodeAsync(this.state.located).then(
      ([data]) => {
        let geoCodeData = { ...this.state.geoCodeData };
        console.log("data", data);

        this.setState(prevState => ({
          // using spread operator again to update the state of the object 'geoCode'. need to figure out how to get it out of an array :)
          geoCodeData: {
            ...prevState.geoCodeData,
            address: data.name,
            city: data.city,
            state: data.region
          }
        }));
        // console.log("geoCode", data[0]);
        console.log("geoData", this.state.geoCodeData);
      }
    );
  };

  _launchGetGeoCode = async () => {
    // need to get the lat and long out of the
    // let geoCode = awaitExpo.Location.reverseGeocodeAsync(this.state.located);
    // let geoCodeLat = this.state.located.latitude;
    // let geoCodeLong = this.state.located.longitude;
    // console.log("geo", geoCodeLat);
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
    borderRadius: 6,
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
