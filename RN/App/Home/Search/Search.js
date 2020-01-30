/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SectionList, FlatList, StatusBar} from 'react-native';
import {
  Screen,
  StyleSheet,
  Color,
  I18n,
  Loading,
  SearchHistroy,
  Toast,
  BaseComponent,
} from '../../Common/index';
import {
  Container,
  Header,
  Text,
  Item,
  Button,
  Icon,
  Input,
  View,
} from 'native-base';

export default class Search extends BaseComponent {
  static navigationOptions = () => ({
    header: null,
  });

  constructor() {
    super();
    this.state = {
      refresh: false,
      history: [],
    };
    this._goToView = this._goToView.bind(this);
  }

  render() {
    var history = this.state.history;
    var sections = [];
    if (history && history.length > 0) {
      let data = [];
      for (let index = 0; index < history.length; index++) {
        data.push({key: index, title: history[index]});
      }
      sections.push({
        key: I18n.t('search_records'),
        data: [{key: 0, data: data}],
      });
    }
    return (
      <Container style={SearchSheet.bgView}>
        <Header
          searchBar
          style={{borderBottomWidth: 0, backgroundColor: Color.jfl_F7F7F7}}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={Color.jfl_F7F7F7}
            translucent={false}
          />
          <Button
            transparent
            onPress={() => this._goToView('Home')}
            style={{width: 43}}>
            <Icon name="arrow-back" style={SearchSheet.searchBarLeftBtn} />
          </Button>
          <Item style={SearchSheet.searchBar}>
            <Input
              placeholder={I18n.t('list_search_title')}
              clearButtonMode="while-editing"
              style={{fontSize: 14}}
              onSubmitEditing={event => this.search(event.nativeEvent.text)}
              onChangeText={text => (this.keyWord = text)}
            />
            <Button
              transparent
              style={SearchSheet.searchBarRightBtn}
              onPress={() => this.search(this.keyWord)}
              icon={false}>
              <Text style={SearchSheet.searchBarRightBtnTitle}>
                {I18n.t('search')}
              </Text>
            </Button>
          </Item>
        </Header>
        {sections.length > 0 ? (
          <View style={SearchSheet.historyView}>
            <SectionList
              sections={sections}
              keyExtractor={item => item.key}
              renderItem={this._renderItem}
              renderSectionHeader={this._renderSectionHeader}
              ItemSeparatorComponent={this._separator}
            />
            <View style={SearchSheet.historyViewBtnBgView}>
              <Button
                transparent
                style={{height: '100%'}}
                onPress={() => this.clearHistory()}>
                <Text style={SearchSheet.historyViewBtnTitle}>
                  {I18n.t('search_clear_records')}
                </Text>
              </Button>
            </View>
          </View>
        ) : (
          <View style={[SearchSheet.historyView, {height: 100}]}>
            <Text
              style={{
                textAlign: 'center',
                color: Color.jfl_353535,
                fontSize: 14,
              }}>
              {I18n.t('search_history_no')}
            </Text>
          </View>
        )}
        {this.state.refresh ? <Loading /> : null}
      </Container>
    );
  }

  componentDidMount() {
    this.setState({refresh: true});
    SearchHistroy.getHistroy()
      .then(list => {
        this.state.history = list;
        this.setState({refresh: false});
      })
      .catch(_ => {
        this.setState({refresh: false});
        // Toast.show('暂无历史记录');
      });
  }

  _goToView = (viewName, data) => {
    const {navigate} = this.props.navigation;
    navigate(viewName, {data: data});
  };

  _renderSectionHeader = info => {
    let section = info.section.key;
    return (
      <View style={{backgroundColor: Color.jfl_FFFFFF}}>
        <Text style={SearchSheet.historyViewTitle}>{section}</Text>
      </View>
    );
  };

  _renderItem = info => {
    let item = info.item;
    return (
      <FlatList
        // contentContainerStyle={SearchSheet.historyViewFlatList}
        numColumns={3}
        data={item.data}
        keyExtractor={item => item.key}
        renderItem={this._renderFlatListItem}
        renderSectionHeader={this._renderSectionHeader}
      />
    );
  };
  _separator() {
    return <View />;
  }

  _renderFlatListItem = info => {
    let item = info.item;
    return (
      <Button
        rounded
        style={SearchSheet.historyViewItem}
        onPress={() => this.search(item.title)}>
        <Text style={SearchSheet.historyViewItemTitle}>{item.title}</Text>
      </Button>
    );
  };

  /**
   * 搜索
   * @param {*} keyword 关键字
   */
  search(keyword) {
    if (!(keyword && keyword.length > 0)) {
      Toast.show(I18n.t('search_input_keyword'));
      return;
    }
    let index = this.state.history.indexOf(keyword);
    let newHistory = [];
    let array = [].concat([keyword], this.state.history);
    if (index >= 0) {
      newHistory = array.slice(0, index + 1).concat(array.slice(index + 2));
    } else {
      newHistory = array;
    }
    this._goToView('SearchResult', keyword);
    this.setState({history: newHistory});
    SearchHistroy.saveSearchHistroy(newHistory);
  }

  /**清空历史记录 */
  clearHistory() {
    SearchHistroy.saveSearchHistroy([]);
    this.setState({history: []});
  }
}

const SearchSheet = StyleSheet.create({
  searchBar: {
    marginLeft: 0,
    paddingLeft: 0,
    backgroundColor: Color.jfl_FFFFFF,
    color: Color.jfl_353535,
    padding: 0,
    borderRadius: 4,
    fontSize: 14,
  },
  searchBarLeftBtn: {
    marginLeft: 0,
    paddingLeft: 0,
    color: Color.jfl_9F9F9F,
  },
  searchBarRightBtn: {
    width: 60,
    height: '100%',
    justifyContent: 'center',
  },
  searchBarRightBtnTitle: {
    color: Color.jfl_37BCAD,
    fontSize: 14,
    paddingLeft: 0,
    paddingRight: 0,
  },
  bgView: {
    backgroundColor: Color.jfl_F7F7F7,
  },
  historyView: {
    backgroundColor: Color.jfl_FFFFFF,
    width: '100%',
    justifyContent: 'center',
  },
  historyViewTitle: {
    fontSize: 12,
    color: Color.jfl_9F9F9F,
    height: 30,
    lineHeight: 30,
    marginHorizontal: 15,
  },
  historyViewBtnBgView: {
    height: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  historyViewBtnTitle: {
    fontSize: 13,
    height: '100%',
    color: Color.jfl_9F9F9F,
    textDecorationLine: 'underline',
  },
  historyViewFlatList: {
    // 主轴方向
    flexDirection: 'row',
    // 一行显示不下,换一行
    flexWrap: 'wrap',
    // 侧轴方向
    alignItems: 'center', // 必须设置,否则换行不起作用
    alignContent: 'space-between',
  },
  historyViewItem: {
    backgroundColor: Color.jfl_E9E9E9,
    width: (Screen.width - 15 * 2 - 15 * 2) / 3.0,
    height: 24,
    marginVertical: 6.5,
    marginLeft: 15,
    padding: 0,
    paddingBottom: 0,
    paddingTop: 0,
    justifyContent: 'center',
  },
  historyViewItemTitle: {
    textAlign: 'center',
    fontSize: 14,
    color: Color.jfl_353535,
    margin: 0,
    padding: 0,
  },
});
