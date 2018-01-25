import React, { Component } from "react";
import {
  Footer,
  FooterTab,
  Button,
  Text
} from "native-base";

import {StyleSheet} from 'react-native';
var styles = StyleSheet.create({
  
  footer: {
    height: 30
  },
  footerText: {
    fontSize: 10,
    textAlign: 'center'
  }
})

class RankXFooter extends Component {
  render() {
    return (
      <Footer style={styles.footer}>
        <FooterTab>
          <Button active>
            <Text style={styles.footerText}>{'Rank-X is a registered trademark property of Rank-X LLC. San Diego, CA - 2018'} </Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default RankXFooter;