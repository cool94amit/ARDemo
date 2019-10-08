'use strict';

import React from 'react';
import {
  Viro3DObject,
  ViroAmbientLight,
  ViroAnimations,
  ViroARPlane,
  ViroARScene,
} from 'react-viro';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  TouchableHighlight
} from 'react-native';

class ARExperience extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      isRotating: false,
    };
  }
  onClick = () => {
    this.setState({ isRotating: true });
  };
  onAnimationFinished = () => {
    this.setState({ isRotating: false });
  };

  componentDidMount() {
    // alert(JSON.stringify(this.props));
  }

  render() {
    const data = this.props.data;
    return (
      <ViroARScene anchorDetectionTypes={'PlanesHorizontal'}>
        <ViroAmbientLight color={'#909090'} influenceBitMask={1} />
        <ViroARPlane minHeight={0.2} minWidth={0.2} alignment={'Horizontal'}>
          <Viro3DObject
            onClick={this.onClick}
            scale={[.5, .5, .5]} position={[0, 0, -1]}
            source={{ uri: data.root.url }}
            resources={[{ uri: data.resources[0].url }]}
            type="OBJ"
            animation={{
              name: 'rotate',
              loop: true,
              run: this.state.isRotating,
              onFinish: this.onAnimationFinished,
            }}
          />
        </ViroARPlane>
      </ViroARScene>
    );
  }
}

// ViroAnimations.registerAnimations({
//   rotate: {
//     properties: {
//       rotateY: '+=90',
//     },
//     duration: 500,
//     easing: 'EaseInEaseOut',
//   },
// });

module.exports = ARExperience;
