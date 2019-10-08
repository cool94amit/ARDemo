/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { default as Slider } from '@react-native-community/slider';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  TouchableHighlight
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title, List, ListItem, Accordion, Thumbnail } from 'native-base';

import ARExperience from './ARExperience';

var sharedProps = {
  apiKey: "6CF35CA9-6A8B-4102-8A5E-F41F1A36FD23",
}

var UNSET = "UNSET";
var VR_NAVIGATOR_TYPE = "VR";
var AR_NAVIGATOR_TYPE = "AR";
var defaultNavigatorType = UNSET;

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps,
      arTitles: [],
      dataArray: [
        { title: "Viro 360 Image", content: '360Image' },
        { title: "Viro 360 Video", content: '360Video' },
        { title: "AR Samples", content: 'ar' },
      ],
    }

    this._getARNavigator = this._getARNavigator.bind(this);
    this._getVRNavigator = this._getVRNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
  }

  componentDidMount() {
    fetch('https://poly.googleapis.com/v1/assets?category=art&format=OBJ&key=')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ arTitles: responseJson.assets});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _renderHeader = (item, expanded) => {
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#A9DAD6"
      }}>
        <Text style={{ fontWeight: "600" }}>
          {" "}{item.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
          : <Icon style={{ fontSize: 18 }} name="add-circle" />}
      </View>
    );
  }

  _renderContent = (item) => {
    return (
      <Content padder style={{ backgroundColor: "white" }}>
        {this._renderList(item.content)}
      </Content>
    );
  }


  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.main}>
          <ViroARSceneNavigator {...this.state.sharedProps}
            initialScene={{ scene: ARExperience, passProps: { data: this.state.selectedProp } }} />
        </View>
        <View style={styles.cameraControlsContainer}>
          {/* <TouchableOpacity onPress={onPressRecord}>
            <View style={styles.cameraControl}>
              {recordingVideo && <View style={styles.recordingVideo} />}
              {!recordingVideo && (
                <Image
                  source={images.video}
                  style={styles.imageCameraControlIcon}
                />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.cameraControl}>
              <Image
                source={images.photo}
                style={styles.imageCameraControlIcon}
              />
            </View>
          </TouchableOpacity> */}
        </View>
        <View style={styles.footer}>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={0.5}
              minimumTrackTintColor={colors.white}
              maximumTrackTintColor={colors.white}
              thumbTintColor={colors.yellow}
            />
            <View style={styles.sliderShortContainer}>
              {/* TODO: Use i18n translations below */}
              <Text style={styles.textSlider}>Short</Text>
            </View>
            <View style={styles.sliderTallContainer}>
              {/* TODO: Use i18n translations below */}
              <Text style={styles.textSlider}>Tall</Text>
            </View>
          </View>

          
        </View>
      </SafeAreaView>
    );
  }

  // Returns the ViroSceneNavigator which will start the VR experience
  _getVRNavigator() {
    return (
      <ViroVRSceneNavigator {...this.state.sharedProps}
        initialScene={{ scene: InitialVRScene }} onExitViro={this._exitViro} />
    );
  }

  _getExperienceButtonOnPress(navigatorType, rowData) {
    return () => {
      this.setState({
        navigatorType: navigatorType,
        selectedProp: rowData.formats[0],
      })
    }
  }

  _renderListItem = () => {
    if (this.state.arTitles.length > 0) {
      return (
        <List>
          {this.state.arTitles.map((item, i) => {
            return (
              <ListItem thumbnail>
                <Left>
                  <Thumbnail square source={{ uri: item.thumbnail.url }} />
                </Left>
                <Body>
                  <Text>{item.displayName}</Text>
                </Body>
                <Right>
                  <Button transparent onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE, item)}>
                    <Text>View</Text>
                  </Button>
                </Right>
              </ListItem>
            )
          })}
        </List>)
    } else {
      return <Text>Failed To Load Item or still loading please wait...</Text>
    }
  }

  _renderList(item) {
    if (item === 'ar') {
      return (
        this._renderListItem()
      )
    } else {
      return <Text>No Item To Display at the moment</Text>
    }
  }

  changeView = () => {

  }



  render() {
    if (this.state.navigatorType == UNSET) {
      return (
        <Container>
          <Header>
            <Left>
              <Button transparent>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>ARDemo</Title>
            </Body>
            <Right>
            </Right>
          </Header>
          <ScrollView>
            <Content style={{ backgroundColor: "white" }}>
              <Accordion
                dataArray={this.state.dataArray}
                animation={true}
                expanded={true}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
              />
            </Content>
          </ScrollView>
          <Footer>
            <FooterTab>
              <Button vertical>
                <Icon name="apps" />
                <Text>MENU</Text>
              </Button>
              <Button vertical>
                <Icon name="camera" />
                <Text>SCAN</Text>
              </Button>
              <Button vertical active>
                <Icon active name="navigate" />
                <Text>WIP</Text>
              </Button>
              <Button vertical>
                <Icon name="person" />
                <Text>WIP</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    } else return this._getARNavigator();
  };

}
export const colors = {
  black: '#000000',
  blue: '#15bde7',
  green: '#37a628',
  greyUltraLight: '#8f8f8f',
  greyLight: '#63666a',
  greyMedium: '#3e3f40',
  greyMediumDarker: '#3e3e3e',
  greyDark: '#202026',
  greyUltraDark: '#1d1d1d',
  greyUberDark: '#171717',
  greyAlmostBlack: '#121217',
  orange: '#ff4015',
  pinkLight: '#f500c7',
  pinkDark: '#e70095',
  purple: '#7a004f',
  red: '#ff0000',
  redOrange: '#e73500',
  teal: '#3a7381',
  tealLight: '#aedbd8',
  tealDark: '#3b9381',
  transparent: 'transparent',
  white: '#ffffff',
  yellow: '#ffd200',
  pink: '#E70095',
  darkBlue: '#3b99fc',
  purpleDark: '#530e3b',
  lightGrayWhite: 'rgba(255, 255, 255, 0.5)',
};

