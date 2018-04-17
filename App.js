import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Container, Content } from 'native-base';
import Swiper from 'react-native-swiper';
import CameraComponent from './Components/Camera';

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      outerScrollEnabled: true
    }
  }

  verticalScroll = (index) => {
    if(index !== 1)
    {
      this.setState({
        outerScrollEnabled:false
      })
    }else{
      this.setState({
        outerScrollEnabled:true
      })
    }
  }
  render() {
    return (
      
      <Container>
      <View style={styles.container}>
      <ImageBackground source={require('./assets/checkIn4.png')} style={{width: 440, height: 800}}>
              <CameraComponent></CameraComponent>
              </ImageBackground>
              </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#BADA55',
  },


});
