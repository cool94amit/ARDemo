'use strict';

import React from 'react';
import {
  Viro3DObject,
  ViroAmbientLight,
  ViroAnimations,
  ViroARPlane,
  ViroARScene,
  ViroOrbitCamera,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroQuad
  // @ts-ignore
} from 'react-viro';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  TouchableHighlight,
  Alert
} from 'react-native';

interface IProps {
  data: any
  arSceneNavigator: any
}
interface IState {
  isRotating: any
}

export default class ARExperience extends React.Component<IProps, IState>  {


  constructor(props: IProps) {
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

  }

  render() {
    const { arSceneNavigator } = this.props;
    const data = this.props.data;
    const { scale } = arSceneNavigator.viroAppProps;
    return (
      <ViroARScene anchorDetectionTypes={'PlanesHorizontal'} displayPointCloud={false}>
        <ViroARPlaneSelector minHeight={.5} minWidth={.5} alignment={"Horizontal"}>
          <ViroOrbitCamera position={[0, 0, 0]} focalPoint={[0, 0, -1]} active={true} />
          <ViroSpotLight
            innerAngle={5}
            outerAngle={25}
            direction={[0, -1, -.2]}
            position={[0, 3, 1]}
            color="#ffffff"
            castsShadow={true}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={5}
            shadowOpacity={.7} />
          <ViroAmbientLight color={'#909090'} influenceBitMask={1} />
          {/* <ViroARPlane> */}
            <Viro3DObject
              onClick={this.onClick}
              scale={[scale, scale, scale]} position={[0, 0, 1]}
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
          {/* </ViroARPlane> */}
          <ViroQuad
            position={[0, 0, 0]}
            rotation={[-90, 0, 0]}
            width={4} height={4}
            arShadowReceiver={true} />
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  }
}

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: '+=90',
    },
    duration: 500,
    easing: 'EaseInEaseOut',
  },
});
