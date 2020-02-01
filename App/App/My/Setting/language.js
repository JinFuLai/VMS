/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {I18n, storage} from '../../Common/index';
import {
  List,
  Container,
  ListItem,
  Text,
  Thumbnail,
  Right,
  Left,
} from 'native-base';

export default class Language extends PureComponent {
  static navigationOptions = () => ({
    title: I18n.t('my_setting_language'),
  });

  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {};

  render() {
    return (
      <Container>
        <List>
          <ListItem noIndent onPress={() => this._onPress(0)}>
            <Left>
              <Text>{I18n.t('chinese')}</Text>
            </Left>
            {I18n.locale == 'zh' ? (
              <Right>
                <Thumbnail
                  square
                  source={require('../../Source/Img/Home/Home_search_6/gou.png')}
                  style={{width: 12.5, height: 12.5}}
                />
              </Right>
            ) : null}
          </ListItem>
          <ListItem noIndent onPress={() => this._onPress(1)}>
            <Left>
              <Text>{I18n.t('english')}</Text>
            </Left>
            {I18n.locale == 'en' ? (
              <Right>
                <Thumbnail
                  square
                  source={require('../../Source/Img/Home/Home_search_6/gou.png')}
                  style={{width: 12.5, height: 12.5}}
                />
              </Right>
            ) : null}
          </ListItem>
        </List>
      </Container>
    );
  }

  _onPress = index => {
    if (index == 0) {
      I18n.locale = 'zh';
    } else if (index == 1) {
      I18n.locale = 'en';
    }
    storage.save({
      key: 'language',
      data: I18n.locale,
      expires: null,
    });
    DeviceEventEmitter.emit('LanguageEvent', null);
    // this.forceUpdate();
    this.props.navigation.goBack();
  };
}
