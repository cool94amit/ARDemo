'use strict';

import React from 'react';
import {
  Viro360Image
  // @ts-ignore
} from 'react-viro';

interface IProps {

}
interface IState {

}

export default class Viro360Images extends React.Component<IProps, IState>  {


  constructor(props: IProps) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <Viro360Image
        source={require('../assets/images/miami360.jpeg')}
        rotation={[0, 45, 0]}
        format="RGB565" />
    );
  }
}