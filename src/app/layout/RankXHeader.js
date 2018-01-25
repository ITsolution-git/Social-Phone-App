import React, { Component } from "react";
import {
  Header,
  Left,
  Button,
  Text,
  Title,
  Body,
  Right,
  Icon,
  Thumbnail
} from "native-base";


const logo = require("../../images/rankx-logo.jpg");
const avatar = require("../../images/empty-avatar.jpg");
import {Actions} from 'react-native-router-flux'

import {StyleSheet} from 'react-native';
var styles = StyleSheet.create({
  
})

class RankXHeader extends Component {
  render() {
    return (
      <Header>
        <Left>
          <Button transparent onPress={Actions.pop}>
            <Thumbnail square source={logo}  />
          </Button>

          <Button transparent onPress={Actions.pop}>
            <Thumbnail source={avatar}  />
            <Text>Username</Text>
            <Text>+100</Text>
          </Button>
        </Left>
        <Right>
          <Button transparent onPress={Actions.pop}>
            <Icon name="menu" />
          </Button>
        </Right>
      </Header>
    );
  }
}

export default RankXHeader;