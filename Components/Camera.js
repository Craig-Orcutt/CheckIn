import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button
} from 'react-native';
import {Camera, Permissions, ImagePicker, MailComposer} from 'expo';
const { emailCreds } = require('./Email')

class CameraComponent extends Component{
    state = {
        chosenImage: null,
        takenImage: null
    }
    _launchCameraRollAsyc = async () => {
        let {status} = await Expo.Permissions.askAsync(Expo.Permissions.CAMERA_ROLL)
        if(status !== 'granted'){
            console.log('Camera Roll perms not granted', );
            return;
        }

        let img = await Expo.ImagePicker.launchImageLibraryAsync();
        this.setState({chosenImage: img})
        console.log('image thi', img);
    }


    _launchCameraAsync = async () => {
        let {status} = await Expo.Permissions.askAsync(Expo.Permissions.CAMERA);
        if(status !== 'granted'){
            console.log('Camera perms not granted', );
            return;
        }
        let img = await Expo.ImagePicker.launchCameraAsync({});
        this.setState({takenImage: img});
        console.log('takenImg', img );
        
    }
            _launchMailCompose = async () => {
                let timeStamp = Date(Date.now() / 1000).toLocaleString();
                let mail = await Expo.MailComposer.composeAsync({
                    recipients: [emailCreds],
                    subject: `${timeStamp}`,
                    attachments: [this.state.takenImage.uri]
                })
                .then((data)=>{
                    console.log('data', data);
                });
            }

    render(){
        return (
            <View>


                <Button title="Launch Camera"
                onPress={()=>{
                    this._launchCameraAsync()
                    .then((data)=>{
                        console.log('data');
                        this._launchMailCompose();
                    })
                }} />



                </View>
            );
        }
    }




export default CameraComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

// <View style={styles.container}>
                



// </View>
// );
// { (this.state.takenImage &&
// <Image 
//     source={{uri: this.state.takenImage.uri}}
//     style={{
//         height: 200,
//         width: 200,
//     }}
//     />) || 
//     null}



