/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Color,
  CommonStyle,
  I18n,
  HttpUtils,
  Toast,
  BaseComponent,
  LoadingTool,
} from '../../../Common/index';
import {Container, Text, View} from 'native-base';
import {SectionList} from 'react-native';

export default class SearchDetails extends BaseComponent {
  static navigationOptions = () => ({
    headerTitle: () => (
      <Text style={CommonStyle.navGreenStyle}>{I18n.t('details')}</Text>
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
      info: null,
    };
  }

  render() {
    let vehicle = this.state.data;
    let device = vehicle && vehicle.device ? vehicle.device : {};
    let driver = vehicle && vehicle.driver ? vehicle.driver : {};
    const dataArray = vehicle
      ? [
          {
            data: [
              {title: I18n.t('details_plate_number'), info: vehicle.plate},
              {title: I18n.t('details_name'), info: driver.name},
              // {title: I18n.t('details_Identity_ID'), info: 230221198902023423},
              {
                title: I18n.t('details_contact'),
                info: driver.contact && driver.contact.mobile,
              },
              {
                title: I18n.t('details_equipment_no'),
                info: vehicle.engine_number,
              },
              {title: I18n.t('details_imei'), info: device.imei},
              {
                title: I18n.t('details_vehicle_identification'),
                info: vehicle.number,
              },
              {
                title: I18n.t('details_vehicle_type'),
                info: vehicle.vehicle_type && vehicle.vehicle_type.name,
              },
            ],
          },
          {
            data: [
              // {title: I18n.t('details_equipment_power'), info: '20%'},
              {title: I18n.t('details_equipment_state'), info: device.status},
            ],
          },
          {
            data: [
              {
                title: I18n.t('details_location_time'),
                info: device.last_gps_point && device.last_gps_point.datetime,
              },
              // {
              //   title: I18n.t('details_communication_time'),
              //   info: '2018-10-10 14：50',
              // },
              {
                title: I18n.t('details_speed'),
                info: `${
                  device.last_gps_point
                    ? device.last_gps_point.speed
                      ? device.last_gps_point.speed
                      : 0
                    : 0
                } km/h`,
              },
              {
                title: I18n.t('details_longitude'),
                info: device.last_gps_point && device.last_gps_point.longitude,
              },
              {
                title: I18n.t('details_latitude'),
                info: device.last_gps_point && device.last_gps_point.latitude,
              },
              {
                title: I18n.t('details_address'),
                info: device.last_gps_point && device.last_gps_point.address,
              },
            ],
          },
          {
            data: [
              {title: I18n.t('details_expiration'), info: device.purchase_date},
            ],
          },
        ]
      : null;
    return (
      <Container>
        {dataArray ? (
          <SectionList
            style={{backgroundColor: Color.jfl_F7F7F7}}
            sections={this.state.isRefresh ? null : dataArray}
            renderSectionFooter={() => {
              return <View style={{height: 8, backgroundColor: ''}} />;
            }}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            ItemSeparatorComponent={() => {
              return <View />;
            }}
          />
        ) : null}
      </Container>
    );
  }
  _keyExtractor = (item, index) => {
    return 'key' + index + item;
  };
  _renderItem = index => {
    let data = index.item;
    return (
      <View noBorder style={SearchDetailsStyle.ItemConten}>
        <Text
          style={[SearchDetailsStyle.ItemText, {paddingLeft: 15, width: 100}]}>
          {data.title}
        </Text>
        <Text style={[SearchDetailsStyle.ItemText]}>{data.info}</Text>
      </View>
    );
  };

  componentDidMount() {
    this.getData();
  }

  /**根据车辆id获取车辆位置信息 */
  getData() {
    const data = this.props.navigation.state.params.data;
    const id = data && data._id;
    if (!id) {
      return;
    }
    LoadingTool.startShowLoading();
    var _this = this;
    HttpUtils.postRequest(HttpUtils.AllUrl.Vehicle.Location, true, {
      id: id,
    }).then(response => {
      if (_this.unmount) {
        return;
      }
      LoadingTool.stopLoading();
      if (response && response.code === 200) {
        if (response.data) {
          _this.setState({data: response.data});
        } else {
          Toast.show(I18n.t('try_again_later'));
        }
      } else {
        Toast.show(response.message);
      }
    });
  }
}

const SearchDetailsStyle = StyleSheet.create({
  ItemConten: {
    backgroundColor: Color.jfl_FFFFFF,
    marginLeft: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  ItemText: {
    color: Color.jfl_3A3A3A,
    fontSize: 14,
  },
});
