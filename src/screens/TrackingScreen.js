import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import MapmyIndiaIntouch from 'mapmyindia-intouch-react-native-sdk';
import play from '../assets/play_arrow_24_px.png';
import stop from '../assets/stop_24_px.png';
import Toast from 'react-native-simple-toast';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

class TrackingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: play,
      text: 'Start Tracking',
      currentSpeed: MapmyIndiaIntouch.BEACON_PRIORITY_FAST,
      dropDownEnabled: true,
      pickerBackground: '#CCFF0000',
    };
  }

  async componentDidMount() {
    MapmyIndiaIntouch.addTrackingStateListener((event) => {
      Toast.show(event);
      console.log(event);
      if(event==="onTrackingStart"){
        this.setIconsAndLabel(true);
      }else{
        this.setIconsAndLabel(false);
      }
    });
    this.getData();
    const status = await MapmyIndiaIntouch.isRunning();
    this.setIconsAndLabel(status);
  }

  componentWillUnmount() {
    MapmyIndiaIntouch.removeTrackingStateListener();
  }

  storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        this.setState({
          currentSpeed: parseInt(value),
        });
      }
    } catch (e) {
      // error reading value
    }
  };
  trackButtonPress = async () => {
    const status = await MapmyIndiaIntouch.isRunning();
    //console.log(status);
    if (status) {
      
      MapmyIndiaIntouch.stopTracking();
    } else {
      
      MapmyIndiaIntouch.startTracking(this.state.currentSpeed);
      //MapmyIndiaIntouch.startTrackingWithCustomConfig(5,5);
    }
  };

  redirectButtonPress = () => {
    Linking.openURL('https://intouch.mapmyindia.com');
  };

  setIconsAndLabel = (status) => {
    if (status) {
      this.setState({
        icon: stop,
        text: 'Stop tracking',
        dropDownEnabled: false,
        pickerBackground: 'rgba(52, 52, 52, 0.3)',
      });
    } else {
      this.setState({
        icon: play,
        text: 'Start tracking',
        dropDownEnabled: true,
        pickerBackground: 'rgba(255, 140, 0, 0.3)',
      });
    }
  };

  //only for ios platform
  chooseLabel(value) {
    switch (value) {
      case 0:
        return 'FAST';
      case 1:
        return 'SLOW';
      case 2:
        return 'OPTIMAL';
      default:
        return 'FAST';
    }
  }

  render() {
    //only for ios platform
    const iosPicker = this.state.dropDownEnabled ? (
      <Picker
        enabled={this.state.dropDownEnabled}
        selectedValue={this.state.currentSpeed}
        style={{height: 50, width: 140, marginBottom: 150}}
        onValueChange={(itemValue, itemIndex) => {
          console.log(itemValue);
          this.storeData(itemValue);
          this.setState({currentSpeed: itemValue});
        }}>
        <Picker.Item
          label="FAST"
          value={MapmyIndiaIntouch.BEACON_PRIORITY_FAST}
        />
        <Picker.Item
          label="SLOW"
          value={MapmyIndiaIntouch.BEACON_PRIORITY_SLOW}
        />
        <Picker.Item
          label="OPTIMAL"
          value={MapmyIndiaIntouch.BEACON_PRIORITY_OPTIMAL}
        />
      </Picker>
    ) : (
      <Text>{this.chooseLabel(this.state.currentSpeed)}</Text>
    );

    const picker =
      Platform.OS === 'android' ? (
        <View
          style={{
            ...styles.picker,
            backgroundColor: this.state.pickerBackground,
            borderColor: this.state.pickerBackground,
          }}>
          <Picker
            enabled={this.state.dropDownEnabled}
            selectedValue={this.state.currentSpeed}
            style={{height: 50, width: 140}}
            onValueChange={(itemValue, itemIndex) => {
              this.storeData(itemValue);
              this.setState({currentSpeed: itemValue});
            }}>
            <Picker.Item
              label="FAST"
              value={MapmyIndiaIntouch.BEACON_PRIORITY_FAST}
            />
            <Picker.Item
              label="SLOW"
              value={MapmyIndiaIntouch.BEACON_PRIORITY_SLOW}
            />
            <Picker.Item
              label="OPTIMAL"
              value={MapmyIndiaIntouch.BEACON_PRIORITY_OPTIMAL}
            />
          </Picker>
        </View>
      ) : (
        iosPicker
      );

    return (
      <View style={styles.root}>
        <Image
          source={require('../assets/in_touch_logo.png')}
          style={styles.logo}
        />
        <Text style={styles.label}>Live Location Tracking</Text>
        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', color: 'grey'}}>Choose Speed</Text>
           {picker}
          <TouchableOpacity onPress={this.trackButtonPress}>
            <View style={styles.trackButton}>
              <Image source={this.state.icon} style={{height: 30, width: 30}} />
              <Text style={{fontWeight: 'bold'}}>{this.state.text}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.redirectButtonPress}
            style={{marginTop: 10}}>
            <View style={{flexDirection: 'row', marginTop: 40}}>
              <Image
                source={require('../assets/open_in_new_24_px.png')}
                style={{height: 20, width: 20}}
              />
              <Text style={{fontWeight: 'bold', color: '#33B3FF'}}>
                Redirect to InTouch
              </Text>
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
    width: 130,
    borderRadius: 10,
  },
  picker: {
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default TrackingScreen;