import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button
} from 'react-native';
import {Camera, Permissions, ImagePicker} from 'expo';

class CameraComponent extends Component{

    state = {
        chosenImage: null,
    }
    _launchCameraRollAsyc = async () => {
        let {status} = await Expo.Permissions.askAsync(Expo.Permissions.CAMERA_ROLL)
        if(status !== 'granted'){
            console.log('Camera Roll perms not granted', );
            return;
        }

        let img = Expo.ImagePicker.launchImageLibraryAsync();
        this.setState({chosenImage: img})
        
    }



    render(){
        return (

                
                <Button 
                style={styles.container} 
                title='Launch Camera Roll' 
                onPress={()=>{
                    this._launchCameraRollAsyc()
                }} 
                />
            );
            { this.state.chosenImage &&(<Image source={{uri: this.state.chosenImage.uri}}/> || null)}
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