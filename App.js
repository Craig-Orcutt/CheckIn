import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
              <CameraComponent ></CameraComponent>
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
    backgroundColor: '#BADA55',
  },

});
