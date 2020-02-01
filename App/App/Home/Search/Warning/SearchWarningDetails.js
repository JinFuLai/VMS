/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {CommonStyle, JFLMap, I18n, BaseComponent} from '../../../Common/index';
import {Container, Text, Grid, Row} from 'native-base';
import {WarningBottom} from '../SearchComponent';

///搜索结果-告警详情
export default class SearchWarningDetails extends BaseComponent {
  static navigationOptions = () => ({
    headerTitle: () => (
      <Text style={CommonStyle.navGreenStyle}>
        {I18n.t('warnning_details')}
      </Text>
    ),
  });

  constructor(props) {
    super(props);
    this.state = {...this.state};
  }

  static propTypes = {
    // searchKey: PropTypes.any,//标题
  };

  render() {
    const data = this.props.navigation.state.params.data;
    return (
      <Container>
        <Grid>
          <Row>
            <JFLMap
              ref={ref => {
                this.JFLMap = ref;
              }}
              style={{flex: 1}}
            />
          </Row>
          <Row style={{height: 165}}>
            <WarningBottom
              data={data}
              carNum={data.carNum}
              IMEI={data.IMEI}
              driving={data.driving}
            />
          </Row>
        </Grid>
      </Container>
    );
  }

  componentDidMount() {
    const data = this.props.navigation.state.params.data;
    this.JFLMap.setLocationItem(data);
  }
}
