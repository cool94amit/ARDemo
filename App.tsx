import React from 'react';
import { Component } from 'react';
// import { default as Slider } from '@react-native-community/slider';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  TouchableHighlight,
  Platform
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
  // @ts-ignore
} from 'react-viro';

import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title, List, ListItem, Accordion, Thumbnail } from 'native-base';
// @ts-ignore
import ARExperience from './src/ARExperience';

var sharedProps = {
  apiKey: "6CF35CA9-6A8B-4102-8A5E-F41F1A36FD23",
}
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ARItemPage from './src/ARItemPage';
import Viro360Images from './src/Viro360Images';

var UNSET = "UNSET";
var defaultNavigatorType = UNSET;


interface IProps {
  navigation: any
}
interface IState {
  navigatorType: any,
  sharedProps: any,
  arTitles: Array<any>,
  dataArray: Array<any>,
}

class App extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
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

    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
    this._get360View = this._get360View.bind(this);
  }

  componentDidMount() {
    fetch('https://poly.googleapis.com/v1/assets?category=art&format=OBJ&key=AIzaSyBP7I4-PSym1jx4XS8Jv0NCJpJ3I2nOLgM')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ arTitles: responseJson.assets });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _renderHeader = (item: any, expanded: any) => {
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

  _renderContent = (item: any) => {
    return (
      <Content padder style={{ backgroundColor: "white" }}>
        {this._renderList(item.content)}
      </Content>
    );
  }

  _getExperienceButtonOnPress(rowData: any) {
    return () => {
      this.props.navigation.push('AR', { data: rowData.formats[0], sharedProps })
    }
  }

  _renderListItem = () => {
    // @ts-ignore
    if (this.state.arTitles.length > 0) {
      return (
        <List>
          {this.state.arTitles.map((item: any, i: any) => {
            return (
              <ListItem thumbnail>
                <Left>
                  <Thumbnail square source={{ uri: item.thumbnail.url }} />
                </Left>
                <Body>
                  <Text>{item.displayName}</Text>
                </Body>
                <Right>
                  <Button transparent onPress={this._getExperienceButtonOnPress(item)}>
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

  _get360View() {
    return () => {
      this.props.navigation.push('Viro360')
    }
  }

  _render360ListItem() {
    return (
      <List>
        <ListItem thumbnail>
          <Left>
            <Thumbnail square source={require('./assets/images/miami360.jpeg')} />
          </Left>
          <Body>
            <Text>Miami</Text>
          </Body>
          <Right>
            <Button transparent onPress={this._get360View()}>
              <Text>View</Text>
            </Button>
          </Right>
        </ListItem>
      </List>
    )
  }

  _renderList(item: any) {
    if (item === 'ar') {
      return (
        this._renderListItem()
      )
    } else if (item === '360Image') {
      return (
        this._render360ListItem()
      )
    } else {
      return <Text>No Item To Display at the moment</Text>
    }
  }

  changeView = () => {

  }



  render() {
    return (
      <Container>
        <Header>
          <Body style={styles.header}>
            <Title style={styles.title}>ARDemo</Title>
          </Body>
        </Header>
        <ScrollView>
          <Content style={{ backgroundColor: "white" }}>
            <Accordion
              // @ts-ignore
              dataArray={this.state.dataArray}
              // @ts-ignore
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
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: App,
  },
  AR: {
    screen: ARItemPage
  },
  Viro360: {
    screen: Viro360Images
  }
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center'
  }
});

