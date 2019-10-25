'use strict';

import React from 'react';
import {
  Viro360Video
  // @ts-ignore
} from 'react-viro';

interface IProps {

}
interface IState {

}

export default class Viro360Videos extends React.Component<IProps, IState>  {


  constructor(props: IProps) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <Viro360Video
        source={require('../assets/images/Doi.mp4')}
        loop={true}
        paused={false}
        volume={1.0}
      />
    );
  }
}