import { default as Slider } from '@react-native-community/slider';
import React, { useCallback, useRef, useState, Component } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  ImageStyle,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { SafeAreaView } from 'react-navigation';
import {
  ViroARSceneNavigator,
  // @ts-ignore
} from 'react-viro';
import ARExperience from './ARExperience';


interface IProps {
  navigation: any
  sceneNavigator: any
}
interface IState {
  recordingVideo: boolean,
}

export default class ARItemPage extends Component<IProps, IState> {

  ARSceneNav: any;
  scale: any = 0.3;
  constructor(props: IProps) {
    super(props);
    this.state = {
      recordingVideo: false,
    }
  }

  componentDidMount() {

  }

  onPressCapture = () => {
    const date = new Date();
    const dateStr = `${date.getDate()}-${date.getMonth() +
      1}-${date.getFullYear()} ${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
    this.ARSceneNav.sceneNavigator.takeScreenshot(dateStr, true);
  }

  onPressRecord = () => {
    this.setState({ recordingVideo: !this.state.recordingVideo }, async () => {
      const date = new Date();
      const dateStr = `${date.getDate()}-${date.getMonth() +
        1}-${date.getFullYear()} ${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
      if (this.state.recordingVideo)
        this.ARSceneNav.sceneNavigator.startVideoRecording(dateStr, true);
      else {
        await this.ARSceneNav.sceneNavigator.stopVideoRecording();
      }
    });
  };

  setScaleValue = (val: any) => {
    this.scale = val;
  }

  render() {
    const data = this.props.navigation.state.params.data;
    const sharedProps = this.props.navigation.state.params.sharedProps;

    return (
      <SafeAreaView style={styles.container} >
        <View style={styles.main}>
          <ViroARSceneNavigator {...sharedProps}
            ref={(ARSceneNav: any) => (this.ARSceneNav = ARSceneNav)}
            viroAppProps={{ scale: this.scale }}
            initialScene={{ scene: ARExperience, passProps: { data, scale: this.scale } }} />

          <View style={styles.cameraControlsContainer}>
            <TouchableOpacity
              style={styles.touchableRecord}
              onPress={() => this.onPressRecord()}
            >
              <View style={styles.cameraControl}>
                {this.state.recordingVideo && <View style={styles.recordingVideo} />}
                {!this.state.recordingVideo && (
                  <Image
                    source={require('../assets/images/video.png')}
                    style={styles.imageCameraControlIcon}
                  />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableCapture}
              onPress={() => this.onPressCapture()}
            >
              <View style={styles.cameraControl}>
                <Image
                  source={require('../assets/images/photo.png')}
                  style={styles.imageCameraControlIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={styles.footer}>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={0.1}
              minimumTrackTintColor={'whitee'}
              maximumTrackTintColor={'white'}
              thumbTintColor={'yellow'}
              onValueChange={(val) => this.setScaleValue(val)}
            />
            <View style={styles.sliderShortContainer}>
              <Text style={styles.textSlider}>Short</Text>
            </View>
            <View style={styles.sliderTallContainer}>
              <Text style={styles.textSlider}>Tall</Text>
            </View>
          </View>
        </View> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  cameraControlsContainer: {
    height: 45,
    width: 100,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cameraControl: {
    height: 50,
    width: 50,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 25,
    backgroundColor: 'grey',
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCameraControlIcon: {
    height: 25,
    width: 25,
  },
  touchableCapture: {
    marginLeft: 8,
  },
  recordingVideo: {
    height: 22,
    width: 22,
    backgroundColor: 'red',
    opacity: 1,
  },
  touchableRecord: {
    marginRight: 8,
  },
  footer: {
    height: 100,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
  slider: {
    width: 150,
    height: 30,
  },
  sliderShortContainer: {
    position: 'absolute',
    bottom: -20,
    left: -20,
  },
  sliderTallContainer: {
    position: 'absolute',
    bottom: -20,
    right: -20,
  },
  sliderContainer: {
    borderColor: 'white',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    marginLeft: 40,
    marginTop: 5,
  },
  textSlider: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});