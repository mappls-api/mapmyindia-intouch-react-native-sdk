import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import MapmyIndiaIntouch from "mapmyindia-intouch-react-native-sdk";
import play from '../assets/play_arrow_24_px.png';
import stop from '../assets/stop_24_px.png';
import Toast from 'react-native-simple-toast';

class TrackingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: play,
      text: 'Start Tracking',
    };
  }

  async componentDidMount() {
    MapmyIndiaIntouch.addTrackingStateListener((event) => {
     Toast.show(event);
      console.log(event);
    });
    const status = await MapmyIndiaIntouch.isRunning();
    this.setIconsAndLabel(status);
  }

  componentWillUnmount() {
    MapmyIndiaIntouch.removeTrackingStateListener();
  }

  trackButtonPress = async () => {
    const status = await MapmyIndiaIntouch.isRunning()
   
    if (status) {
        this.setIconsAndLabel(false);
        MapmyIndiaIntouch.stopTracking();
      } else {
        this.setIconsAndLabel(true);
        MapmyIndiaIntouch.startTracking();
      }
   
  };

  redirectButtonPress=()=>{
      Linking.openURL("https://intouch.mapmyindia.com")
  }

  setIconsAndLabel = (status) => {
    if (status) {
      this.setState({
        icon: stop,
        text: 'Stop tracking',
      });
    } else {
      this.setState({
        icon: play,
        text: 'Start tracking',
      });
    }
  };

  render() {
    return (
      <View style={styles.root}>
        <Image
          source={require('../assets/in_touch_logo.png')}
          style={styles.logo}
        />
        <Text style={styles.label}>Live Location Tracking</Text>
        <View style={{flex: 2, justifyContent: 'center'}}>
          <TouchableOpacity onPress={this.trackButtonPress}>
            <View style={styles.trackButton}>
              <Image source={this.state.icon} style={{height: 30, width: 30}} />
              <Text style={{fontWeight: 'bold'}}>{this.state.text}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.redirectButtonPress} style={{marginTop:10}}>
            <View style={{flexDirection:'row',marginTop:40}}>
              <Image
                source={require('../assets/open_in_new_24_px.png')}
                style={{height: 20, width: 20}}
              />
              <Text style={{fontWeight: 'bold',color:'#33B3FF'}}>Redirect to InTouch</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 140,
    height: 35,
    marginTop: 40,
  },
  label: {
    color: 'grey',
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    width:130,
    borderRadius: 10,
  },
});

export default TrackingScreen;