const styless = {
  openSansLight: {
    fontFamily: 'OpenSans-Light',
  },
  openSansRegularItalic: {
    fontFamily: 'OpenSans-Italic',
  },
  openSansRegular: {
    fontFamily: 'OpenSans-Regular',
  },
  openSansSemiBoldItalic: {
    fontFamily: 'OpenSans-SemiBoldItalic',
  },
  openSansSemiBold: {
    fontFamily: 'OpenSans-SemiBold',
  },
  openSansBold: {
    fontFamily: 'OpenSans-Bold',
  },
  openSansCondBold: {
    fontFamily: 'OpenSansCondensed-Bold',
  },
  openSansExtraBold: {
    fontFamily: 'openSans-ExtraBold',
  },
  verlagBold: {
    fontFamily: Platform.OS === 'ios' ? 'Verlag-Bold' : 'VerlagBold',
  },
  sFProDisplaySemibold: {
    fontFamily:
      Platform.OS === 'ios' ? 'SFProDisplay-Semibold' : 'SFProDisplaySemibold',
  },
};


const spaceBetween = 'space-between';
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: spaceBetween,
    backgroundColor: colors.black,
  },
  main: {
    flex: 1,
    backgroundColor: colors.greyMedium,
    flexDirection: 'column',
  },
  cameraControlsContainer: {
    height: 50,
    width: 120,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: spaceBetween,
  },
  cameraControl: {
    height: 50,
    width: 50,
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 25,
    backgroundColor: colors.greyMedium,
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCameraControlIcon: {
    height: 25,
    width: 25,
  },
  recordingVideo: {
    height: 22,
    width: 22,
    backgroundColor: colors.red,
    opacity: 1,
  },
  footer: {
    height: 50,
    backgroundColor: colors.black,
    flexDirection: 'row',
    justifyContent: spaceBetween,
    paddingTop: 20,
  },
  sliderContainer: {
    borderColor: colors.white,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    marginLeft: 40,
    marginTop: 5,
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
  textSlider: {
    ...styless.openSansSemiBold,
    color: colors.white,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  helpButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginRight: 10,
    height: 30,
  },
  helpButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageHelpIcon: {
    height: 17,
    width: 17,
  },
  textHelpButton: {
    paddingLeft: 5,
    ...styless.openSansRegular,
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
    letterSpacing: 1,
  },
});

