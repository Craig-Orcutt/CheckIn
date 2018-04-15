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
        <Content>
          <Swiper
          loop={true}
          showsPagination={false}
          index={1}
          >
            <View style={styles.slideDefault}>
              <Text style={styles.text}>Chat</Text>
            </View>
            <Swiper
            loop={false}
            showsPagination={false}
            horizontal={false}
            index={1}
            onIndexChanged={(index)=> this.verticalScroll(index)}
            >
            <View style={styles.slideDefault}>
            <Text style={styles.text}>Stories</Text>
            </View>
            <View style={styles.slideDefault}>
              <CameraComponent></CameraComponent>
            </View>
            <View style={styles.slideDefault}>
            <Text style={styles.text}>Memories</Text>
            </View>
            </Swiper>

            <View style={styles.slideDefault}>
            <Text style={styles.text}>Stories</Text>
            </View>
          </Swiper>
        </Content>
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
  },
  slideDefault: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BADA55',
  },
  text: {
    fontSize: 100,
    fontWeight: 'bold',
    fontFamily: 'Futura'
  }
});
